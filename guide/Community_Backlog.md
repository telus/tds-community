## Community Backlog process

The [Community Backlog](https://github.com/telus/tds-community/projects/1) is a GitHub project board used by TELUS Design System (TDS) Community contributors and Digital Platform Ambassadors (DPA) to track and manage [tickets](https://github.com/telus/tds-community/issues). This document provides a detailed guide what work needs to be done during each phase in the project board.

### General guideline

- Only put GitHub issues in the project board, **do not add pull requests as they may cause duplication of context**
- Make sure an issue passes through every column as they progress through each phase, that way the timing and context is documented, and no steps are missed

### Board phases

Board phases are represented by columns on GitHub. The following sections describe what process and what output occurs during their respective phases.

1. [To do](#1-to-do)
2. [Design queue](#2-design-queue)
3. [Design intent](#3-design-intent)
4. [Design review](#4-design-review)
5. [Story writing](#5-story-writing)
6. [Dev queue](#6-dev-queue)
7. [In development](#7-in-development)
8. [Ready for QA](#8-ready-for-qa)
9. [In QA](#9-in-qa)
10. [Ready for release](#10-ready-for-release)
11. [Released](#11-released)

#### 1. To do

No work begins at this phase.

Our reviewed backlog. Items are moved into this column when they are ready to be tracked.

#### 2. Design queue

No work is done at this phase.

Items are moved from _To do_ to this column when they are ready to be picked up by a designer.

#### 3. Design intent

A designer pulls in a ticket from the top of the _Design queue_ and deliberates on best practices, branding, accessibility, and consistency for the ticket. Developers may stand by for consultation.

Output:

- During this phase, designers research the functionality, appearance, and intent for the ticket. They also establish preliminary designs.
- Research material and any preliminary designs should be linked/attached to the ticket.

#### 4. Design review

Design leads and DPA Designers review final design. During a review, we determine:

- Whether it is a pattern we want to encourage
- Whether it is a core or community component
- How it can scale between teams/tribe (i.e. reusability)

If approved, they can go into _Story writing_ to be further refined.

Once the design leads review the intent, DPA Designers and DPA Developers must sign off on the component’s viability based on the component criteria as outlined in our [contributing guide](../.github/CONTRIBUTING.md#designer-guide).

Status of the review should be documented in the ticket.

Output:

- **DPA Design Approved** label is applied to ticket

#### 5. Story writing

A DPA member or assignee defines the acceptance criteria for the ticket.

- Working with the designer/developer, the ticket is in the process of being defined
- The person writing user stories for the ticket must fill out the required sections in the ticket template
- Defining the acceptance criteria, functionality, design, and code notes and details

Output:

- The ticket has a written story
- **DPA Developer Approved** label is applied
- Ticket is moved to _Dev Queue_

#### 6. Dev queue

No work is done at this phase.

Items are moved from Story Writing to this column when they are ready to be picked up by a developer or designer.

#### 7. In development

During this phase, a designer or developer may pull the ticket from the Dev Queue and start working on it.

**Step 1 of 2: Development**

**Developers** producing code must follow our [developer guide](../.github/CONTRIBUTING.md#developer-guide).

**Designers** producing or enhancing components for Sketch must follow our [designer guide](../.github/CONTRIBUTING.md#designer-guide).

Potential output from this step, if applicable, may include:

- (Code) A pull request featuring new enhancements to components, fixes to components, net-new components, or documentation
  - Code-related work should follow the acceptance criteria outlined in the user story
- (Design) A component for Sketch

**Step 2 of 2: Review (for pull requests)**

For pull requests, a DPA developer assigns themselves or a delegate to the GitHub pull request and issue tickets.

After review, and all relevant output is complete (can be a combination of code, documentation, or designs), and any related pull requests are approved, the ticket can move to Ready for QA.

Before moving to Ready for QA, the following items should be complete where applicable:

- An approved pull request for documentation or code
- Designs for Sketch and DSM

#### 8. Ready for QA

No work is done at this phase.

- Tickets in here are ready to be tested for quality assurance
- Tickets are sorted by priority
- Team members should take on the first item on the list that they DID NOT develop

#### 9. In QA

It is the DPAs' responsibility to make sure both the DSM and Coded components are Ready for Release before moving the story out of this column.

For coded components or documentation:

1. Once a pull request is made, it is assigned to a developer (DPA helps find reviewers, or performs reviews themselves) who did not make commits to the PR
2. The PR is merged to master and deployed to our staging server
3. Visual QA (code)
   - Coded component is tested on the staging site
   - Coded component is tested on the isomorphic starter kit
4. Visual QA (design)
   - DSM design library component is observed within the shared draft
   - Make sure it’s responsive
   - Variations can be changed with overrides in Sketch or props in code
5. Review the documentation in DSM and on staging
6. Merge code to master, and delete branch
7. Verify the completion of ACs and overall functionality for the pulled in ticket.
8. All items should be tested both in the TDS Community docs and Isomorphic Starter Kit on all supported browsers.
9. If problems are found, notify the ticket’s developer or designer and move back to In Dev for correction
10. Follow up with another PR

#### 10. Ready for release

A DPA member must perform releases for code and DSM respectively by following these steps:

1. Documentation and coded components are deployed to npm and the (published catalogue)[https://tds.telus.com/community/index.html]. It is necessary to perform this step before deploying to DSM in order to gather appropriate URLs for documentation
2. After deploying documentation, link to them from the respective DSM components and then release a new DSM version
3. Copy changelogs for affected components into release notes for their git tags
4. If a feature release or major bug fix, communicate the changes on Slack in #tds-guild and in the release/history notes in the versions

Output:

- The community catalogue website is up-to-date
- New component versions are deployed to npm
- Release notes for affected components are published
- New changes made to DSM are published

#### 11. Released

All development tasks are complete. During this phase, a DPA member cleans up related issues.

Output:

- Leave comment on respective GitHub issue, linking to release notes.
- Close issue, apply appropriate labels.
