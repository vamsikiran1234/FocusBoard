# AI Usage Disclosure (AI_USAGE.md)

This document provides a clear and honest overview of AI tool usage during the development of FocusBoard, in accordance with the assessment requirements.

---

## 1. Tool Used
* **Tool:** AI Coding Assistant (Antigravity)
* **Purpose:** Code acceleration, initial boilerplate generation, and debugging assistance.

---

## 2. Prompts Used
The prompts below reflect how the assistant was used throughout the project:

### Prompt 1: Initial Setup
> *"Help me set up the initial FocusBoard project structure using React, Vite, TypeScript, and Tailwind CSS matching the Figma dashboard layout."*

### Prompt 2: Design Fidelity & Custom Icons
> *"Can you help create the custom SVG icons for the FocusBoard logo and sidebar navigation so they match the shapes and colors in the Figma reference?"*

### Prompt 3: Form Validation & Field Checking
> *"In the Create Task modal, validate that the task title is required, and double-check if the category dropdown is actually present in the Figma modal design."*

### Prompt 4: Debugging Dropdown Interactions
> *"In desktop view, the Edit task option in the task row menu is not opening the modal when clicked. Can you help me find why the click event is not firing?"*

---

## 3. Areas of AI Assistance
* **Project Scaffolding:** Creating the initial React + TypeScript + Vite project configuration and folder structure.
* **Icon Geometry:** Helping generate clean SVG coordinates for the custom FocusBoard squircle logo and navigation icons.
* **Test Case Boilerplate:** Drafting unit test files in Vitest for the task filtering, statistics, and storage persistence.
* **Code Review & Debugging:** Identifying race conditions in DOM event listeners across responsive layouts.

---

## 4. Suggestions Checked, Corrected, or Rejected
Working with AI requires careful review to ensure accuracy. Below are specific instances where AI suggestions were corrected or adjusted:

1. **Fixing the Dropdown Menu Click Bug**:
   * *Issue:* The initial code used a single `useRef` for both the desktop and mobile dropdown containers. On desktop, clicking "Edit task" caused the document's outside-click listener to mistakenly close the menu before the click event could execute.
   * *Correction:* Separated the refs into `desktopMenuRef` and `mobileMenuRef`, and added `stopPropagation` on `mousedown` for menu buttons to ensure smooth interaction.

2. **Removing Unnecessary Category Field in Create Modal**:
   * *Issue:* The assistant initially generated a "Category" dropdown selector in the task creation form.
   * *Correction:* Audited the Figma reference (Frame `1:279`) and found that the category field does not exist in the design. Removed the field from the form to keep the modal faithful to Figma, while providing a safe default in state.

3. **Preserving Empty Task Lists in LocalStorage**:
   * *Issue:* The storage logic initially checked `if (parsed.length > 0)`, which caused the application to re-load default sample tasks on refresh if a user deliberately deleted all tasks.
   * *Correction:* Changed the condition to check if the storage key exists (`stored !== null`), ensuring an empty list remains empty on refresh as required by the assignment guidelines.

4. **Avoiding Redundant State Variables**:
   * *Issue:* The assistant suggested storing task statistics (total, completed, in-progress) as separate state variables updated by counter functions.
   * *Correction:* Kept the task array as the single source of truth and derived all counts using `useMemo`, preventing counts from becoming out of sync when filtering or searching.
