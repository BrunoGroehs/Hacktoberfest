# Glossary

This file contains the definitions and some extra information for all relevant terms mentioned in the project and in the event.

Take a look at it, and keep for future reference if you want, as this should familiarez you with several important concepts in Open Source and InnerSource.

# Terms

## Branch

A branch is an independent line of development within a Git repository. It lets you isolate work for a feature, bug fix, or experiment without affecting the default branch (often `main`).

Branches are cheap to create and switch. Changes are typically shared via a pull request to merge back into the target branch. Use clear names (e.g., `feature/login`, `fix/auth-timeout`), keep branches short‑lived, and regularly sync with the target branch to minimize merge conflicts.

There are local branches (on your machine) and remote‑tracking branches (on the server). Protect important branches with policies like required reviews and passing CI before merge.

## CONTRIBUTING.md

CONTRIBUTING.md is the common name of a markdown file describing the contribution guidelines for a project.

Having a file dedicated to the process and agreements for contributions improves transparency and optimizes the time of both contributors and maintainers.

The usual contents of this file include the description of what type of contribution the project maintainers are accepting, the expected process for contributing (with clear steps and timelines), as well as a way to contact the maintainers of the project directly.

When you want to contribute to any Open Source or InnerSource project, the first thing you should do is look for this file and read it carefully, to understand what is expected from you as a contributor.

This file does not need to be present at the root of the repository (it is also usually found under a `docs` folder), nor does it need to be called CONTRIBUTING.md. However, this is a typical convention, and following it helps any new contributor to quickly situate themselves.

## Fork

A fork is your own copy of another repository, created under your account or organization. Unlike a branch, a fork is a separate repository that allows you to freely experiment without write access to the original (“upstream”) project.

Typical flow: fork the repository, clone your fork, create a branch, make changes, push to your fork, then open a pull request back to the upstream repository. Keep your fork in sync by adding an `upstream` remote and regularly pulling changes.

Forks are common in open source and can also be used internally to stage larger changes or prototypes when you don’t want to impact the original repository directly.

## InnerSource

InnerSource is the practice of applying open source principles—transparent collaboration, open documentation, and merit‑based contribution—inside an organization’s private codebases.

Teams publish code in discoverable repos with clear contribution guidelines, issue trackers, and code reviews. Maintainers steward the project; contributors from other teams submit pull requests, which are reviewed and integrated via automated CI and agreed governance.

Benefits include faster reuse across teams, higher code quality, and reduced silos. Unlike open source, InnerSource artifacts are typically accessible only within the company, but the workflows and culture mirror the open source model.

## Open Source

Open source software is distributed under licenses that permit anyone to use, study, modify, and redistribute the code. Public repositories, open issue trackers, and community‑driven development are common.

Key elements include a compatible license (e.g., MIT, Apache‑2.0, GPL), transparent governance, contribution guidelines, and a review process via pull requests. 

Benefits include collective innovation, security through transparency, and broad adoption. Responsibilities include maintaining documentation, triaging issues, reviewing contributions, and managing releases.

## Pull Request

A pull request (PR) proposes merging changes from a branch or fork into a target branch. It provides a structured review space with a description, commit history, code diffs, comments, approvals, and automated checks (CI).

Good PRs are focused, well‑described, and linked to relevant issues. They should pass tests and follow project conventions. Common merge strategies include merge commit, squash merge (condense to one commit), and rebase merge (linear history).

