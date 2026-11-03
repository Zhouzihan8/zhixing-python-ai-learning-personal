# Personal GitHub Pages publication plan

> Execution method: inline, as already requested. Keep all work in this new repository.

**Goal:** Publish a separate public GitHub Pages copy of the personal Python and AI learning site.

**Architecture:** Copy the personal static build into `site/`; publish it with a GitHub Actions Pages artifact workflow. Leave the local site and existing public repository unchanged.

**Tech Stack:** Static HTML/CSS/JavaScript, JSON course content, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-11-03-personal-pages-design.md`

## Global constraints

- Repository: `Zhouzihan8/zhixing-python-ai-learning-personal`, public.
- Published path: `site/`; expected URL: `https://zhouzihan8.github.io/zhixing-python-ai-learning-personal/`.
- Do not copy `dist/downloads/`.
- Preserve author-local VS Code and local-server entry points as local-only conveniences.
- Do not modify either existing website/repository.

## Review focus

- Project Pages base path: all app assets and course JSON must load from the repository subpath.
- First publication: Pages must use GitHub Actions as its source.
- Browser code runner: Pyodide remains an external CDN dependency.
- Personal file links: only resolve on the author's own computer.

## Tasks

### Task 1: Prepare the publication copy

- Copy the six static app files and `content/course.json` from the personal Site build into `site/`.
- Add README, MIT license, workflow, design notes, and this plan.
- Verify JavaScript syntax, JSON parsing, expected lesson count, and that downloads are absent.

### Task 2: Publish and verify

- Create the new public repository and push this clean `main` branch.
- Set GitHub Pages publishing source to GitHub Actions if required.
- Verify the workflow succeeds and the published homepage, course JSON, and course assets return successfully.
