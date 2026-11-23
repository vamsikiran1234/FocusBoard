# AI Usage

I used an AI coding assistant during this project to speed up initial setup, generate SVG icon coordinates, draft test cases, and help debug layout and event issues. All business logic, Figma alignment, and architectural decisions were reviewed, verified, and adjusted by me.

---

## Tool Used

- **Tool:** AI Coding Assistant (Antigravity / Gemini)
- **Role:** Boilerplate generation, SVG drafting, test structure, and debugging help.

---

## Prompts Used During Development

Here is how I interacted with the assistant across different stages of the project:

### 1. Project Setup & Architecture
> *"I'm building a task dashboard called FocusBoard using React, TypeScript, and Tailwind CSS. Help me set up the initial folder structure, Context API state management, and basic layout components based on desktop, tablet, and mobile Figma designs."*

### 2. Custom Icons & Logo
> *"Can you write clean React SVG components for the FocusBoard logo (purple squircle with 4 dots) and the sidebar navigation icons (Overview, Tasks, Calendar, Settings) so they match the Figma reference?"*

### 3. Carousel Component
> *"I need to build the Focus Notes carousel. It should display 3 slides with next/prev buttons, show subtle tilted peek cards on desktop (+2.5° and -2.5°), and switch to a compact progress bar card on mobile screens."*

### 4. Dropdown Click Debugging
> *"When I click 'Edit task' in the task row menu on desktop, the modal does not open and the menu simply disappears. Can you help me trace why the click event is not firing?"*

### 5. LocalStorage Edge Cases
> *"How should I structure the localStorage loading logic so that default sample tasks load on the first visit, but if a user deletes all tasks and refreshes, it doesn't reset back to the default tasks?"*

### 6. Unit & Component Tests
> *"Can you write Vitest test files to cover task filtering (by search keyword, status tab, and priority), derived task statistics, and localStorage persistence?"*

---

## What I Reviewed and Fixed

While the assistant helped accelerate development, I reviewed and tested every generated snippet against the Figma design and assignment criteria, making key corrections:

- **Fixed Dropdown Ref Sharing Bug:**
  The assistant generated a single `ref` shared across both desktop and mobile dropdown containers in `TaskItem.tsx`. In desktop view, clicking "Edit task" triggered the outside-click listener on `mousedown` before the `click` event could fire. I separated them into `desktopMenuRef` and `mobileMenuRef` and added `onMouseDown={(e) => e.stopPropagation()}` so the modal opens reliably.

- **Removed Unnecessary Category Field in Modal:**
  The assistant initially included a category selector dropdown in the task creation modal. After cross-checking Figma Frame `1:279`, I confirmed that the design does not have a category field. I removed the dropdown to keep the modal 100% true to Figma, setting a sensible default in state to satisfy TypeScript.

- **Preserved Empty Task Lists in LocalStorage:**
  The assistant wrote a check `if (parsed.length > 0)` when reading stored tasks. If a user deleted all tasks, reloading the page saw 0 items and re-seeded the default 12 tasks. I changed the condition to `if (stored !== null && Array.isArray(parsed))` so empty state is respected across page reloads.

- **Derived Stats Instead of Redundant State:**
  The assistant initially proposed keeping separate `useState` variables for task counts (`totalTasks`, `inProgressTasks`, `completedTasks`) and updating them inside add/delete handlers. I refactored this to use `useMemo` directly on the task array, keeping counts derived and eliminating state synchronization bugs.

- **Mobile Overview Layout Alignment:**
  The initial layout included all three stat cards on mobile. Cross-checking Frame `1:167` showed that mobile only displays two cards: "Total tasks" and "Completed". I updated the responsive styling to hide the "In progress" card on small screens to match Figma exactly.
