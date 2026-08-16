# Manual Security Testing Checklist

**Date**: 2026-08-16  
**Purpose**: Guide for manual penetration testing after automated scans  
**Scope**: OWASP Top 10 + Business Logic + Supabase-specific  

---

## Pre-Testing Setup

### Environment
- [ ] Local dev server running (`npm run dev`)
- [ ] Production build deployed to staging (`npm run build && npm run preview`)
- [ ] Supabase project accessible (Dashboard + API)
- [ ] Browser dev tools ready (Network, Console, Application, Security tabs)
- [ ] Proxy tool ready (Burp Suite / OWASP ZAP / Caido)
- [ ] Test accounts created (admin + regular user if applicable)

### Test Data
- [ ] Admin credentials
- [ ] Test files: valid images, PDFs, oversized files, polyglots, malicious files
- [ ] XSS payloads for each input type
- [ ] SQL injection payloads (though Supabase uses parameterized queries)
- [ ] Path traversal payloads

---

## 1. Authentication & Session Management

### Login Page (`/admin/login`)
| Test | Payload/Action | Expected | Pass/Fail |
|------|----------------|----------|-----------|
| Valid login | Correct email/password | Redirect to `/admin/dashboard` | |
| Invalid login | Wrong password | Error toast "Invalid credentials" | |
| SQLi in email | `' OR '1'='1` | Treated as literal string | |
| XSS in email | `<script>alert(1)</script>` | Escaped/encoded | |
| Rate limiting | 10 rapid failed attempts | Account lockout or delay | |
| Brute force | 100 rapid attempts | Blocked by Supabase/WAF | |
| Credential stuffing | Known breached passwords | Rejected or flagged | |
| Password autocomplete | Check `autocomplete` attr | `current-password` set | |
| HTTPS only | Access via HTTP | Redirect to HTTPS | |
| Secure cookies | Check `Set-Cookie` headers | `Secure; HttpOnly; SameSite` | |

### Session Management
| Test | Action | Expected | Pass/Fail |
|------|--------|----------|-----------|
| Session expiry | Wait for JWT expiry | Auto-refresh or redirect login | |
| Concurrent sessions | Login from 2 browsers | Both work (or limit enforced) | |
| Logout | Click logout | Session destroyed, redirect login | |
| Logout everywhere | "Sign out all devices" | All sessions invalidated | |
| Token replay | Copy JWT, use in new tab | Works (stateless) or rejected | |
| Token tampering | Modify JWT payload | Signature verification fails | |
| Refresh token reuse | Use same refresh token twice | Second use fails (rotation) | |
| Back button after logout | Logout → browser back | Redirect to login | |

### Authorization (Admin Panel)
| Test | Action | Expected | Pass/Fail |
|------|--------|----------|-----------|
| Direct admin URL | Access `/admin/leadership` without login | Redirect to `/admin/login` | |
| Authenticated non-admin | Login as regular user (if exists) | Access denied or read-only | |
| Role escalation | Modify JWT `role` claim | Server rejects (RLS) | |
| IDOR - Edit | Change `/admin/leadership/edit?id=1` to `id=2` | Own data only or admin all | |
| IDOR - Delete | Direct API call to delete other's data | Blocked by RLS | |
| Admin API calls | Call Supabase REST directly with anon key | RLS policies enforce | |

---

## 2. Input Validation & XSS

### Public Forms (Idea, Query, Contact)
| Field | XSS Payload | Expected | Pass/Fail |
|-------|-------------|----------|-----------|
| Name | `<img src=x onerror=alert(1)>` | Sanitized/escaped on display | |
| Email | `test@test.com<script>alert(1)</script>` | Validation rejects or sanitizes | |
| Department | `<svg onload=alert(1)>` | Sanitized | |
| Title/Subject | `"><script>alert(1)</script>` | Sanitized | |
| Description/Message | `<iframe src=javascript:alert(1)>` | Sanitized | |
| File name | `test<script>alert(1)</script>.jpg` | Sanitized in UI | |

### Admin Forms
| Page | Field | XSS Payload | Expected | Pass/Fail |
|------|-------|-------------|----------|-----------|
| Leadership | Name | `<script>alert(1)</script>` | Sanitized | |
| Leadership | Designation | `<img src=x onerror=alert(1)>` | Sanitized | |
| Events | Description | `<svg onload=alert(1)>` | Sanitized | |
| Notices | Description | `<iframe src=...>` | Sanitized | |
| Research | Description | `<details open ontoggle=alert(1)>` | Sanitized | |
| Projects | Description | `<video><source onerror=alert(1)>` | Sanitized | |

### Stored XSS Verification
| Vector | Location | Test | Pass/Fail |
|--------|----------|------|-----------|
| Idea submission | Public idea list (if displayed) | Submit XSS, view as admin | |
| Query submission | Admin query list | Submit XSS, view in admin | |
| Leadership bio | Public team page | Add via admin, view public | |
| Notice description | Home page notices | Add via admin, view home | |
| Event description | Events page | Add via admin, view events | |
| Research description | Research page | Add via admin, view research | |
| Project description | Projects page | Add via admin, view projects | |

### Reflected XSS
| Parameter | Location | Payload | Pass/Fail |
|-----------|----------|---------|-----------|
| Search | If any search exists | `?q=<script>alert(1)</script>` | |
| Filter | Category/status filters | `?category=<script>alert(1)</script>` | |
| Pagination | Page params | `?page=<script>alert(1)</script>` | |
| Error pages | 404, 500 | Trigger error with payload | |

### DOM XSS
| Sink | Source | Test | Pass/Fail |
|------|--------|------|-----------|
| `innerHTML` | URL params | Check for `dangerouslySetInnerHTML` | |
| `eval()` | Any | Search codebase | |
| `Function()` | Any | Search codebase | |
| `setTimeout(string)` | Any | Search codebase | |
| `location.hash` | Routing | Navigate with payload | |

---

## 3. File Upload Testing

### Test Files to Prepare
```
valid-image.jpg          # Normal JPEG
valid-image.png          # Normal PNG
valid.pdf                # Normal PDF
oversized-20mb.jpg       # > 10MB (if limit added)
oversized-100mb.pdf      # >> 10MB
polyglot.jpg.php         # JPEG + PHP code
polyglot.pdf.js          # PDF + JavaScript
svg-malicious.svg        # SVG with <script>
exe-renamed.jpg          # EXE renamed to .jpg
null-byte.php%00.jpg     # Null byte injection
path-traversal/../../etc/passwd.jpg
```

### Upload Tests (Per Form/Page)
| Page | Bucket | Test | Expected | Pass/Fail |
|------|--------|------|----------|-----------|
| Leadership | leadership-images | Valid image | Upload succeeds | |
| Leadership | leadership-images | Oversized | Rejected with error | |
| Leadership | leadership-images | PHP polyglot | Rejected (MIME check) | |
| Leadership | leadership-images | SVG with JS | Rejected or sanitized | |
| Members | member-images | Valid image | Upload succeeds | |
| Events | event-posters | Valid image | Upload succeeds | |
| Events | event-gallery | Multiple images | All upload | |
| Notices | website-assets/notices | Valid PDF | Upload succeeds | |
| Ambassadors | ambassador-images | Valid image | Upload succeeds | |
| Research | research-files | Valid PDF | Upload succeeds | |
| Research | research-files | Multiple docs | All upload | |
| Projects | project-images | Valid image | Upload succeeds | |
| Certificates | certificates | Valid PDF | Upload succeeds | |
| Ideas (public) | idea-attachments | Valid PDF/DOC | Upload succeeds | |
| Queries (public) | query-attachments | Valid PDF/DOC | Upload succeeds | |

### File Access Controls
| Test | Action | Expected | Pass/Fail |
|------|--------|----------|-----------|
| Direct file URL | Access uploaded file URL | Public read (if bucket public) | |
| Private file | If any private bucket | 403/401 without auth | |
| Delete file | Admin delete → access URL | 404 or revoked | |
| List bucket | `storage.from(bucket).list()` | Admin only | |
| Path traversal | Upload `../../../etc/passwd` | Blocked/sanitized | |

---

## 4. API & Supabase Security

### Direct Supabase REST API Testing
```bash
# Test with anon key (public access)
curl -H "apikey: ANON_KEY" \
     -H "Authorization: Bearer ANON_KEY" \
     "https://PROJECT.supabase.co/rest/v1/leadership?select=*"

# Test with auth token (admin)
curl -H "apikey: ANON_KEY" \
     -H "Authorization: Bearer USER_JWT" \
     "https://PROJECT.supabase.co/rest/v1/leadership?select=*"
```

### RLS Policy Tests (Per Table)
| Table | Anon SELECT | Anon INSERT | Auth SELECT | Auth INSERT | Auth UPDATE | Auth DELETE |
|-------|-------------|-------------|-------------|-------------|-------------|-------------|
| leadership | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| members | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| events | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| notices | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| ambassadors | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| research | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| projects | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| certificates | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| ideas | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| queries | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| contacts | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| settings | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |

### Storage Policy Tests (Per Bucket)
| Bucket | Anon SELECT | Anon INSERT | Auth SELECT | Auth INSERT | Auth UPDATE | Auth DELETE |
|--------|-------------|-------------|-------------|-------------|-------------|-------------|
| leadership-images | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| member-images | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ | ✅/❌ |
| ... | | | | | | |

### Supabase Functions (If Any)
| Function | Test | Expected |
|----------|------|----------|
| Auth webhooks | Sign up → trigger | Works |
| Storage triggers | Upload → resize | Works |
| Database triggers | Insert → notify | Works |
| Scheduled functions | Cron jobs | Works |

---

## 5. Business Logic Testing

### Admin Operations
| Test | Steps | Expected | Pass/Fail |
|------|-------|----------|-----------|
| Create → Edit → Delete | Full CRUD cycle | All work | |
| Duplicate handling | Add same name twice | `-1` suffix | |
| Required fields | Submit empty form | Validation errors | |
| Conditional fields | Faculty type → designation shows | Works | |
| Image upload → delete | Add image, delete record | Image cleaned up | |
| Bulk operations | If any bulk actions | Work correctly | |

### Public Submissions
| Test | Steps | Expected | Pass/Fail |
|------|-------|----------|-----------|
| Idea submission | Fill all fields + file | Success toast, data in DB | |
| Query submission | Fill all fields + file | Success toast, data in DB | |
| Contact submission | Fill all fields | Success toast, data in DB | |
| Duplicate submission | Rapid double-click | Single entry | |
| Partial submission | Required only | Works | |
| Large text fields | 10k+ characters | Handles gracefully | |

### Data Integrity
| Test | Action | Expected |
|------|--------|----------|
| Foreign key | Delete leadership referenced by events | Cascade or block |
| Unique constraints | Duplicate email/phone | Rejected |
| Check constraints | Invalid status values | Rejected |
| JSONB fields | Invalid JSON in document_urls | Handled |

---

## 6. Client-Side Security

### Security Headers (Check in Network Tab)
| Header | Expected Value | Pass/Fail |
|--------|----------------|-----------|
| Content-Security-Policy | `default-src 'self'; script-src 'self' ...` | |
| X-Frame-Options | `DENY` or `SAMEORIGIN` | |
| X-Content-Type-Options | `nosniff` | |
| Referrer-Policy | `strict-origin-when-cross-origin` | |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains` | |
| Cross-Origin-Opener-Policy | `same-origin` | |
| Cross-Origin-Resource-Policy | `same-origin` | |

### JavaScript Security
| Check | Method | Pass/Fail |
|-------|--------|-----------|
| No `eval()` | Search bundle | |
| No `innerHTML` with user data | Search bundle | |
| No `dangerouslySetInnerHTML` | Search codebase | |
| Source maps in production | Check `dist/` | |
| Console logs in production | Open console | |
| Debug info in production | Check bundle | |
| API keys in bundle | Search for keys | |

### Dependency Security
| Check | Method | Pass/Fail |
|-------|--------|-----------|
| Known vulnerabilities | `npm audit` | |
| Outdated packages | `npm outdated` | |
| Unused dependencies | `depcheck` | |
| License compliance | `npm ls --prod` | |

---

## 7. Network & Transport

### TLS/SSL
| Check | Tool | Pass/Fail |
|-------|------|-----------|
| TLS 1.2+ only | SSL Labs / testssl.sh | |
| Strong ciphers | SSL Labs | |
| Certificate valid | Browser / openssl | |
| HSTS preload | hstspreload.org | |
| OCSP stapling | SSL Labs | |

### Mixed Content
| Check | Method | Pass/Fail |
|-------|--------|-----------|
| HTTP resources | Browser console | |
| Insecure forms | Check all forms | |
| External scripts | CSP report-only | |

---

## 8. Denial of Service

### Application Layer
| Test | Method | Expected | Pass/Fail |
|------|--------|----------|-----------|
| Large payload | 10MB+ JSON POST | Rejected (413) | |
| Many parameters | 1000+ form fields | Handled | |
| Deep nesting | 100-level JSON | Handled | |
| Slowloris | Slow request | Timeout | |
| Regex DoS | Catastrophic backtracking | No vulnerable regex | |

### Resource Exhaustion
| Test | Method | Expected |
|------|--------|----------|
| File upload flood | 100 concurrent uploads | Rate limited |
| DB query flood | Complex queries | Timeout/limit |
| Storage exhaustion | Many large files | Quota/limit |

---

## 9. Privacy & Compliance

### Data Protection
| Check | Method | Pass/Fail |
|-------|--------|-----------|
| PII in logs | Check Supabase logs | |
| Data retention | Policy documented | |
| Right to delete | Admin can delete user data | |
| Data export | User can request data | |
| Encryption at rest | Supabase default | |
| Encryption in transit | TLS 1.2+ | |

### Cookies & Tracking
| Check | Method | Pass/Fail |
|-------|--------|-----------|
| Necessary only | Cookie audit | |
| No third-party tracking | Network tab | |
| Consent banner | If required | |
| Secure flag | All cookies | |
| SameSite | Lax/Strict | |

---

## 10. Reporting Template

### For Each Finding
```
**Finding ID**: SEC-YYYY-MM-DD-NNN
**Title**: Brief description
**Severity**: Critical / High / Medium / Low / Info
**CVSS Score**: X.X (if applicable)
**Location**: URL / Component / API endpoint
**Description**: Detailed explanation
**Steps to Reproduce**: 
1. Step one
2. Step two
3. Step three
**Impact**: What an attacker can achieve
**Evidence**: Screenshots, logs, request/response
**Remediation**: Specific fix recommendations
**References**: CWE, OWASP, CVE links
```

### Severity Guidelines
| Severity | CVSS | Response Time |
|----------|------|---------------|
| Critical | 9.0-10.0 | Immediate (24h) |
| High | 7.0-8.9 | 72 hours |
| Medium | 4.0-6.9 | 2 weeks |
| Low | 0.1-3.9 | Next sprint |
| Info | 0.0 | Documentation |

---

## Post-Testing

- [ ] All findings documented with evidence
- [ ] Critical/High findings reported immediately
- [ ] Retest after fixes applied
- [ ] Update security documentation
- [ ] Schedule next penetration test
- [ ] Add regression tests for fixed issues

---

*Manual testing checklist - Execute after automated scans complete*