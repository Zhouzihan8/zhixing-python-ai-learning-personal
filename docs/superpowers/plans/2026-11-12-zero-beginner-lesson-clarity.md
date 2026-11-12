# Zero-Beginner Lesson Clarity Implementation Plan

**Goal:** Make every lesson easier to follow from a zero-Python baseline without hiding core explanations or bloating the course.

**Architecture:** Show each lesson's key vocabulary before its main text; keep the full lecture visible. Add purpose labels and an optional, concise code walkthrough that explains syntax and unfamiliar common APIs without changing runnable examples. Use clear heading levels for main topics versus examples and transitions.

**Tech Stack:** Existing static HTML, CSS, vanilla JavaScript, and `course.json`.

**Global Constraints:** Modify only the personal-site worktree; preserve the D-drive local learning site and public edition; keep practice code executable and optional explanations collapsible.

**Review Focus:** missing glossary data; long code blocks; APIs outside the note dictionary; headings without enough hierarchy; mobile overflow.

---

1. Add a visible key-concept introduction using the existing per-lesson definitions; verify all 54 lesson IDs render at least one concept.
2. Add code-purpose labels and collapsible line-by-line notes; verify syntax coverage and common standard-library / NumPy / pandas / scikit-learn / PyTorch / model API explanations.
3. Distinguish core topic headings from subtopic examples and transitions; verify reading order and anchor navigation.
4. Run syntax, content coverage, and diff checks; publish only to the already-authorized personal Pages repository and confirm deployed assets.
