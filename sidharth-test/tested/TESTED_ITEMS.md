# Tested & Verified Items Tracker

**Updated:** 2026-08-15

---

## ✅ Verified Working

### Storage & RLS Policies
- [x] All 13 database tables: INSERT policies for `anon` + `authenticated` roles
- [x] All 13 storage buckets: Upload/Read/Update/Delete policies for `anon` + `authenticated` roles
- [x] File uploads work in Admin Members (member-images bucket)
- [x] Flat folder structure (no subfolders) - matches existing DB data

### Leadership Management
- [x] Role dropdown with Student roles (6) + Faculty roles (11) - separate per type
- [x] Type tabs (Student/Faculty) filter table and role dropdown
- [x] Department dropdown (global DEPARTMENTS: CS & IT, VM & Communication, Commerce and Management, Physical Sciences, Administration)
- [x] Designation field for faculty
- [x] Image upload with name-based filename + duplicate suffix
- [x] **Display** - Table with Type badge, Role, Department, Designation, Status
- [x] **Create** - Add new leader (Student or Faculty) with image upload ✅
- [x] **Update** - Edit existing leader (role, department, designation, image) ✅
- [x] **Delete** - Remove leader (confirmed working) ✅
- [x] **Filename** - Stored as `name.ext` (e.g., `sreelekshmi-v.jpg`) with `-1`, `-2` suffix for duplicates
- [x] **Faculty/Student split** - Type tabs (Student/Faculty) with separate role dropdowns
- [x] **Role field** - Single `role` field replaces `position` (combined student + faculty roles)
- [x] **Conditional display** - Department and Designation only show if exist in DB
- [x] **Administration department** - Added for President/Dean

### Notices Management
- [x] Notice CRUD (Add/Edit/Delete) works ✅
- [x] Attachment upload to `website-assets/notices/` folder ✅
- [x] Category dropdown (NOTICE_CATEGORIES) ✅
- [x] Pinned/Active toggles ✅
- [x] Deadline & External Link fields ✅
- [x] Display on Home page with pin/NEW badge ✅
- [x] **All operations verified: Insert, Update, Delete, Display** ✅

### Ambassadors Management
- [x] Ambassador CRUD (Add/Edit/Delete) works ✅
- [x] Image upload to `ambassador-images` bucket ✅
- [x] Department dropdown (global DEPARTMENTS) ✅
- [x] Position, Year/Batch, Responsibilities, Achievements fields ✅
- [x] Public page modal with all fields (conditional display) ✅
- [x] **All operations verified: Insert, Update, Delete, Display** ✅

### Research Management
- [x] Research CRUD (Add/Edit/Delete) works ✅
- [x] Image upload to `research-files` bucket ✅
- [x] Multiple document upload to `research-files` bucket (document_urls jsonb) ✅
- [x] Category dropdown (RESEARCH_CATEGORIES) ✅
- [x] Status dropdown (RESEARCH_STATUSES) ✅
- [x] Researcher, Mentor, Description fields ✅
- [x] Public page with 4 categories (Projects, Publications, Patents, Collaborations) ✅
- [x] Empty categories hidden automatically ✅
- [x] Card click modal with all fields (conditional display) ✅
- [x] **All operations verified: Insert, Update, Delete, Display** ✅

### Members Management
- [x] Team dropdown (Innovation Team, Internship Team, IPR Team, Social Media Team, Start Up Team)
- [x] Department dropdown (global DEPARTMENTS: CS & IT, VM & Communication, Commerce and Management, Physical Sciences, Administration)
- [x] Position field removed (not needed)
- [x] Image upload with name-based filename + duplicate suffix
- [x] **Display** - Table renders correctly with Name, Team, Department
- [x] **Create** - Add new member with image upload ✅
- [x] **Update** - Edit existing member ✅
- [x] **Delete** - Remove member (confirmed working) ✅
- [x] **Filename** - Stored as `name.ext` with `-1`, `-2` suffix for duplicates
- [x] **Frozen** - No further changes

### File Upload Pattern
- [x] All 15 upload calls updated to use `baseName` parameter
- [x] Filename = entity name (sanitized) + extension
- [x] Duplicate detection adds `-1`, `-2`, etc. suffix
- [x] No subfolders - flat structure in bucket root

### Frozen (No Further Changes)
- **Leadership** - Type tabs, role dropdowns, CRUD complete
- **Members** - Team dropdown, CRUD complete
- **Events** - CRUD + Gallery complete
- **Notices** - CRUD + Attachment upload complete
- **Ambassadors** - CRUD + Public modal complete
- **Research** - CRUD + Multiple docs + Public modal complete

### Conditional Display (Department/Designation)
- [x] **Events page** (`src/pages/Events/Events.jsx`) - Faculty cards only show dept/designation if exist
- [x] **Leadership page** (`src/components/cards/MemberCard.jsx`) - Leadership cards only show dept/designation if exist
- [x] **Admin Leadership** - Type tabs (Student/Faculty) with role dropdown
- [x] **DEPARTMENTS** added "Administration" for President/Dean

---
 
## 📁 Evidence (Archived)
- `sidharth-test/tested/evidence/event_gallery_migration.sql` (moved)
 
---

## 🔧 Pending / To Test

### Other Admin Pages (dropdown custom option pattern ready)
- [ ] Notices - Category custom option
- [ ] Events - Status custom option
- [ ] Projects - Category/Status custom option
- [ ] Research - Category/Status custom option
- [ ] Certificates - Category custom option
- [ ] Ideas (admin + public) - Category/Department/Year custom option
- [ ] Queries (admin + public) - Category/Department custom option

### Public Forms
- [ ] IdeaForm (public) - test file upload with custom naming
- [ ] QueryForm (public) - test file upload with custom naming

---

## 📝 Notes

**Dropdown Customization Guide:** `changes/DROPDOWN_CUSTOMIZATION_GUIDE.md`

**Key Files Modified:**
- `src/utils/supabaseStorage.js` - Core upload logic with duplicate detection
- `src/admin/pages/Leadership/AdminLeadership.jsx` - Type tabs, role dropdowns with custom option
- `src/pages/InnovationAmbassadors/InnovationAmbassadors.jsx` - Public modal with conditional display
- `src/pages/Research/Research.jsx` - Public modal, conditional display, tabs removed
- `src/admin/pages/Research/AdminResearch.jsx` - Multiple document upload
- 13 admin/page/form files - Updated to pass `baseName` for filename generation