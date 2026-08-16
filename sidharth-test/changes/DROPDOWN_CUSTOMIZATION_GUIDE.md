# Dropdown Customization Guide - All Admin Forms

**Location:** `src/admin/pages/`, `src/components/forms/`, `src/utils/helpers.js`

---

## Central Constants (`src/utils/helpers.js`)

| Constant | Line | Used In |
|----------|------|---------|
| `DEPARTMENTS` | 50-53 | Leadership, Members, Ambassadors, Ideas, Queries |
| `YEARS` | 55 | Ideas, Ambassadors |
| `IDEA_CATEGORIES` | 36-39 | Ideas (admin + public) |
| `QUERY_CATEGORIES` | 41-43 | Queries (admin + public) |
| `NOTICE_CATEGORIES` | 31-34 | Notices |
| `PROJECT_CATEGORIES` | 45-48 | Projects, Events |
| `RESEARCH_CATEGORIES` | 60-65 | Research |
| `RESEARCH_STATUSES` | 67 | Research |

---

## Leadership Page (`src/admin/pages/Leadership/AdminLeadership.jsx`)

**Student Roles (Line 13-20):**
```javascript
const STUDENT_ROLES = [
  'Innovation Coordinator',
  'Internship Coordinator',
  'Core Member',
  'IPR Coordinator',
  'Start Up Coordinator',
  'Social Media Coordinator',
];
```

**Faculty Roles (Line 22-34):**
```javascript
const FACULTY_ROLES = [
  'IIC President',
  'Convener',
  'NIRF Coordinator',
  'Member',
  'Innovation Activity Coordinator',
  'IPR Activity Coordinator',
  'Social Media Coordinator',
  'Startup Activity Coordinator',
  'Vice President',
  'RD Cell Coordinator',
  'Internship Activity Coordinator',
];
```

**Type Dropdown:** Student / Faculty tabs (controls which role dropdown shows)

**Department:** Uses `DEPARTMENTS` from helpers (CS & IT, VM & Communication, Commerce and Management, Physical Sciences, Administration)

**Conditional Display:** Department and Designation only render if present in DB

**To Modify Roles:** Edit `STUDENT_ROLES` or `FACULTY_ROLES` arrays

---

## Members Page (`src/admin/pages/Members/AdminMembers.jsx`)

**Team Dropdown (Local - Line 13-19):**
```javascript
const MEMBER_TEAMS = [
  'Innovation Team',
  'Internship Team',
  'IPR Team',
  'Social Media Team',
  'Start Up Team',
];
```

**Department:** Uses `DEPARTMENTS` from helpers (CS & IT, VM & Communication, Commerce and Management, Physical Sciences)

**Position:** Removed (not needed for members)

**No custom option currently** (Team is fixed dropdown)

**To Modify Teams:** Edit `MEMBER_TEAMS` array at line 13-19

---

## Ambassadors Page (`src/admin/pages/Ambassadors/AdminAmbassadors.jsx`)

**Department:** Uses `DEPARTMENTS` from helpers (Line 95)

**Year:** Uses `YEARS` from helpers (Line 97)

**No custom option currently**

---

## Notices Page (`src/admin/pages/Notices/AdminNotices.jsx`)

**Category:** Uses `NOTICE_CATEGORIES` from helpers (Line 99)

**No custom option currently**

---

## Events Page (`src/admin/pages/Events/AdminEvents.jsx`)

**Status Dropdown (Line 102):**
```jsx
<select {...register('status')} className="w-full px-4 py-2.5 admin-input">
  <option value="upcoming">Upcoming</option>
  <option value="featured">Featured</option>
  <option value="past">Past</option>
</select>
```

**No custom option currently**

---

## Events Page - Public Display (`src/pages/Events/Events.jsx`)

**Faculty Coordinators Section:**
- Fetches faculty from `leadership` table where `type = 'faculty'`
- Displays in grid with image, name, role, department, designation, email
- **Conditional display:** Department and Designation only render if present in DB

**To Modify:** Edit the faculty query filter or grid layout in `src/pages/Events/Events.jsx`

---

## Projects Page (`src/admin/pages/Projects/AdminProjects.jsx`)

**Category:** Uses `PROJECT_CATEGORIES` from helpers (Line 102)

**Status (Line 103):**
```jsx
<select {...register('status')} className="w-full px-4 py-2.5 admin-input">
  <option>In Progress</option>
  <option>Completed</option>
  <option>Planning</option>
</select>
```

**No custom option currently**

---

## Research Page (`src/admin/pages/Research/AdminResearch.jsx`)

**Category:** Uses `RESEARCH_CATEGORIES` from helpers (Line 122)

**Status:** Uses `RESEARCH_STATUSES` from helpers (Line 128)

**Multiple Document Upload:** Added support for multiple document uploads stored in `document_urls` (jsonb column)

**No custom option currently**

---

## Certificates Page (`src/admin/pages/Certificates/AdminCertificates.jsx`)

**Category (Line 250-266):**
```jsx
<select {...register('category', { required: true })} className="w-full px-4 py-2.5 admin-input">
  <option value="">Select category</option>
  <option value="Establishment Order">Establishment Order</option>
  <option value="Certificate">Certificate</option>
  <option value="Award">Award</option>
  <option value="Annual Report">Annual Report</option>
  <option value="NISP Document">NISP Document</option>
</select>
```

**No custom option currently**

---

## Ideas Form - Public (`src/components/forms/IdeaForm.jsx`)

**Category:** Uses `IDEA_CATEGORIES` from helpers (Line 89)

**Department:** Uses `DEPARTMENTS` from helpers (Line 61)

**Year:** Uses `YEARS` from helpers (Line 67)

---

## Ideas Form - Admin (`src/admin/components/forms/IdeaForm.jsx`)

**Category:** Uses `IDEA_CATEGORIES` from helpers (Line 80)

**Department:** Uses `DEPARTMENTS` from helpers (Line 52)

**Year:** Uses `YEARS` from helpers (Line 59)

---

## Queries Form - Public (`src/components/forms/QueryForm.jsx`)

**Category:** Uses `QUERY_CATEGORIES` from helpers (Line 64)

**Department:** Uses `DEPARTMENTS` from helpers (Line 56)

---

## Queries Form - Admin (`src/admin/components/forms/QueryForm.jsx`)

**Category:** Uses `QUERY_CATEGORIES` from helpers (Line 59)

**Department:** Uses `DEPARTMENTS` from helpers (Line 52)

---

## Pattern to Add Custom Option to Any Dropdown

### 1. Add State
```javascript
const [showCustom, setShowCustom] = useState(false);
```

### 2. Update Select
```jsx
<select 
  {...register('fieldName')} 
  className="w-full px-4 py-2.5 admin-input"
  onChange={(e) => setShowCustom(e.target.value === 'custom')}
>
  <option value="">Select</option>
  {CONSTANT_ARRAY.map((item) => <option key={item} value={item}>{item}</option>)}
  <option value="custom">Other (Custom)</option>
</select>
```

### 3. Add Conditional Input
```jsx
{showCustom && (
  <input 
    {...register('customField', { required: true })} 
    className="w-full px-4 py-2.5 admin-input mt-2" 
    placeholder="Enter custom value"
  />
)}
```

### 4. Handle Submit
```javascript
const onSubmit = async (data) => {
  const payload = { ...data };
  if (data.fieldName === 'custom') {
    payload.fieldName = data.customField;
  }
  delete payload.customField;
  // ... submit
};
```

### 5. Handle Edit (pre-fill)
```javascript
const openEdit = (item) => {
  const isCustom = !CONSTANT_ARRAY.includes(item.fieldName);
  reset({ ...item, customField: isCustom ? item.fieldName : '' });
  setShowCustom(isCustom);
  setModalOpen(true);
};
```

---

## Quick Reference: Files to Edit for Each Dropdown

| Dropdown | File | Line Range |
|----------|------|------------|
| Leadership Student Roles | `src/admin/pages/Leadership/AdminLeadership.jsx` | 13-20 |
| Leadership Faculty Roles | `src/admin/pages/Leadership/AdminLeadership.jsx` | 22-34 |
| Members Team | `src/admin/pages/Members/AdminMembers.jsx` | 13-19 |
| Departments (global) | `src/utils/helpers.js` | 50-54 |
| Years (global) | `src/utils/helpers.js` | 56 |
| Idea Categories (global) | `src/utils/helpers.js` | 36-39 |
| Query Categories (global) | `src/utils/helpers.js` | 41-43 |
| Notice Categories (global) | `src/utils/helpers.js` | 31-34 |
| Project Categories (global) | `src/utils/helpers.js` | 45-48 |
| Research Categories (global) | `src/utils/helpers.js` | 60-65 |
| Research Statuses (global) | `src/utils/helpers.js` | 67 |
| Certificates Categories | `src/admin/pages/Certificates/AdminCertificates.jsx` | 250-266 |
| Event Status | `src/admin/pages/Events/AdminEvents.jsx` | 102 |
| Project Status | `src/admin/pages/Projects/AdminProjects.jsx` | 103 |