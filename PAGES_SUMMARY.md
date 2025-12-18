# MBA Admin Portal - Pages Summary

This document provides an overview of all the pages created for the MBA Admin Portal.

## Created Pages

### 1. Faculty Management (`/dashboard/faculty`)
**Location:** `src/pages/FacultyManagement.tsx`

**Features:**
- Faculty table with sortable columns
- Checkboxes for bulk selection
- Avatar display with initials
- Status badges (active/inactive)
- Star ratings display
- Filters for department, status, and experience range
- Add new faculty modal with comprehensive form
- Edit and delete actions for each faculty member

**Components:**
- `FacultyTable.tsx` - Main table component
- `FacultyFilters.tsx` - Filter controls
- `AddFacultyModal.tsx` - Modal for adding new faculty

**Sample Data:**
- 5 faculty members with various departments (Finance, Marketing, Operations, HR)
- Different experience levels and qualifications

---

### 2. Admissions (`/dashboard/admissions`)
**Location:** `src/pages/Admissions.tsx`

**Features:**
- 5-stage admission funnel visualization (Applied → Shortlisted → Interviewed → Offered → Enrolled)
- Applicant cards with detailed information
- Progress bars showing current stage
- Filters for specialization, stage, and GMAT score
- Sort options (date, GMAT, name, experience)
- Export data and bulk email functionality
- Load more pagination

**Components:**
- `AdmissionFunnel.tsx` - Funnel visualization with colored stages
- `ApplicantCard.tsx` - Individual applicant card
- `AdmissionFilters.tsx` - Filter and sort controls

**Sample Data:**
- 8 applicants with various stages and specializations
- GMAT scores ranging from 665-750
- Different experience levels (2-7 years)

---

### 3. Contact & Enquiry Management (`/dashboard/contact`)
**Location:** `src/pages/ContactEnquiry.tsx`

**Features:**
- Two tabs: Enquiries and Contact Information
- Expandable enquiry cards with full message details
- Status badges (new, in-progress, responded)
- Priority badges (high, medium, low)
- Source icons (website, email, phone, social media)
- Filters for status, priority, and source
- Search functionality across all enquiry fields
- Reply and mark as responded actions
- Contact information cards for different departments

**Components:**
- `EnquiryCard.tsx` - Expandable enquiry card
- `EnquiryFilters.tsx` - Filter and search controls
- `ContactInfoCard.tsx` - Contact information display

**Sample Data:**
- 5 enquiries with various statuses and priorities
- Contact information for main office, admissions, and student services

---

## Design Consistency

All pages follow the same design system:
- **Color Scheme:** Emerald green primary, with blue, orange, purple, and pink accents
- **Typography:** Inter font family
- **Components:** Shadcn UI components (tables, cards, badges, buttons, dialogs)
- **Layout:** Consistent padding, spacing, and card-based design
- **Interactions:** Hover effects, smooth transitions, and responsive design

## Navigation

All pages are accessible from the sidebar navigation:
- Overview → `/dashboard`
- Courses Management → `/dashboard/courses`
- Faculty Management → `/dashboard/faculty`
- Admissions → `/dashboard/admissions`
- Contact & Enquiry → `/dashboard/contact`

## Next Steps

Additional pages that can be created based on the sidebar menu:
- Analytics (`/dashboard/analytics`)
- Settings (`/dashboard/settings`)
- Placements (`/dashboard/placements`)
- Student Life (`/dashboard/student-life`)
