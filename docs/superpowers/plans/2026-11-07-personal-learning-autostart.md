# Personal Learning Auto-start and Guidance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Start the local progress helper at Windows login, automatically load progress when the learner opens the bookmarked personal site, and make the next-step guidance respond to hint use and repeated practice.

**Architecture:** A shortcut in the current user's Startup folder launches the existing Python helper in a minimized console. After course data loads, the personal site makes one local read attempt and keeps its manual reconnect control. The site and local Markdown summary use the same evidence-based recommendation rules.

**Tech Stack:** Static JavaScript site, existing Python standard-library HTTP helper, Windows Startup folder shortcut.

**Spec:** [2026-11-07-personal-learning-autostart-design.md](../specs/2026-11-07-personal-learning-autostart-design.md)

## Global Constraints

- Use only the current Windows user Startup folder; do not create an administrator task or Windows service.
- The helper continues binding only to `127.0.0.1:19868` and accepts only the personal Pages origin.
- Course reading and exercises remain available when the helper or local-network permission is unavailable.
- Learning progress remains under `D:\学习\个人学习\00_学习管理`; never add it to the repository.
- Do not modify `D:\学习\学习网站` or `D:\学习\公开发布\zhixing-python-ai-learning`.
- Do not add a date-based study or review schedule.

## Review Focus

- Existing Startup entries must remain untouched; verify the new shortcut points only to the progress helper.
- Opening the site while the helper is down must not block the course; retain and verify manual reconnect feedback.
- First-load synchronization must happen after course data is ready and must not loop or prompt repeatedly.
- Hint-informed guidance must not label hinted work as independent mastery; verify partial/full hints lead to a no-hint retry suggestion.
- Repeated practice guidance must keep reducing the task to prediction, execution, and explanation; verify with two practice events.

---

### Task 1: Start the local helper at Windows login

**Files:**
- Create Windows shortcut: `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\知行学习进度助手.lnk`
- Read only: `D:\学习\个人学习\00_学习管理\进度同步助手\启动学习进度助手.bat`
- Modify: `D:\学习\个人学习\00_学习管理\进度同步助手\README.md`

**Interfaces:**
- Shortcut target: the existing `py.exe` launcher when available, otherwise the existing `python.exe` command.
- Arguments: `-3 "D:\学习\个人学习\00_学习管理\进度同步助手\学习进度助手.py"` when using `py.exe`.
- Working directory: `D:\学习\个人学习\00_学习管理\进度同步助手`.

- [ ] Confirm the Startup path and preserve every existing entry.
- [ ] Create the current-user shortcut with a minimized window and no admin privileges.
- [ ] Verify shortcut target, arguments, and working directory; start it once and confirm the helper responds on loopback.
- [ ] Update README with automatic login start, normal bookmarked-site use, local-network permission, and manual stop/recovery instructions.

> Execution note: The automatic security review rejected creating a Windows Startup shortcut. No Startup entry was changed. The existing batch file remains the way to start the helper after login, so Task 1's automatic-start steps remain incomplete.

### Task 2: Auto-load progress and tailor the next practice

**Files:**
- Modify: `site/app.js`
- Modify: `site/knowledge-map.js`
- Modify: `D:\学习\个人学习\00_学习管理\进度同步助手\学习进度助手.py`
- Modify: `D:\学习\个人学习\00_学习管理\进度同步助手\README.md`

**Interfaces:**
- `connectProgress()` remains the single GET-and-render path; invoke it once after `course=data.lessons` and the initial `show(...)` call.
- `LearningMap.recommendation(course, progress)` continues returning `target`, `reason`, `nextStep`, and the existing counters.
- `next_suggestion(progress)` mirrors the site rule for the Markdown summary.

- [x] Define behavior checks for: fresh learner → `S1-U01`; partial/full hint → close the example and retry without hints; two or more practice events → smallest-task steps; independent evidence → continue the main line.
- [x] Run those checks against current behavior and confirm the hint case fails for the expected reason.
- [x] Add the one-time page-load sync after course data is ready; retain the manual sync button and graceful disconnected state.
- [x] Add hint-aware recommendations in the site and local helper without changing the status rules.
- [x] Run the behavior checks again, check JavaScript syntax, and inspect that a fresh learner remains unrecorded.

### Task 3: Publish and verify the personal site

**Files:**
- Modify only the personal GitHub Pages repository and the local helper README/Startup shortcut.

- [ ] Inspect the final diff and ensure no local progress JSON/Markdown data is staged.
- [ ] Publish to `Zhouzihan8/zhixing-python-ai-learning-personal` only.
- [ ] Confirm the GitHub Pages workflow succeeds and the stable personal URL remains unchanged.
- [ ] Confirm the local worktree is synchronized and clean.
