# Contributing to TDS Community

**Before contributing to TDS Community, _please_ read the sections of this guide pertaining to your type of contribution in full. Discussions within TDS Community will assume that this guide has been read and understood.**

Thank you for your interest in contributing! There are a few ways you can help:

- Comment on [existing issues][tds-community-issues] or [open a new one][tds-community-new-issue]
- Propose changes to documentation. (Did you know, you can propose changes [without leaving GitHub](https://help.github.com/articles/editing-files-in-your-repository/)?)
- Add features or patches to [existing components](https://github.com/telus/tds-community/tree/master/packages)
- Add new components! _Read on!_

## Contents

- [TDS contributing standards](#tds-contributing-standards)
- [Process](#process)
- [Designer guide](#designer-guide)
- [Developer guide](#developer-guide)
  - [Codebase overview](#codebase-overview)
- [Making pull requests](#making-pull-requests)

## TDS contributing standards

Writing components for a widely used design system has more considerations than writing components for an application.
Extra care is necessary to ensure quality, reusability, and maintainability. Please refer to
[TDS contributing standards][tds-contributing-standards] for full details.

## Process

When developing or maintaining community components, they typically undergo a set of phases as represented by the [Community Backlog](https://github.com/telus/tds-community/projects/1) project board. When viewing or managing the project board, please follow the [Community Backlog project board guide](../guide/CommunityBacklog.md).

## Designer guide

Before transforming designs into code, they must be audited. Please speak to your team's design lead for more information.

When creating components for Sketch and InVision DSM, the following criteria must be met:

- Components need to be responsive and able to resize where possible
- Components need to be smart so all variants can change with overrides (where possible)
- Put the Sketch component in the TDS-community DSM library under the correct folder/category
- Add documentation in the description of the component in DSM as well as the name of the designer who designed the component
- Add references to published documentation rather than duplicate content (eg. link to the tds.telus.com). This can only be done after coded component documentation has been released.

## Developer guide

Before writing any code or submitting a pull request, please assure the [contribution process](#process) is being followed.

A [comprehensive contribution guide for developers][tds-developer-contribution-guide] is available on the TDS website.

### Codebase overview

For information on file structure, technologies used, and writing tests, see our [codebase overview](https://tds.telus.com/contributing/codebase-overview.html).

## Making pull requests

When changes to the codebase are ready for review by a member of the DPA, you may submit a pull request.
Keep an eye on the pull request in case changes are requested. Once a pull request is approved, a DPA member may
merge your branch to `master` and changes can be deployed.

[tds-community-issues]: https://github.com/telus/tds-community/issues
[tds-community-new-issue]: https://github.com/telus/tds-community/issues/new
[tds-contributing-standards]: https://tds.telus.com/contributing/contributing-standards.html
[tds-developer-contribution-guide]: https://tds.telus.com/contributing/developer-guide.html
[tds-util-example]: https://github.com/telus/tds-core/tree/3e7da5d798295f0fc85bef204299057a3c9ed63d/shared/utils/generateId
