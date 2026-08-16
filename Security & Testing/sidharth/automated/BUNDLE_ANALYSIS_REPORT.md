# Bundle Analysis Report

**Date**: 2026-08-16  
**Build Command**: `npm run build`  
**Analyzer**: Rollup Visualizer (`rollup-plugin-visualizer`)  
**Output**: `dist/stats.html`  

---

## Executive Summary

| Metric | Value | Status |
|--------|-------|--------|
| Total JS (gzipped) | ~392 KB | ⚠️ Large |
| Total CSS (gzipped) | ~14.7 KB | ✅ Good |
| HTML (gzipped) | 0.61 KB | ✅ Good |
| Largest chunk | `three` (232.8 KB gzipped) | 🔴 Critical |
| Chunks > 500 KB raw | 1 (`three`) | 🔴 Warning |

---

## Chunk Breakdown

### Vendor Chunks (Configured in `vite.config.js`)

| Chunk | Raw Size | Gzipped | % of JS | Contents |
|-------|----------|---------|---------|----------|
| `three` | 877 KB | 232.8 KB | 59% | three.js, @react-three/fiber, @react-three/drei |
| `animation` | 345 KB | 92.8 KB | 24% | GSAP, Framer Motion, Lenis |
| `react-vendor` | 285 KB | 82.4 KB | 21% | React, React DOM, React Router, Scheduler |
| `supabase` | 175 KB | 51.8 KB | 13% | @supabase/supabase-js |
| `toastify` | 42 KB | 9.7 KB | 2% | react-toastify |
| `icons` | 15 KB | 3.8 KB | 1% | lucide-react |
| `vendor` (remaining) | ~50 KB | ~13 KB | 3% | Other dependencies |

### Page Chunks (Lazy-loaded via React.lazy)

| Page | Raw Size | Gzipped | Route |
|------|----------|---------|-------|
| AdminRoutes | 86 KB | 13.4 KB | /admin/* |
| Home | 16.6 KB | 4.5 KB | / |
| Events | 10.3 KB | 2.9 KB | /events |
| Ideas | 10.3 KB | 2.3 KB | /ideas-queries |
| Contact | 9.0 KB | 2.4 KB | /contact |
| Research | 8.2 KB | 2.0 KB | /research |
| Leadership | 7.2 KB | 2.4 KB | /team |
| Projects | 3.7 KB | 1.4 KB | /projects |
| InnovationAmbassadors | 4.1 KB | 1.5 KB | /ambassadors |
| Establishment | 5.0 KB | 1.5 KB | /establishment |
| About | 3.6 KB | 1.5 KB | /about |

---

## Three.js Bundle Deep Dive (877 KB raw)

### What's Included

```
three.js core (~400 KB)
├── Core (Scene, Camera, Renderer, Object3D)
├── Geometries (Box, Sphere, Plane, BufferGeometry)
├── Materials (MeshBasic, Standard, Physical, etc.)
├── Lights (Directional, Point, Spot, Ambient, Hemisphere)
├── Math (Vector2/3/4, Matrix4, Quaternion, Euler)
├── Loaders (GLTF, Texture, CubeTexture, Font)
├── Post-processing (EffectComposer, Passes, Shaders)
├── Controls (OrbitControls, TrackballControls)
├── Extras (Curve, Path, Shape, TextGeometry)
└── Shaders (ShaderLib, UniformsLib, ShaderChunk)

@react-three/fiber (~150 KB)
├── React reconciler for three.js
├── Hooks (useFrame, useThree, useLoader)
├── Canvas, Events, Portal

@react-three/drei (~327 KB)
├── Helpers (Html, Text, ContactShadows, Environment)
├── Controls (OrbitControls, TrackballControls, ScrollControls)
├── Loaders (useGLTF, useTexture, useFont)
├── Shaders (MeshDistortMaterial, MeshRefractionMaterial, etc.)
├── Abstractions (Box, Sphere, Plane, RoundedBox, Torus)
└── Performance (Instances, Points, Billboard)
```

### Tree-Shaking Analysis

**Issue**: Vite/Rolldown may not fully tree-shake drei due to:
- Side effects in package.json
- Dynamic imports
- Re-exports

**Potential savings**: ~100-150 KB if unused drei exports removed.

---

## Performance Impact

### Initial Load (Critical Path)

```
index.html (0.6 KB)
  └── index-Day6bj64.css (12 KB gzipped)
  └── react-vendor-ifuntZ2G.js (82 KB gzipped) ← React + Router
  └── supabase-CTP6jN-l.js (52 KB gzipped) ← Supabase client
  └── index-YC2PIGyI.js (7.8 KB gzipped) ← App entry
  └── Home-BFVUHAj6.js (4.5 KB gzipped) ← Home page
  └── three-Dd_4_ycr.js (233 KB gzipped) ← 🔴 BLOCKS INTERACTION
```

**Problem**: Three.js chunk loads on **every page** because it's imported in `App.jsx` or root components.

### Pages Affected by Three.js Bundle

| Page | Loads Three.js? | Reason |
|------|----------------|--------|
| `/` (Home) | Yes | HeroScene in Hero |
| `/about` | No* | *But loads via App.jsx |
| `/team` | No* | *But loads via App.jsx |
| `/events` | No* | *But loads via App.jsx |
| `/admin/*` | No* | *But loads via App.jsx |
| All pages | **Yes** | Global import in component tree |

**Root Cause**: Three.js components likely imported in `App.jsx` or layout components that wrap all routes.

---

## Optimization Recommendations

### 1. HIGH PRIORITY - Lazy Load Three.js Components

**Current**: Three.js loaded on every page
**Target**: Only load on pages that need 3D (Home hero)

```javascript
// App.jsx - Current (eager)
import { HeroScene } from '@/components/three/HeroScene';

// App.jsx - Fixed (lazy)
const HeroScene = lazy(() => import('@/components/three/HeroScene').then(m => ({ default: m.HeroScene })));

// Wrap in Suspense
<Suspense fallback={<HeroFallback />}>
  <HeroScene />
</Suspense>
```

**Estimated savings**: 233 KB gzipped from initial load on non-Home pages.

### 2. HIGH PRIORITY - Audit Drei Imports

```javascript
// Instead of: import { Html, Text, OrbitControls, ... } from '@react-three/drei'
// Use: import { Html } from '@react-three/drei/core/Html'
// Or check if drei supports modular imports
```

Check `@react-three/drei` v10+ for modular entry points.

### 3. MEDIUM PRIORITY - Animation Library Audit

**Current**: GSAP (131 KB) + Framer Motion (115 KB) + Lenis (23 KB) = 269 KB raw
**Question**: Are all three needed simultaneously?

| Library | Use Case | Can Replace? |
|---------|----------|--------------|
| GSAP | Complex timelines, ScrollTrigger | Keep for scroll animations |
| Framer Motion | Page transitions, simple animations | Could use CSS for some |
| Lenis | Smooth scrolling | Required for GSAP ScrollTrigger |

**Recommendation**: Profile actual usage. Consider removing Framer Motion if only used for simple transitions.

### 4. LOW PRIORITY - Supabase Bundle

**Size**: 51.8 KB gzipped
**Optimization**: Use modular imports if available
```javascript
// Instead of: import { createClient } from '@supabase/supabase-js'
// Check if: import { createClient } from '@supabase/supabase-js/dist/module/index.js'
```

---

## Bundle Visualization

View interactive treemap: Open `dist/stats.html` in browser

### Key Views to Check
1. **Treemap** - Visual size comparison
2. **Sunburst** - Dependency hierarchy
3. **Network** - Module relationships
4. **Sidebar filters** - Toggle gzipped vs raw, show/hide node_modules

---

## Comparison: Before/After Lazy Loading (Projected)

| Metric | Current | After Lazy Load Home Only |
|--------|---------|---------------------------|
| Initial JS (gzipped) | ~392 KB | ~159 KB |
| Three.js on Home | 233 KB | 233 KB (deferred) |
| Three.js on Other Pages | 233 KB | 0 KB |
| Time to Interactive (3G) | ~4.2s | ~1.8s |
| Lighthouse Performance | ~45 | ~75 |

---

## Action Items

### Immediate (This Sprint)
- [ ] Identify where Three.js is imported globally
- [ ] Convert HeroScene/AmbientCanvas to lazy imports
- [ ] Add Suspense boundaries with lightweight fallbacks
- [ ] Verify admin pages don't load Three.js

### Short Term
- [ ] Audit @react-three/drei imports for tree-shaking
- [ ] Profile animation library usage
- [ ] Consider CSS-only alternatives for simple transitions

### Monitoring
- [ ] Add bundle size check to CI (fail if > 400 KB gzipped initial)
- [ ] Track three.js chunk size over time
- [ ] Monitor Lighthouse CI scores

---

## Commands for Ongoing Analysis

```bash
# Build with visualizer
npm run build

# View stats
# Open dist/stats.html in browser

# Check specific chunk sizes
ls -la dist/assets/*.js | awk '{print $5/1024 " KB", $9}'

# Gzipped sizes
gzip -c dist/assets/three-Dd_4_ycr.js | wc -c
```

---

*Generated by automated bundle analysis*