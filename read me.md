Institution’s Innovation Council (IIC) Portal

Complete Project Brief & Development Documentation

1. Project Overview

The Institution’s Innovation Council (IIC) Portal is a modern, responsive web application designed to
serve as the official digital platform of the Institution’s Innovation Council.
The portal will showcase the institution’s innovation activities, leadership, events, notices, research, active
projects, certifications, and Innovation Ambassadors. It will also provide an interactive platform where
students and users can submit innovative ideas and ask queries.
An Admin Dashboard will allow authorized administrators to manage the website content without
modifying the source code.
The application will use React for the frontend and Supabase for database, authentication, and file
storage. There will be no traditional Node.js/Express backend.
2. Project Objectives
The main objectives are:
● Create a modern official website for the IIC.
● Showcase IIC activities and achievements.
● Display leadership and team members.
● Publish upcoming and past events.
● Provide live countdowns for upcoming events.
● Publish official notices and announcements.
● Showcase Innovation Ambassadors.
● Display research and development activities.
● Showcase active student and institutional projects.
● Display establishment documents and certifications.
● Allow users to submit innovative ideas.
● Allow users to submit queries.
● Provide a secure Admin Dashboard.
● Allow administrators to manage website content dynamically.
3. Technology Stack
Frontend
● React
● Vite
● React Router DOM
● Tailwind CSS
● Framer Motion
● Lucide React
● React Hook Form
● React Toastify
● Swiper.js
Backend Services
Supabase
Supabase will provide:
● PostgreSQL Database
● Admin Authentication
● File Storage
● Row Level Security (RLS)
Deployment
● Frontend: Vercel or Netlify
● Database: Supabase PostgreSQL
● Authentication: Supabase Auth
● Images and Documents: Supabase Storage
4. System Architecture
USERS
│
▼
React Web Application
│
Supabase JavaScript SDK
│
┌──────────────┼──────────────┐
│ │ │
▼ ▼ ▼
PostgreSQL Authentication Storage
Database Admin Login Images/PDFs
There is no separate Express or Node.js backend.

5. User Roles

5.1 Public User

Public users can:
● View all public pages.
● View leadership and members.
● View events.
● View notices.
● View Innovation Ambassadors.
● View research activities.
● View active projects.
● View certifications.
● Submit ideas.
● Submit queries.
● Submit contact messages.
Public users cannot:
● Access the Admin Dashboard.
● Edit or delete website content.

5.2 Administrator

Administrators can:
● Securely log in.
● Access the Admin Dashboard.
● Add, edit, and delete website content.
● Manage leadership.
● Manage members.
● Manage events.
● Manage notices.
● Manage Innovation Ambassadors.
● Manage R&D content.
● Manage projects.
● Manage certifications.
● Review submitted ideas.
● View and reply to queries.
● View contact messages.
● Manage website settings.

6. Website Pages

The website will contain the following main pages:
Home
│
├── About
├── Leadership & Members
├── Events
├── Notices
├── Innovation Ambassadors
├── Research & Development
├── Active Projects
├── Establishment & Certifications
├── Ideas & Queries
├── Contact Us
└── Admin Dashboard

7. Home Page

The Home page will be the main landing page of the website.
Sections
Hero Section
Contains:
● IIC name
● Institution name
● Main tagline
● Short introduction
● Call-to-action buttons
● Modern animated visual
Example:
Innovate. Inspire. Impact.
About Preview
A short introduction to the IIC with a Learn More button.
Statistics
Display animated statistics such as:
● Events Conducted
● Active Projects
● Innovation Ambassadors
● Ideas Received
● Research Projects
Upcoming Event
Display the next upcoming event with:
● Event poster
● Event title
● Date
● Venue
● Live countdown
● Registration button
Latest Notices
Display the latest 3–5 notices.
Each notice shows:
● Title
● Date
● Category
● NEW badge
● View details
Featured Projects
Display selected active projects.
Innovation Highlights
Show important achievements and activities.
Gallery Preview
Display recent activity images.
Contact CTA
Encourage users to:
● Submit an idea
● Ask a query
● Contact the IIC

8. About Page

The About page provides information about the Institution’s Innovation Council.
Sections
● About IIC
● History
● Vision
● Mission
● Objectives
● Functions of IIC
● Institution Details

9. Leadership & Members Page

This page displays the people responsible for managing the IIC.
Leadership Section
Important leadership profiles include:
● Director
● Chairperson
● Faculty Coordinator
● President
● Startup Coordinator
● Other key leadership positions
Each profile contains:
● Photo
● Name
● Position
● Department
● Short description
● Email, if required
● LinkedIn, if required
Members Section
Members can be grouped according to teams.
Examples:
● Executive Team
● Technical Team
● Media Team
● Design Team
● Event Team
● Documentation Team
● Other Teams
Each member contains:
● Photo
● Name
● Position
● Team
● Department

10. Events Page

The Events page will have two sections.
Upcoming Events
Each event contains:
● Event poster
● Event title
● Description
● Date
● Time
● Venue
● Registration link
● Live countdown
Example:
INNOVATION WORKSHOP
Starts In:
04 Days : 12 Hours : 35 Minutes
Past Events
Past events display:
● Event title
● Poster
● Date
● Description
● Gallery
● Event report
● Winners, if applicable
Events automatically move from upcoming to past based on the event date, where appropriate.

11. Notices Page

The Notices page displays official IIC announcements.
Types of Notices
● General
● Important
● Events
● Workshops
● Competitions
● Hackathons
● Funding Opportunities
● Internship Opportunities
Each Notice Contains
● Notice title
● Description
● Category
● Published date
● Deadline
● PDF attachment, if available
● External link, if available
● NEW badge for recent notices
Additional Features
● Search notices
● Filter by category
● Sort by latest
● Pin important notices
The Home page will display the latest notices.

12. Innovation Ambassadors Page

This page showcases the institution's Innovation Ambassadors.
Each profile contains:
● Photo
● Name
● Department
● Position
● Responsibilities
● Achievements
● Year/Batch

13. Research & Development Page

The R&D page showcases research and innovation activities.
Sections
● Ongoing Research
● Completed Research
● Publications
● Patents
● Research Collaborations
● Research Achievements
Each research item can contain:
● Title
● Description
● Researcher/Team
● Faculty Mentor
● Category
● Status
● Images
● Documents

14. Active Projects Page

This page showcases projects currently being developed.
Each project contains:
● Project title
● Cover image
● Description
● Team members
● Team lead
● Faculty mentor
● Technologies used
● Category
● Current status
● Progress
● GitHub or project link, if public
Project Categories
Examples:
● Artificial Intelligence
● Machine Learning
● IoT
● Robotics
● Web Development
● Cybersecurity
● Sustainability
● Healthcare
● Other

15. Establishment & Certifications Page

This page stores and displays official IIC-related documents.
Content
● Establishment Certificate
● Establishment Order
● IIC Certificates
● Star Rating Certificates
● Awards
● Recognition
● Annual Reports
● NISP Documents
Each document contains:
● Title
● Category
● Year
● Description
● Thumbnail
● PDF/document

16. Ideas & Queries Page

This is an interactive section of the website.
The page will contain two main options:
💡 Submit an Idea
❓ Ask a Query

16.1 Submit an Idea

Users can submit innovative ideas.
Form Fields
● Full Name
● Register Number, optional
● Department
● Year
● Email
● Phone, optional
● Idea Title
● Category
● Problem Statement
● Proposed Solution
● Expected Impact
● Attachment, optional
Idea Status
● Pending
● Under Review
● Approved
● Rejected
The default status is Pending.
The administrator can review the idea and update its status.

16.2 Ask a Query

Users can submit questions to the IIC.
Query Categories
● Startup
● Innovation
● Patent/IPR
● Funding
● Event
● General
Form Fields
● Name
● Email
● Department
● Subject
● Category
● Message
● Attachment, optional
Query Status
● Open
● In Progress
● Resolved
● Closed
Administrators can view queries and add replies.

17. Contact Us Page

The Contact page contains:
● IIC email
● Phone number
● Institution address
● Google Map
● Social media links
● Contact form
Contact Form
Fields:
● Name
● Email
● Phone
● Subject
● Message
The submitted message will be stored in Supabase.

18. Admin Authentication

The Admin Dashboard will use Supabase Authentication.
Login
Admin enters:
● Email
● Password
After successful authentication:
Login
↓
Supabase Authentication
↓
Verify User
↓
Admin Dashboard
Unauthenticated users cannot access protected admin pages.

19. Admin Dashboard

The Admin Dashboard will provide complete website management.
Admin Dashboard
│
├── Overview
├── Leadership
├── Members
├── Events
├── Notices
├── Innovation Ambassadors
├── Research & Development
├── Active Projects
├── Establishment & Certifications
├── Ideas
├── Queries
├── Contact Messages
├── Gallery
└── Website Settings

20. Dashboard Overview

Display statistics such as:
● Total Members
● Total Events
● Upcoming Events
● Total Notices
● Active Projects
● Ideas Received
● Pending Ideas
● Open Queries

21. Admin CRUD Operations

For most modules, administrators can perform:
CREATE
READ
UPDATE
DELETE
Example:
Add Event
View Event
Edit Event
Delete Event

22. Supabase Database Tables

The project will use the following tables:
leadership
members
events
notices
ambassadors
research
projects
certificates
gallery
ideas
queries
contacts
settings
Admin authentication will be managed using Supabase Auth rather than storing passwords manually.

23. Database Overview

Leadership
id
name
position
department
image_url
email
linkedin
display_order
is_active
created_at
Members
id
name
position
team
department
image_url
display_order
is_active
created_at
Events
id
title
description
poster_url
event_date
event_time
venue
registration_url
status
created_at
Notices
id
title
description
category
published_date
deadline
attachment_url
external_link
is_pinned
is_active
created_at
Innovation Ambassadors
id
name
department
position
image_url
responsibilities
achievements
year
is_active
created_at
Research
id
title
description
researcher
mentor
category
status
image_url
document_url
created_at
Projects
id
title
description
team_lead
team_members
mentor
technologies
category
status
progress
image_url
project_url
created_at
Certificates
id
title
category
year
description
thumbnail_url
document_url
created_at
Ideas
id
name
register_number
department
year
email
phone
title
category
problem_statement
proposed_solution
expected_impact
attachment_url
status
admin_remarks
created_at
Queries
id
name
email
department
subject
category
message
attachment_url
reply
status
created_at
Contacts
id
name
email
phone
subject
message
created_at
24. Supabase Storage
Storage buckets can include:
leadership-images
member-images
event-posters
event-gallery
ambassador-images
project-images
research-files
certificates
idea-attachments
query-attachments
website-assets
The database stores the file URL while the actual file is stored in Supabase Storage.

25. Security

The project should use:
● Supabase Authentication
● Row Level Security (RLS)
● Protected Admin Routes
● Input validation
● File type validation
● File size restrictions
● Secure environment variables
Public Access
Public users can:
● Read published website content.
● Insert ideas.
● Insert queries.
● Insert contact messages.
Admin Access
Only authenticated administrators can:
● Add content.
● Edit content.
● Delete content.
● Review ideas.
● Reply to queries.
● Access private submissions.

26. Project Structure

iic-portal/
│
├── public/
│
├── src/
│
│ ├── assets/
│
│ ├── components/
│ │ ├── common/
│ │ │ ├── Button.jsx
│ │ │ ├── Loader.jsx
│ │ │ └── Modal.jsx
│ │ │
│ │ ├── layout/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ └── AdminSidebar.jsx
│ │ │
│ │ ├── cards/
│ │ │ ├── MemberCard.jsx
│ │ │ ├── EventCard.jsx
│ │ │ ├── NoticeCard.jsx
│ │ │ └── ProjectCard.jsx
│ │ │
│ │ ├── forms/
│ │ │ ├── IdeaForm.jsx
│ │ │ ├── QueryForm.jsx
│ │ │ └── ContactForm.jsx
│ │ │
│ │ └── Countdown/
│ │ └── Countdown.jsx
│ │
│ ├── pages/
│ │ ├── Home/
│ │ ├── About/
│ │ ├── Leadership/
│ │ ├── Events/
│ │ ├── Notices/
│ │ ├── InnovationAmbassadors/
│ │ ├── Research/
│ │ ├── Projects/
│ │ ├── Establishment/
│ │ ├── Ideas/
│ │ ├── Contact/
│ │ ├── Login/
│ │ │
│ │ └── Admin/
│ │ ├── Dashboard/
│ │ ├── Leadership/
│ │ ├── Members/
│ │ ├── Events/
│ │ ├── Notices/
│ │ ├── Ambassadors/
│ │ ├── Research/
│ │ ├── Projects/
│ │ ├── Certificates/
│ │ ├── Ideas/
│ │ ├── Queries/
│ │ ├── Contacts/
│ │ └── Settings/
│ │
│ ├── services/
│ │ └── supabase.js
│ │
│ ├── context/
│ │ └── AuthContext.jsx
│ │
│ ├── hooks/
│ ├── utils/
│ ├── routes/
│ │ └── ProtectedRoute.jsx
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── .env
├── package.json
└── README.md

27. Public Routes

/ Home
/about About
/leadership Leadership & Members
/events Events
/notices Notices
/ambassadors Innovation Ambassadors
/research Research & Development
/projects Active Projects
/establishment Establishment & Certifications
/ideas Ideas & Queries
/contact Contact Us
28. Admin Routes
/admin/login
/admin/dashboard
/admin/leadership
/admin/members
/admin/events
/admin/notices
/admin/ambassadors
/admin/research
/admin/projects
/admin/certificates
/admin/ideas
/admin/queries
/admin/contacts
/admin/settings
All routes except /admin/login must be protected.
29. UI Design Direction
The website should have a modern innovation/startup ecosystem appearance, rather than a traditional
college website.
Design Style
● Clean white background
● Blue, purple, and cyan accents
● Modern typography
● Large headings
● Soft shadows
● Rounded cards
● Glassmorphism elements
● Smooth animations
● Responsive design
● Interactive hover effects
● Subtle gradients
Suggested Colors
Primary #2563EB
Secondary #7C3AED
Accent #06B6D4
Success #10B981
Background #F8FAFC
Dark #0F172A
30. Responsive Design
The website must support:
● Desktop
● Laptop
● Tablet
● Mobile
The mobile version must include:
● Responsive navigation menu
● Touch-friendly buttons
● Responsive cards
● Optimized images
● Mobile-friendly forms

31. Team Division

Team/Role Responsibility
Project Lead Architecture, coordination, integration
UI/UX Design system and page layouts
Frontend Team React pages and reusable components
Supabase Team Database, authentication, storage and RLS
Admin Dashboard Team CRUD and content management
Testing Team Functional and responsive testing
Content Team Text, images, events, certificates and member information

32. Development Phases

Phase 1 — Foundation
● Create React project
● Configure Tailwind CSS
● Configure routing
● Create design system
● Build Navbar and Footer
● Configure Supabase

Phase 2 — Public Website
Develop:
● Home
● About
● Leadership & Members
● Events
● Notices
● Innovation Ambassadors
● R&D
● Active Projects
● Establishment & Certifications
● Ideas & Queries
● Contact

Phase 3 — Supabase Integration
● Create database tables
● Configure storage
● Configure authentication
● Configure RLS policies
● Connect React forms

Phase 4 — Admin Dashboard
Develop CRUD management for all dynamic website content.

Phase 5 — Testing

● Functional testing
● Form testing
● Authentication testing
● Responsive testing
● Browser testing
● Security testing

Phase 6 — Deployment
● Deploy React application
● Configure environment variables
● Connect production Supabase project
● Test production website

33. Final Architecture

IIC PORTAL
│
┌────────────┴────────────┐
│ │
PUBLIC WEBSITE ADMIN PANEL
│ │
├── Home ├── Dashboard
├── About ├── Members
├── Leadership ├── Events
├── Events ├── Notices
├── Notices ├── Projects
├── Ambassadors ├── R&D
├── R&D ├── Certificates
├── Projects ├── Ideas
├── Certificates ├── Queries
├── Ideas & Queries └── Settings
└── Contact
│
▼
SUPABASE
┌──────────┼──────────┐
│ │ │
Database Auth Storage

34. Final Project Summary

The IIC Portal will be a dynamic, modern, and fully manageable institutional platform built using:
React + Vite + Tailwind CSS + Supabase
The project does not require a traditional backend server. Supabase will handle the database, admin
authentication, file storage, and access control.
The final system will provide:
● A modern public website
● Dynamic event management
● Upcoming event countdowns
● Notice publishing
● Leadership and team management
● Innovation Ambassador profiles
● R&D showcase
● Active project showcase
● Certifications and document management
● Public idea submission
● Public query submission
● Contact management
● Secure Admin Dashboard
● Full content management through Supabase
