# Security Re-Test Report

**Project**: Institution's Innovation Council (IIC) Web Application  
**Date**: 2026-08-16  
**Testing Type**: Automated Re-Test of Previous Security Assessment  
**Original Assessment Date**: 2026-08-01  
**Tester**: Automated Security Pipeline  
**Environment**: Local Development (http://localhost:5173) + Supabase Production  

---

## Executive Summary

| Test Category | Original Finding | Re-Test Result | Status |
|---------------|------------------|----------------|--------|
| API Key Enforcement | ✅ Passed | ✅ **Confirmed** | **PASS** |
| Authorization Header | ⚠️ Observation | ⚠️ **Confirmed** | **OBSERVATION** |
| CORS Configuration | ⚠️ Observation | ⚠️ **Confirmed + Wildcard** | **MEDIUM** |
| Dev Server Exposure | ⚠️ Informational | ⚠️ **Confirmed** | **INFORMATIONAL** |
| Directory Enumeration | ⚠️ SPA Behavior | ⚠️ **Confirmed + Sensitive Files** | **LOW** |
| Security Headers | ✅ Partial | ✅ **Confirmed** | **PASS** |
| Sensitive File Exposure | Not Tested | 🔴 **Found** | **NEW FINDING** |

### Overall Risk Rating: **LOW-MEDIUM**

No critical vulnerabilities found. Most findings are configuration observations consistent with development environment.

---

## 1. API Key Enforcement Tests (Re-Test)

**Original Test**: Burp Suite Repeater - Remove Authorization/apikey headers  
**Re-Test Method**: Automated Python requests to Supabase REST API  
**Target**: `https://zuxqfbdhxgswymzdrgul.supabase.co/rest/v1/events`

### Test Results

| Test Case | Headers Sent | Status | Data Returned | Original Result | Match? |
|-----------|--------------|--------|---------------|-----------------|--------|
| **1. Normal (Both)** | apikey + Authorization | 200 OK | 9 records | 200 OK | ✅ |
| **2. No Authorization** | apikey only | 200 OK | 9 records | 200 OK | ✅ |
| **3. No apikey** | Authorization only | 401 Unauthorized | Error JSON | 401 Unauthorized | ✅ |
| **4. Neither** | None | 401 Unauthorized | Error JSON | 401 Unauthorized | ✅ |

### Analysis

**Finding 1**: **API Key Enforcement - CONFIRMED PASS**  
The Supabase API gateway correctly rejects requests missing the `apikey` header (tests 3 & 4). The `Authorization` header alone is insufficient.

**Finding 2**: **Authorization Header Optional for Public Data - CONFIRMED**  
Test 2 confirms the events endpoint is accessible with only the publishable `apikey`. This is **expected behavior** for intentionally public data (events are displayed on public website).

### Additional Table Testing (Extended)

All public tables tested with anon key:

| Table | Status | Records | Public? |
|-------|--------|---------|---------|
| leadership | 200 | 1 | ✅ |
| members | 200 | 1 | ✅ |
| notices | 200 | 0 | ✅ |
| ambassadors | 200 | 1 | ✅ |
| research | 200 | 0 | ✅ |
| projects | 200 | 0 | ✅ |
| certificates | 200 | 1 | ✅ |
| ideas | 200 | 0 | ✅ |
| queries | 200 | 0 | ✅ |
| contacts | 200 | 0 | ✅ |

**Assessment**: All tables readable by anon key. **Verify RLS policies** in Supabase Dashboard to ensure only intended data is public.

---

## 2. CORS Configuration Tests (Extended)

### Test Results

| Test | Origin Header | Status | Access-Control-Allow-Origin | Assessment |
|------|---------------|--------|----------------------------|------------|
| **1. Valid Origin** | http://192.168.56.1:5173 | 200 | http://192.168.56.1:5173 | ✅ Expected |
| **2. Evil Origin** | https://evil.com | 200 | **https://evil.com** | 🔴 **WILDCARD** |
| **3. No Origin** | (none) | 200 | (absent) | ✅ Expected |

### Analysis

**Finding 3**: **CORS Wildcard on Data Endpoint - MEDIUM RISK**

The API returns `Access-Control-Allow-Origin: https://evil.com` when an arbitrary origin is sent. This indicates Supabase is configured to **reflect the Origin header** rather than using a strict allowlist.

**Impact**: Any website can make authenticated requests to the API on behalf of users who have valid sessions (if cookies/credentials were used). With anon key only, impact is limited to public data access.

**Remediation**: In Supabase Dashboard → API Settings, configure explicit CORS allowlist for production domains only.

---

## 3. Development Resource Exposure (Confirmed)

### Test Results

| Resource | Status | Content-Type | Original Finding | Confirmed? |
|----------|--------|--------------|------------------|------------|
| `/@vite/client` | 200 | application/javascript | Yes | ✅ |
| `/@react-refresh` | 200 | application/javascript | Yes | ✅ |
| `/src/main.jsx` | 200 | application/javascript | Yes | ✅ |
| `/src/App.jsx` | 200 | application/javascript | Implied | ✅ |
| `/src/components/*` | 200 | application/javascript | Implied | ✅ |

### Analysis

**Finding 4**: **Development Server Resources Exposed - INFORMATIONAL**

Confirmed: Vite development server exposes:
- Source code via `/src/*` paths
- Hot module replacement client (`/@vite/client`)
- React refresh runtime (`/@react-refresh`)

**Risk**: Source code exposure in development. **Not a vulnerability** in dev environment.

**Critical**: **Must verify production build does NOT expose these paths**. Production build (`npm run build`) outputs only `dist/` with hashed assets.

---

## 4. Directory Enumeration (New Findings)

### Test Results

Target: `http://localhost:5173` (Vite Dev Server)

| Path | Status | Size | Notes |
|------|--------|------|-------|
| `/admin` | 200 | 1,113 bytes | SPA route - returns index.html |
| `/api` | 200 | 1,113 bytes | SPA route |
| `/login` | 200 | 1,113 bytes | SPA route |
| `/dashboard` | 200 | 1,113 bytes | SPA route |
| `/settings` | 200 | 1,113 bytes | SPA route |
| `/config` | 200 | 1,113 bytes | SPA route |
| `/backup` | 200 | 1,113 bytes | SPA route |
| `/test` | 200 | 1,113 bytes | SPA route |
| `/dev` | 200 | 1,113 bytes | SPA route |
| `/staging` | 200 | 1,113 bytes | SPA route |
| `/prod` | 200 | 1,113 bytes | SPA route |
| `/wp-admin` | 200 | 1,113 bytes | SPA route |
| `/phpmyadmin` | 200 | 1,113 bytes | SPA route |
| `/.git` | **403** | 453 bytes | **Blocked** ✅ |
| `/.env` | **403** | 447 bytes | **Blocked** ✅ |
| `/robots.txt` | 200 | 1,113 bytes | SPA route |
| `/sitemap.xml` | 200 | 1,113 bytes | SPA route |
| `/README.md` | **200** | **22,247 bytes** | 🔴 **EXPOSED** |
| `/package.json` | **200** | **982 bytes** | 🔴 **EXPOSED** |
| `/vite.config.js` | **200** | **4,480 bytes** | 🔴 **EXPOSED** |

### Analysis

**Finding 5**: **SPA Route Behavior - EXPECTED**  
All "directory" paths return 200 with index.html (1,113 bytes). This is **normal SPA behavior** - React Router handles routing client-side.

**Finding 6**: **Sensitive Files Exposed - LOW RISK (NEW)**

The following files are **publicly accessible** on the dev server:
- `README.md` (22 KB) - Project documentation
- `package.json` (982 bytes) - Dependencies, scripts
- `vite.config.js` (4.5 KB) - Build configuration

**Finding 7**: **Sensitive Files Blocked - GOOD**  
- `/.git` → 403 Forbidden
- `/.env` → 403 Forbidden

**Impact**: Information disclosure of project structure, dependencies, and build config. **Low risk** in development, but **must be blocked in production**.

**Remediation**: 
1. Add `public/` folder for truly public static assets
2. Configure Vite `server.fs.deny` to block sensitive files
3. Ensure production deployment serves only `dist/`

---

## 5. Security Headers (Confirmed)

### Supabase API Response Headers

| Header | Value | Status |
|--------|-------|--------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | ✅ Excellent |
| `X-Content-Type-Options` | `nosniff` | ✅ Good |
| `X-Frame-Options` | (absent) | ⚠️ Missing |
| `Content-Security-Policy` | (absent) | ⚠️ Missing |
| `Referrer-Policy` | (absent) | ⚠️ Missing |
| `Permissions-Policy` | (absent) | ⚠️ Missing |

### Vite Dev Server Response Headers

| Header | Value |
|--------|-------|
| `Content-Type` | text/html |
| `Vary` | Accept-Encoding |

### Analysis

**Finding 8**: **Security Headers Partial - IMPROVEMENT NEEDED**

Supabase API has good headers (HSTS, nosniff). Missing:
- `X-Frame-Options: DENY` - Prevent clickjacking
- `Content-Security-Policy` - Prevent XSS
- `Referrer-Policy` - Privacy
- `Permissions-Policy` - Feature control

**Recommendation**: Configure CSP at hosting platform (Vercel/Netlify) or via Supabase Edge Functions.

---

## 6. Comparison: Original vs Re-Test

| Finding | Original (2026-08-01) | Re-Test (2026-08-16) | Delta |
|---------|----------------------|---------------------|-------|
| API Key Enforcement | ✅ Pass | ✅ **Confirmed Pass** | → Same |
| Auth Header Optional | ⚠️ Observation | ⚠️ **Confirmed** | → Same |
| CORS Wildcard | ⚠️ Error Response Only | 🔴 **Data Endpoint Too** | **Worse** |
| Dev Resources | ⚠️ Informational | ⚠️ **Confirmed** | → Same |
| Directory Enum | ⚠️ SPA Behavior | ⚠️ **SPA + Sensitive Files** | **New** |
| Sensitive Files | Not Tested | 🔴 **README, package.json, vite.config.js** | **New** |
| Security Headers | Partial | ✅ **Confirmed Partial** | → Same |

---

## 7. New Findings Summary

| ID | Finding | Severity | Location | Status |
|----|---------|----------|----------|--------|
| **NEW-001** | CORS reflects arbitrary Origin on data endpoints | **MEDIUM** | Supabase REST API | 🔴 Open |
| **NEW-002** | README.md publicly accessible on dev server | **LOW** | Vite Dev Server | 🔴 Open |
| **NEW-003** | package.json publicly accessible on dev server | **LOW** | Vite Dev Server | 🔴 Open |
| **NEW-004** | vite.config.js publicly accessible on dev server | **LOW** | Vite Dev Server | 🔴 Open |
| **NEW-005** | Missing security headers (CSP, X-Frame-Options, etc.) | **LOW** | Supabase API + Dev Server | 🔴 Open |

---

## 8. Remediation Checklist

### Immediate (Before Production Deploy)
- [ ] **NEW-001**: Configure CORS allowlist in Supabase Dashboard → Settings → API
- [ ] **NEW-002/3/4**: Ensure production deployment serves ONLY `dist/` folder
- [ ] **NEW-005**: Add security headers via hosting platform (Vercel/Netlify headers config)

### Short Term
- [ ] Verify RLS policies on all 13 tables in Supabase Dashboard
- [ ] Add `server.fs.deny` to Vite config for dev server hardening
- [ ] Configure CSP policy for production
- [ ] Set up automated security scanning in CI/CD

### Configuration Files to Update

**vite.config.js** (add dev server protection):
```javascript
export default defineConfig({
  // ... existing config
  server: {
    fs: {
      deny: ['.env', '.env.*', '*.pem', 'README.md', 'package.json', 'vite.config.js']
    }
  }
});
```

**vercel.json** or **netlify.toml** (production headers):
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://zuxqfbdhxgswymzdrgul.supabase.co wss://zuxqfbdhxgswymzdrgul.supabase.co;"
```

---

## 9. Test Evidence

### API Key Enforcement
```bash
# Test 1: Both headers
curl -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
  "https://zuxqfbdhxgswymzdrgul.supabase.co/rest/v1/events"
# Result: 200 OK, 9 records

# Test 2: No Authorization
curl -H "apikey: $ANON_KEY" \
  "https://zuxqfbdhxgswymzdrgul.supabase.co/rest/v1/events"
# Result: 200 OK, 9 records

# Test 3: No apikey
curl -H "Authorization: Bearer $ANON_KEY" \
  "https://zuxqfbdhxgswymzdrgul.supabase.co/rest/v1/events"
# Result: 401 Unauthorized, "No API key found in request"

# Test 4: Neither
curl "https://zuxqfbdhxgswymzdrgul.supabase.co/rest/v1/events"
# Result: 401 Unauthorized
```

### CORS Wildcard
```bash
curl -H "apikey: $ANON_KEY" -H "Authorization: Bearer $ANON_KEY" \
  -H "Origin: https://evil.com" \
  "https://zuxqfbdhxgswymzdrgul.supabase.co/rest/v1/events" -I
# Result: Access-Control-Allow-Origin: https://evil.com
```

### Dev Server Exposure
```bash
curl -I http://localhost:5173/@vite/client
# Result: 200 OK

curl -I http://localhost:5173/src/main.jsx
# Result: 200 OK

curl -I http://localhost:5173/README.md
# Result: 200 OK, 22247 bytes
```

### Directory Enumeration
```bash
for path in admin api login dashboard .git .env README.md package.json; do
  echo -n "$path: "
  curl -s -o /dev/null -w "%{http_code} (%{size_download} bytes)\n" "http://localhost:5173/$path"
done
```

---

## 10. Conclusion

### Summary
The re-test **confirms all original findings** and identifies **4 new low-severity issues** and **1 medium-severity issue** (CORS wildcard).

### Risk Posture
- **No Critical/High vulnerabilities** found
- **Medium**: CORS configuration allows arbitrary origins
- **Low**: Dev server exposes project files (README, package.json, vite.config.js)
- **Informational**: Dev resources exposed (expected in development)

### Production Readiness
**NOT READY** until:
1. CORS allowlist configured in Supabase
2. Production deployment verified to serve only `dist/`
3. Security headers configured
4. RLS policies verified for all tables

### Next Assessment
Recommended: **After production deployment** to verify all dev-environment findings are resolved.

---

*Report generated by automated security re-test pipeline*  
*Based on original assessment by Sreenivasa Pai (2026-08-01)*  
*All tests reproducible via provided commands*