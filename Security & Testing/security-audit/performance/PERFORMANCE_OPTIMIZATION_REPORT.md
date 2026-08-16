# Performance Optimization Report

**Date**: 2026-08-16  
**Build**: Production (`npm run build`)  
**Analysis**: Bundle analysis, Core Web Vitals, Runtime performance  

---

## Executive Summary

| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Initial JS (gzipped)** | ~392 KB | < 170 KB | 🔴 Poor |
| **LCP (est.)** | ~4.2s (3G) | < 2.5s | 🔴 Poor |
| **TTI (est.)** | ~5.1s (3G) | < 3.8s | 🔴 Poor |
| **TBT (est.)** | ~800ms | < 200ms | 🔴 Poor |
| **CLS** | ~0.15 | < 0.1 | 🟡 Needs Work |
| **Three.js on all pages** | Yes | Home only | 🔴 Critical |
| **Unused code** | ~150 KB | 0 KB | 🟡 Medium |

---

## 1. Bundle Size Analysis

### Current Chunk Breakdown (Gzipped)

| Chunk | Size | % of Total | Priority |
|-------|------|------------|----------|
| `three` | 232.8 KB | 59% | 🔴 CRITICAL |
| `animation` | 92.8 KB | 24% | 🟡 HIGH |
| `react-vendor` | 82.4 KB | 21% | ✅ OK |
| `supabase` | 51.8 KB | 13% | ✅ OK |
| `toastify` | 9.7 KB | 2% | ✅ OK |
| `icons` | 3.8 KB | 1% | ✅ OK |
| Page chunks | ~30 KB | 8% | ✅ OK |
| **Total** | **~392 KB** | **100%** | |

### Three.js Deep Dive (877 KB raw / 233 KB gzipped)

**Components using Three.js**:
- `HeroScene` - Home page hero (3D background)
- `AmbientCanvas` - Ambient 3D elements
- `OrbitNodes` - Node visualization
- `StarField` - Star field background
- `Lattice` - Geometric lattice

**All imported in component tree that loads on EVERY page**.

---

## 2. Critical Optimizations

### 🔴 PRIORITY 1: Lazy Load Three.js (Saves ~233 KB gzipped)

**Current Problem**: Three.js loads on all routes via `App.jsx` or layout.

**Solution**: Lazy load only on Home page.

```javascript
// src/pages/Home/Home.jsx - Current (eager)
import { HeroScene } from '@/components/three/HeroScene';
import { AmbientCanvas } from '@/components/three/AmbientCanvas';

// src/pages/Home/Home.jsx - Fixed (lazy)
const HeroScene = lazy(() => import('@/components/three/HeroScene'));
const AmbientCanvas = lazy(() => import('@/components/three/AmbientCanvas'));

// Wrap in Suspense with lightweight fallback
<Suspense fallback={<HeroFallback />}>
  <HeroScene />
</Suspense>
<Suspense fallback={<AmbientFallback />}>
  <AmbientCanvas />
</Suspense>
```

**HeroFallback** - Lightweight CSS-only animation:
```jsx
function HeroFallback() {
  return (
    <div className="relative w-full h-[70vh] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
      <div className="animate-pulse bg-primary/30 rounded-full w-32 h-32" />
    </div>
  );
}
```

**Impact**: 
- Home page: +233 KB (deferred, after paint)
- All other pages: -233 KB initial load
- **Estimated LCP improvement**: 1.5-2s on 3G

---

### 🔴 PRIORITY 2: Audit @react-three/drei Imports

**Current**: Likely importing entire drei library.

```javascript
// Check imports in three components
import { Html, Text, OrbitControls, Environment, ContactShadows, ... } from '@react-three/drei';
```

**Optimization**: Use modular imports (drei v10+):
```javascript
// Instead of barrel import
import { Html } from '@react-three/drei/core/Html';
import { Text } from '@react-three/drei/core/Text';
import { OrbitControls } from '@react-three/drei/controls/OrbitControls';
// OR check if drei supports:
// import { Html, Text } from '@react-three/drei';
```

**Estimated savings**: 50-100 KB raw if tree-shaking works.

---

### 🟡 PRIORITY 3: Animation Library Audit

**Current**: Three libraries loaded together:
- **GSAP** (131 KB raw) - ScrollTrigger, timelines
- **Framer Motion** (115 KB raw) - Page transitions, animations
- **Lenis** (23 KB raw) - Smooth scrolling

**Audit Required**: Check actual usage per page.

| Page | GSAP | Framer Motion | Lenis | Can Remove? |
|------|------|---------------|-------|-------------|
| Home | ✅ Hero | ✅ Transitions | ✅ Scroll | No |
| About | ❓ | ✅ Reveal | ✅ Scroll | Maybe GSAP |
| Team | ❓ | ✅ Cards | ✅ Scroll | Maybe GSAP |
| Events | ❓ Countdown | ✅ Cards | ✅ Scroll | Maybe GSAP |
| Research | ❓ | ✅ Tabs/Modal | ✅ Scroll | Maybe GSAP |
| Projects | ❓ | ✅ Cards | ✅ Scroll | Maybe GSAP |
| Admin | ❓ | ❌ | ❌ | **Yes - all three** |

**Optimization**: 
1. Remove all three from admin bundle (separate chunk or lazy)
2. Consider CSS-only for simple reveals
3. Use native `IntersectionObserver` for scroll animations

---

### 🟡 PRIORITY 4: Code Splitting Admin Bundle

**Current**: `AdminRoutes` chunk = 86 KB raw / 13 KB gzipped

**Issue**: All admin pages in single chunk.

**Optimization**: Lazy load each admin page:
```javascript
// AdminRoutes.jsx
const AdminLeadership = lazy(() => import('./pages/Leadership/AdminLeadership'));
const AdminMembers = lazy(() => import('./pages/Members/AdminMembers'));
// ... etc

<Suspense fallback={<AdminPageSkeleton />}>
  <Routes>
    <Route path="leadership" element={<AdminLeadership />} />
    // ...
  </Routes>
</Suspense>
```

**Impact**: Admin initial load drops from 13 KB to ~2-3 KB per page.

---

## 3. Runtime Performance

### React Optimizations Needed

| Component | Issue | Fix |
|-----------|-------|-----|
| `useSupabase` hook | New object created each render | `useMemo` for options |
| Admin tables | Re-render on any data change | `React.memo` for rows |
| Modal forms | Re-create on open | Memoize or keep mounted |
| Three.js canvas | Re-mount on route change | Keep in layout or memoize |

### useSupabase Hook Optimization
```javascript
// Current - creates new object each render
const { data, loading, error } = useSupabase(TABLES.EVENTS, {
  filters: { is_active: true },
  orderBy: 'event_date',
  ascending: true,
  limit: 10
});

// Fixed - stable reference
const options = useMemo(() => ({
  filters: { is_active: true },
  orderBy: 'event_date',
  ascending: true,
  limit: 10
}), []);

const { data, loading, error } = useSupabase(TABLES.EVENTS, options);
```

---

## 4. Image Optimization

### Current State
| Image | Size | Format | Optimized? |
|-------|------|--------|------------|
| `amrita-logo.png` | 17.8 KB | PNG | ❌ |
| `iic-logo.png` | 184 KB | PNG | ❌ - **Large!** |
| Hero 3D assets | Embedded in JS | - | N/A |
| Placeholder images | - | - | Need WebP |

### Optimizations
```javascript
// vite.config.js - Add image optimization
import { defineConfig } from 'vite';
import imagetools from 'vite-imagetools';

export default defineConfig({
  plugins: [
    // ...
    imagetools({
      defaultDirectives: (url) => {
        return new URLSearchParams({
          format: 'webp;avif',
          as: 'picture',
          widths: '400;800;1200;1600',
        });
      },
    }),
  ],
});
```

**Expected**: 50-80% reduction for raster images.

---

## 5. Caching Strategy

### Current
- No `Cache-Control` headers configured
- Vite generates hashed filenames (good for cache busting)
- No Service Worker

### Recommended (Vercel/Netlify Headers)

```toml
# vercel.json or netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### Service Worker (Workbox)
```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    // ...
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt'],
      manifest: {
        name: 'IIC Portal',
        short_name: 'IIC',
        theme_color: '#2563EB',
        icons: [...]
      }
    })
  ]
});
```

---

## 6. Core Web Vitals Targets

### Current Estimates (3G, Mobile)
| Metric | Current | Target | Gap |
|--------|---------|--------|-----|
| **LCP** | 4.2s | 2.5s | -1.7s |
| **FID/INP** | 320ms | 200ms | -120ms |
| **CLS** | 0.15 | 0.1 | -0.05 |
| **FCP** | 2.8s | 1.8s | -1.0s |
| **TTFB** | 600ms | 200ms | -400ms |

### After Priority 1 Fix (Lazy Three.js)
| Metric | Projected | Target | Status |
|--------|-----------|--------|--------|
| **LCP** | 2.4s | 2.5s | ✅ |
| **FID/INP** | 180ms | 200ms | ✅ |
| **CLS** | 0.12 | 0.1 | 🟡 |
| **FCP** | 1.6s | 1.8s | ✅ |
| **TTFB** | 600ms | 200ms | 🟡 (needs edge) |

---

## 7. Lighthouse CI Configuration

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npx serve -s dist -l 3000 &
      - uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/about
            http://localhost:3000/team
          budgetPath: ./lighthouse-budget.json
```

```json
// lighthouse-budget.json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.8 }],
        "categories:seo": ["error", { "minScore": 0.8 }]
      }
    }
  }
}
```

---

## 8. Monitoring & Measurement

### Real User Monitoring (RUM)
```javascript
// src/utils/webVitals.js
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to analytics endpoint
  fetch('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: { 'Content-Type': 'application/json' }
  });
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

### Bundle Size Monitoring
```bash
# Add to CI
# Fail if initial JS > 170 KB gzipped
MAX_JS_KB=170
ACTUAL_KB=$(gzip -c dist/assets/index-*.js | wc -c | awk '{print $1/1024}')
if [ $ACTUAL_KB -gt $MAX_JS_KB ]; then
  echo "Bundle size exceeded: ${ACTUAL_KB}KB > ${MAX_JS_KB}KB"
  exit 1
fi
```

---

## 9. Implementation Roadmap

### Sprint 1 (Week 1-2): Critical Fixes
- [ ] Lazy load Three.js components (Home only)
- [ ] Add lightweight fallbacks for 3D components
- [ ] Verify admin pages don't load Three.js
- [ ] Run Lighthouse - verify LCP < 2.5s

### Sprint 2 (Week 3-4): Code Quality
- [ ] Audit drei imports for tree-shaking
- [ ] Remove animation libraries from admin bundle
- [ ] Optimize `useSupabase` hook with `useMemo`
- [ ] Add `React.memo` to admin table rows

### Sprint 3 (Week 5-6): Infrastructure
- [ ] Configure caching headers
- [ ] Add Service Worker
- [ ] Optimize images (WebP/AVIF)
- [ ] Set up Lighthouse CI

### Sprint 4 (Week 7-8): Monitoring
- [ ] Add Web Vitals RUM
- [ ] Add bundle size CI gate
- [ ] Document performance budget
- [ ] Load test with k6

---

## 10. Quick Wins Checklist

- [ ] **Lazy load Three.js** - 30 min, saves 233 KB
- [ ] **Remove unused imports** - 10 min, saves ~5 KB
- [ ] **Enable gzip/brotli** - Hosting config, 0 code
- [ ] **Add Cache-Control** - Hosting config, 0 code
- [ ] **Optimize IIC logo** - 184 KB → ~30 KB WebP
- [ ] **Remove console.logs** - Build config, 0 code
- [ ] **Split admin routes** - 1 hour, faster admin load
- [ ] **Add web-vitals** - 30 min, monitoring

---

*Performance optimization report - Prioritize by impact/effort ratio*