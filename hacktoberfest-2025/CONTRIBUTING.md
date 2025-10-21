# Contributing Guidelines

# Type of contributions

For this project, we are accepting code contributions that add new pages with short, inspiring and insightful description of LoBs, projects and initiatives that you are part of within the Labs!

We also accept Pull Request reviews from all contributors, as the main purpose of this project is to give people experience with applying best practices within Open Source and Inner Source.

If you have any feedback or suggestion of how to improve the project, we are also happy to receive those as Github Issues.

# Contribution format

This project uses forks as the vehicle for collaboration.

If you want to contribute: create a fork to develop your contribution, and then open a Pull Request to this main repository.

# Timelines

## Pull Request review

Once you open a Pull Request, it will be reviewed by fellow participants of the event.

Therefore, it is not possible to guarantee a maximum time for reviewing, as it will depend on how many people are reviewing at any time and the amount of open Pull Requests.

If you have friends participating, you can ask them directly to review your contribution as a way to speed the process.

## Pull Request merge

After your Pull Request has been approved, if it does not contain any errors or conflicts, a maintainer will merge it.

This should take no more than 10-15 minutes, after the approval.

# Maintainers

These are the main maintainers of this project. If you need help or have any question about it, reach out to them and they will get back to you as soon as possible (please keep in mind that during the Hacktoberfest event it might not be possible to answer everyone, giving the large number of participants):

- Carlos Wendling, i764251, carlos.wendling@sap.com
- Tiago Ceccon, i867399, tiago.ceccon@sap.com

# Full guidelines

Here you will find the full guidelines for contribution.

Please keep these guidelines in mind while you are developing (hint: ask your AI partner to review if your code is following them, either continuously or at least right before pushing your changes).

Keep them even more in mind while you are reviewing other people's contributions.

Quick checklist of the guidelines described below:

- Single, focused change: add your area page, its route, and a link on the home page.
- Scope containment: change only your new folder plus the minimal routing/link additions.
- Test clean: `npm run test` passes.
- No secrets (passwords, personal tokens, etc.) or private personal data included in the code.
- PR quality: clear title/description, small diff, passes build/lint, addresses review feedback.

## 1) Principles and conduct

- Be respectful and collaborative. Assume positive intent.
- No offensive content; no confidential or personal data (PII); no secrets in code.

## 2) What makes a “good contribution” here

Focus and scope

- Deliver one cohesive improvement per PR:
  - A new area page (your team’s space), plus
  - A unique route to reach it, plus
  - A link from the home page so it is discoverable.
- Avoid editing other teams’ folders. If a shared file change is absolutely needed, keep it minimal and clearly justified in the PR.

Quality and consistency

- Run locally and sanity‑check navigation to your page and back to home.
- Tests must pass: `npm run test`. Fix all issues and warnings.

Content and assets

- Store all assets for your page under your page’s folder. Do not place large files in the repo root.
- Prefer optimized images (≤ 1 MB each; compress/resize; prefer .webp/.jpeg) if possible.
- Only include assets you have rights to use. Attribute when required.

Routing and discoverability

- Route path must be unique and human‑readable (e.g., `/my-area`).
- The home page must include a link entry pointing to your route with a clear title.
- Verify there are no route or link collisions before opening a PR.

Performance, security, dependencies

- If you need to introduce a new dependency, check if there is a version of it under https://open-source.tools.sap.corp/ that has "Low Risk" assessment.
- No secrets/keys, or private personal data. Avoid external network calls by default.

## 3) Using AI coding agents responsibly

- You are encouraged to use AI to assist, but you own the result. Review everything before committing.
- Validate outputs for correctness and licensing.

## 4) Branches, commits, and PRs

Branches

- Use the convention: `<your_inumber>/<short-topic>`, e.g., `i123456/add-innovation-page`.

Commits

- Write clear, concise messages describing what and why (not just how).
- Conventional style encouraged:
  - `feat(area): add page, route and home link`
  - `fix(area): resolve image alt text and lint errors`
  - `chore(area): optimize images and remove dead code`

Pull Requests

- Title: clear and scoped (e.g., `feat: add Innovation page`).
- Description should include:
  - Short (one or two sentences) description of the area included
  - What files changed
  - Explanation for any changes to shared files beyond the expected ones (route and link on home page)
  - Justification for any new library that is included
- PR checklist before submitting:
  - [ ] Navigates to the new route and back to home without errors
  - [ ] `npm run test` passes
  - [ ] No unused files/vars/console.logs
  - [ ] Assets (images, etc.) placed under your page folder (if any was added)
  - [ ] No new dependencies/secrets/private data
  - [ ] Route and link names are unique and concise

## 5) Code review guidelines (for everyone)

Reviewers look for:

- Correctness: page renders, route works, link appears, no collisions or regressions.
- Scope/size: focused diff; no unnecessary changes; no new deps.
- Assets: in the right location, with proper rights/attribution.

How to give feedback:

- Be specific and kind. Quote lines or point to exact code/sections.
- Prefer suggestions with examples. Explain the “why,” not just the “what.”
- Approve when the PR meets the criteria; request changes when it does not.

## 6) Merging and conflict resolution

- Resolve all merge conflicts before approval.
- PRs should have a clean lint result and at least one approval.
- Maintainers may ask for changes to protect shared files, performance, or accessibility.
- If overlapping changes are discovered, coordinate with the other contributors to rebase and avoid conflicts.
