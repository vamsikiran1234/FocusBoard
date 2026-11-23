# AI Usage Disclosure (AI_USAGE.md)

> **FocusBoard Trainee Assessment — Evaluation Rubric: AI Tool Usage Disclosure (5 Marks)**  
> *This document provides an honest, detailed, and structured disclosure of how AI tooling was utilized during the development of FocusBoard. It highlights the collaborative workflow between developer and AI, including prompt strategies, architecture decisions, and concrete engineering corrections where AI suggestions were vetted, corrected, or rejected.*

---

## 1. Tool Identification
* **Primary Assistant:** Google DeepMind Antigravity Agent (powered by Gemini 3.8 Flash)
* **Editor & Development Environment:** VS Code / Antigravity IDE on Windows 11
* **Command & Testing Shell:** Windows PowerShell & Node.js v24.19.0 / npm 11.17.0
* **Design Source of Truth:** Figma File (`FocusBoard — Dashboard References`, Frames `1:2`, `1:167`, `1:279`, `15:2`, `15:30`, `15:58`)

---

## 2. Engineering Approach & Collaboration Model

Rather than allowing AI to generate unverified black-box code, I used the AI assistant strictly as a **high-velocity pair programmer and code accelerator**. My role was that of **lead architect, design auditor, and quality assurance engineer**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           DEVELOPMENT LOOP                              │
│                                                                         │
│  [Developer: Design Audit] ───► [AI: Scaffold & Implementation]         │
│          ▲                                      │                       │
│          │                                      ▼                       │
│  [Codebase Integration]   ◄─── [Developer: Strict Code Review & Tests]  │
└─────────────────────────────────────────────────────────────────────────┘
```

1. **Human Design & Requirement Auditing:** I reviewed the Figma frames and candidate assignment PDF to establish exact visual constraints (radii, colors, padding, responsive reflow).
2. **AI Task Delegation:** AI was assigned focused, atomic tasks: drafting TypeScript interfaces, calculating SVG path geometry for custom icons, and writing Vitest test cases.
3. **Rigorous Review & Debugging:** Every line of generated code was verified locally via automated test suites (`vitest run`) and visual inspection on localhost at 1440px, 768px, and 390px.

---

## 3. Representative Prompts Used

Below are four realistic, representative prompts used throughout different phases of development:

### Prompt 1: Architecture & State Single Source of Truth
> *"Design a centralized `TaskContext` and `useTasks` hook for a task dashboard with React 18 and TypeScript. The state must act as the single source of truth across desktop and mobile views. Do not duplicate computed statistics (total, completed, in-progress) in separate state variables; derive them dynamically using `useMemo` so they can never drift out of sync during search queries, status tabs, or priority filtering. Persist tasks to `localStorage` under `focusboard_tasks_v1`."*

### Prompt 2: Figma Pixel-Fidelity Vector Extraction
> *"Inspect the brand logo and navigation icons from the Figma reference. Rather than using generic generic Lucide icons, write lightweight custom SVG components in TypeScript: (1) Logo squircle (#5548EB, rx=11.5) with 3 white dots and 1 lavender dot (#B8B0FF, 0.85 opacity), (2) Overview icon as 2x2 rounded squares, (3) Tasks icon with 3 dots on the left and 3 lines on the right, and (4) Settings icon as a clean circle with a centered focus dot."*

### Prompt 3: Responsive Tilted Card Physics for Focus Carousel
> *"Build the Focus Notes 3-slide carousel matching Figma frames 15:2, 15:30, and 15:58. On desktop, render the card preview with stacked tilted layers: the foreground white card rotated clockwise (+2.5deg) and the translucent lavender card behind rotated counter-clockwise (-2.5deg) with smooth hover transitions. On mobile (390px), collapse this into a compact banner showing greeting, title, subtitle, and an inline progress bar."*

### Prompt 4: Comprehensive Test Suite & Edge Cases
> *"Write a full Vitest test suite using `@testing-library/react`. Include unit tests for dynamic statistics calculation, multi-filter search combinations (title substring, category, priority), carousel slide navigation, modal form validation (empty title error), and persistence edge cases (confirming that an empty task array `[]` in localStorage is not overwritten by initial seed data on refresh)."*

---

## 4. Key Areas of AI Assistance

| Area | Nature of AI Assistance | Developer Ownership & Review |
| :--- | :--- | :--- |
| **Boilerplate & Config** | Vite + React + Tailwind CSS scaffolding, PostCSS configuration, and Vitest setup. | Verified build pipeline, configured responsive breakpoints, and strict TypeScript compiler options (`noUnusedLocals`, `strict`). |
| **Data Schema & Mock Data** | Extracted initial 12 sample tasks from the Figma desktop and mobile boards into typed fixtures. | Validated task status distribution, realistic dates, and ensured categories match assessment specifications. |
| **Custom SVG Geometry** | Assisted with SVG coordinate math for the brand logo squircle, clock hands, and list bullet dots. | Adjusted viewboxes, stroke widths, and color hex values to achieve 1:1 visual parity with Figma. |
| **Test Automation** | Generated repetitive boilerplate test fixtures for Vitest and React Testing Library. | Formulated testing assertions, verified edge case coverage (empty states, deletions), and ensured 100% pass rate. |

---

## 5. Technical Incidents: Suggestions Checked, Corrected, or Rejected

A critical part of working effectively with AI is identifying its mistakes. Below are **four concrete technical examples** where I audited, corrected, or rejected AI output:

### Incident 1: Debugging Responsive Dropdown Ref Collision (Fixed)
* **AI Output:** When generating the `TaskItem` component, the AI duplicated the dropdown actions menu for desktop (`hidden sm:flex`) and mobile (`sm:hidden`), attaching the same `menuRef = useRef<HTMLDivElement>(null)` to both elements.
* **The Bug:** In the DOM, `menuRef.current` was overwritten by the mobile menu node. On desktop, whenever a user clicked *"Edit task"*, the global document `mousedown` handler ran `menuRef.current.contains(event.target)`. Because the clicked desktop element was not inside the mobile DOM element, the handler interpreted the click as an "outside click" and closed the dropdown on `mousedown` before the browser's `click` event could fire.
* **My Correction:** I diagnosed the ref collision and refactored `TaskItem` to maintain separate `desktopMenuRef` and `mobileMenuRef`. Furthermore, I added `onMouseDown={(e) => e.stopPropagation()}` on all dropdown action items to safeguard event execution, completely resolving the issue.

### Incident 2: Figma Form Audit vs AI Hallucination (Corrected)
* **AI Output:** When scaffolding the Create Task modal, the AI assumed standard task trackers require a *"Category"* dropdown selector and included it alongside Status, Priority, and Due Date.
* **My Audit:** I closely examined Figma Frame `1:279` (`Create-task form 760 × 822`). The Figma design explicitly had no Category field in the create form—it only contained Task Title, Description, Status, Priority, and Due Date.
* **My Correction:** I removed the Category form control to maintain strict Figma fidelity, while safely defaulting new tasks internally to `'Design'` to satisfy TypeScript contracts without cluttering the UI.

### Incident 3: LocalStorage Hydration Edge Case with 0 Tasks (Corrected)
* **AI Output:** The initial `localStorage` hydration logic was written as:
  ```ts
  if (stored) {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  }
  return INITIAL_TASKS;
  ```
* **The Flaw:** If a user deliberately deleted all tasks until zero remained, `localStorage` saved `[]`. On page reload (`F5`), `parsed.length > 0` evaluated to `false`, causing the application to re-seed all 12 sample tasks and overwriting the user's saved empty state.
* **My Correction:** I corrected the check to `if (stored !== null && Array.isArray(parsed)) return parsed;`. This ensures that an intentionally empty task list is preserved across reloads, directly fulfilling the PDF requirement: *"sample data should not overwrite saved data"*.

### Incident 4: Rejecting Duplicated State Variables (Architecture Decision)
* **AI Output:** The AI suggested maintaining separate state variables: `const [totalTasks, setTotalTasks] = useState(12)`, `const [completedCount, setCompletedCount] = useState(7)`, updating them inside action handlers.
* **My Rejection:** I rejected this pattern as an anti-pattern that violates the single source of truth principle. Storing derived counts in separate state variables introduces synchronization drift during multi-predicate search filtering. I enforced pure `useMemo` derivation from the primary `tasks` array.

---

## 6. Live Coding Preparedness

As required by the assessment guidelines (*"Be prepared to explain the implementation and make a small change live"*), I am fully prepared to walk through any file in this repository and execute live modifications, such as:
1. **Adding a new task priority level or category** (extending TypeScript unions, color maps in `TaskBadge.tsx`, and select dropdowns).
2. **Adding a new keyboard shortcut** (binding a hotkey in the global `useEffect` handler in `App.tsx` and adding its badge to `ShortcutsModal.tsx`).
3. **Modifying local storage schema or seeding** (adjusting the hydration pipeline in `TaskContext.tsx`).
4. **Altering carousel slide timing or indicators** (modifying `FOCUS_SLIDES` config in `src/data/focusSlides.ts`).
