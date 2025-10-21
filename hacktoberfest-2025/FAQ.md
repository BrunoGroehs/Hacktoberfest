# FAQ

Here you can find some questions and explanations about the project and Open Source / InnerSource in general.

## Why are we using forks?

In order for people to add commits to a repository, they need to be given Write permission.

In large scale, this becomes prohibitive. Not only it gives a larger burden to the maintainers, it can also lead to governance issues, as well as very widespread conflicts (duplicate branch names, etc.).

Because of that, using forks is generally recommended for collaborative projects (either Open Source or InnerSource), as they allow outside contributors to modify the project in their own space, unrestricted. Forks also allow for easily contributing back any changes made on them to the original repository.

We are using forks here to mirror what is considered a best practice, and to familiarize all participants with this important concept.

## Why are we using our iNumbers in branch names?

As we have a very large amount of participants for this event, adding your iNumber as a prefix to your branch helps in organizing and easily finding the relevant ones, if necessary.

This would have been a much larger issue if we did not use forks, and instead used branches directly. Regardless, it is still a useful way to keep things more organized.

## Why use Pull Requests?

Pull Requests (PRs) are the standard way to propose changes from a branch or fork into the main codebase. They provide a controlled, reviewable path for collaboration where peers can catch defects, improve design, and share knowledge. PRs also help enforce governance through branch protection rules and required reviews, keeping standards consistent across the project.

Beyond human review, PRs integrate automated checks: continuous integration runs tests, linters, and security scans before merging. This builds traceability through commits, discussions, and approvals, while keeping work isolated in branches so integration is safer and conflicts surface early.

## How can I know if an Open Source library can be used in my project?

Up to the end of 2025, you can use the Open Source Tool: https://open-source.tools.sap.corp/ . Look for versions of the library that have a "Low risk" rating.

The full documentation for knowing how to consume Open Source (both libraries and tools) within SAP can be found here: https://wiki.one.int.sap/wiki/pages/viewpage.action?spaceKey=ospodocs&title=Consuming 

From 2026 onwards, refer to what is described in the link above as the official process to evaluate the use of any Open Source project.
