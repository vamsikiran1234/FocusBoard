# AI Usage Disclosure (AI_USAGE.md)

This document satisfies the AI Tool Usage disclosure requirement as outlined in the FocusBoard Assessment Specification.

---

## 1. Tools Used
- **Primary AI Assistant:** Antigravity (Powered by Google Gemini 3.8 Flash model)
- **Editor / IDE:** VS Code / Antigravity IDE

---

## 2. Representative Prompts Used
Below are 4 representative prompts used during the development of this project:

### Prompt 1: Project Scaffolding & Architecture
> *"Set up a clean, high-performance React + TypeScript + Tailwind CSS project using Vite for FocusBoard. Ensure the color palette, typography (Plus Jakarta Sans/Inter), shadows, and border radii match the Figma specification."*

### Prompt 2: State Management & Derived Values
> *"Implement a robust TaskProvider using React Context and custom hooks. The state must serve as a single source of truth across cards, rows, filters, and forms. Ensure task totals, in-progress count, completed count, and completion percentages are derived dynamically from state rather than hardcoded. Add localStorage persistence that seeds initial sample data on first run without overwriting saved user updates."*

### Prompt 3: Focus Notes Carousel & Responsive Layout
> *"Build the 3-slide Focus Notes carousel matching Figma frames 15:2, 15:30, and 15:58 with previous/next controls, slide indicators, and the floating preview card. Ensure seamless responsiveness across 390px (mobile), 768px (tablet), and 1440px (desktop)."*

### Prompt 4: Task Modal, Validation & Destructive Confirmations
> *"Create the task modal matching Figma 760x822 with title required-field validation, category, status, priority, and date pickers. Add keyboard accessibility (Escape to close, auto-focus) and a confirmation dialog before deleting tasks."*

---

## 3. AI-Assisted Areas
- **UI Architecture & Layout:** Component breakdown matching Figma hierarchy (Sidebar, Header, Focus Notes Carousel, Stat Cards, Task List, Modals, Mobile Bottom Nav).
- **TypeScript Type Definitions:** Strongly typed task schemas (`Task`, `TaskStatus`, `TaskPriority`, `TaskCategory`, `FocusSlide`).
- **Data Persistence & Hydration:** LocalStorage persistence hook with schema safety and fallback to initial 12 sample tasks.
- **Automated Test Suite:** Vitest + React Testing Library test cases for statistics calculations, multi-filter search logic, carousel slide state, and modal CRUD operations.

---

## 4. Suggestions Checked, Corrected, or Rejected
- **Checked & Corrected (Derived State vs Duplicated State):**
  - *Initial Suggestion:* An AI suggestion proposed storing `totalTasks`, `completedTasks`, and `inProgressTasks` as separate state variables that get incremented/decremented inside task reducer actions.
  - *Correction Made:* Rejected storing derived counts in separate state variables because it violates the "single source of truth" requirement and can lead to synchronization drift during search/filtering or mass status updates. Instead, implemented `useMemo` to derive counts and percentages dynamically from the core `tasks` array, guaranteeing consistency across the entire UI.
- **Checked & Corrected (Mobile Form Factor Adaptation):**
  - *Initial Suggestion:* Using a single desktop table/row view with overflow scroll on mobile screens.
  - *Correction Made:* Adapted to Figma's specific mobile design (frame 1:167) featuring stacked cards, quick touch-friendly checkboxes, bottom navigation bar, and prominent floating action button for mobile users, avoiding horizontal scrolling.
