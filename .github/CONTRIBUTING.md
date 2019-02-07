# Contributing to TDS Community

**Before contributing to TDS Community, _please_ read the sections of this guide pertaining to your type of contribution in full. Discussions within TDS Community will assume that this guide has been read and understood.**

Thank you for your interest in contributing! There are a few ways you can help:

- Comment on [existing issues](https://github.com/telus/tds-community/issues) or [open a new one](https://github.com/telus/tds-community/issues/new)
- Propose changes to documentation. (Did you know, you can propose changes [without leaving GitHub](https://help.github.com/articles/editing-files-in-your-repository/)?)
- Add features or patches to [existing components](https://github.com/telus/tds-community/tree/master/packages)
- Add new components! _Read on!_

## Table of contents

- [Community component criteria](#community-component-criteria)
- [What makes a good community component?](#what-makes-a-good-community-component)
- [Process](#process)
- [Designer guide](#designer-guide)
- [Developer guide](#developer-guide)
  - [Before your begin](#before-you-begin)
  - [Codebase overview](#codebase-overview)
  - [Environment setup](#environment-setup)
  - [Making commits and versioning packages](#making-commits-and-versioning-packages)
  - [Code style and conventions](#code-style-and-conventions)
  - [Documenting components](#documenting-components)
  - [Samples](#samples)
- [Making pull requests](#making-pull-requests)

## Community component criteria

Before designing or contributing new components, confirm the following criteria in order to qualify
a viable community component.

A community component:

1.  **Must** have an identified use case in at least 2 unique applications
    - Community components have the most impact when shared across multiple situations in many applications.
2.  **Must** be brand aligned and assessed by Design Direction (if applicable)
    - New user experience patterns must involve Design Direction to preserve a high-quality and consistent end customer experience.
3.  **Must** not include business logic or proprietary information
    - The presence of these things limits the breadth of reuse for a component.
    - Design system components are focused on reusable user experience patterns. Keep business logic, API calls, content, or other application-specific behaviour in the application.
4.  **Must** be sufficiently different than other available shared components
    - Community components reduce duplication by promoting flexibility and reuse of existing code.
    - Before creating a new component, consider whether an existing pattern and component is sufficient. If not, consider extending or adding features to an existing component before creating a new one.
5.  **Should** be sufficiently granular to promote reuse
    - Design system components should encapsulate a single pattern or user experience “element.” Seek to find the most granular, standalone, reusable pattern.

Note, this criteria should be interpreted as described in [RFC2119](https://tools.ietf.org/html/rfc2119).

## What makes a good community component?

Writing components for a widely used design system has more considerations than writing components for an application.
Extra care is necessary to ensure quality, reusability, and maintainability.

### Principles

All TELUS Design System components follow these core principles.

1.  Composable
    - Components are most effective when they can be combined to form more complex patterns.
2.  Accessible
    - WCAG AA. Semantic markup. Screen reader friendly.
3.  Responsive
    - Mobile-first. Works on any viewport size.
4.  Quality
    - Thorough testing is a first class concern.
5.  Cross-browser
    - See [supported browsers](../browserslist)

We have incorporated tooling to bake-in and automate as many of these principles as possible.

## Process

When developing or maintaining community components, they typically undergo a set of phases as represented by the [Community Backlog](https://github.com/telus/tds-community/projects/1) project board. When viewing or managing the project board, please follow the [Community Backlog project board guide](../guide/CommunityBacklog.md).

## Designer guide

Before transforming designs into code, they must be audited. Please speak to your team's design lead for more information.

When creating components for Sketch and Invision DSM, the following criteria must be met:

- Components need to be responsive and able to resize where possible
- Components need to be smart so all variants can change with overrides (where possible)
- Put the Sketch component in the TDS-community DSM library under the correct folder/category
- Add documentation in the description of the component in DSM as well as the name of the designer who designed the component
- Add references to published documentation rather than duplicate content (eg. link to the tds.telus.com). This can only be done after coded component documentation has been released.

## Developer guide

### Before you begin

Before writing any code or submitting a pull request, please assure the [contribution process](#process) is being followed.

### Codebase overview

Components are implemented in ECMAScript 6+ and React using JSX syntax, mostly following the comprehensive AirBnb style
guides for [JavaScript](https://github.com/airbnb/javascript) and [React](https://github.com/airbnb/javascript/tree/master/react).
Styles are written in [Sass](https://sass-lang.com/), using the [CSS Modules](https://github.com/css-modules/css-modules) specification. All of this is
grounded in the practices and standards set forth in the TELUS digital [reference architecture](https://github.com/telus/reference-architecture).

For information on file structure, technologies used, and writing tests, see our [codebase overview](https://tds.telus.com/contributing/codebase-overview.html).

### Environment setup

Setting up TDS Community on your development environment is identical to TDS Core. Learn more on our [developer guide](https://tds.telus.com/contributing/developer-guide.html).

### Making commits and versioning packages

If you have organization access to this repository, please create a branch. Otherwise, you may create a fork.

This repository uses lerna with [conventional commits](https://conventionalcommits.org/) to automate package versioning.
TDS Components must follow [semantic versioning](https://semver.org/) in order for consumers of these components to predictably determine breaking changes as they upgrade over time. When making commits, use `npm run cz` to run commitizen.

Due to the subjectivity of versioning front-end components, keep these suggestions in mind when making conventional commits:

- **Breaking changes** are removals of features such as props, changes that affect the [box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model), or dramatic changes in branding or appearance
- **Minor changes** are new features, animations, props, or visual options
- **Patches** are defect fixes that do not remove features, alter pixel dimensions related to the box model, nor add new features. If an intended feature was not working in a previous release, changing that feature to match the original design counts as a patch even if it affects the box model

Commits should always be in the following format:

```
type(scope): commit message here
```

This format always includes:

- Commit type
- Commit scope in parentheses, followed by a colon
- A message describing what the commit is, preferably written in present simple tense with no capital letters

#### Commit types

| Type     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| feat     | Indicates a **minor, public-facing change**. A change is considered minor if it adds new functionality in a backwards-compatible manner. It must also be perceivable by consumers of TDS Community, and not just a change that only impacts developers of TDS Community. Additionally, it may be used if functionality is being **deprecated**. If a commit of this type contains a public-facing **breaking change**, add the text `BREAKING CHANGE:` to your commit’s body, followed by a description of what the breaking change is. |
| fix      | Indicates a patch level, **public-facing** change. Generally, this is used for backwards-compatible bug fixes. There should be no consumer-facing API changes at all in patches. It must also be perceivable by consumers of TDS, and not just a change that only impacts developers of TDS Community.                                                                                                                                                                                                                                  |
| test     | Used for commits that only modify/add **unit tests** or anything test related, such as **snapshots**, **screenshots**, or **test scripts**.                                                                                                                                                                                                                                                                                                                                                                                             |
| refactor | Used if code has been refactored **without any modifications to functionality or behaviour**. If your refactor also fixes a bug, please use the `fix` type. A common scenario for using this type would be “preventative maintenance” to code. This is also useful when iterating on changes due to PR reviews or other factors. Only one commit may be labeled as a `fix` or `feat` for any one change, so commits following that to iterate on the same feature will either be a `chore` or `refactor`.                               |
| docs     | Indicates a modification to **documentation**. Changes to the .md files of components, or changes to the documentation site use this type.                                                                                                                                                                                                                                                                                                                                                                                              |
| chore    | A type for **miscellaneous** changes. Anything not covered here is considered a chore. Additionally, this is useful when iterating on changes due to PR reviews or other factors. Only one commit may be labeled as a `fix` or `feat` for any one change, so commits following that to iterate on the same feature will either be a `chore` or `refactor`.                                                                                                                                                                              |

#### Commit scopes

The following could be used as a commit scope:

- If modifying a component, use the full package name of said component. Example: `(community-sample-pilter)`.
- If modifying TDS Community tooling or docs unrelated to one component, use the name of the root folder being edited. For example, a commit that edits a file in `/scripts/utils` will use the scope `(scripts)`.

### Code style and conventions

Here are some dos and don'ts to consider when writing code.

#### React

- **DO** make components self-contained. A component should not know anything about other components, except for its direct children
- **DO** provide a clear, prop-based API to the component. Avoid allowing consumers to customize styles by passing in `className` or `style` as this is not a clear API. Use a prop with known values instead
- **DO** use React component state for ephemeral UI state within components, while avoiding redux or other application state containers
- **DO** use dependencies when needed, such as lodash functions or other open source React components
- **DO** use tds-core components and other tds-community components judiciously
- **DO** make components compatible with React 15 or greater
- **DO** use [ponyfills](https://github.com/sindresorhus/ponyfill) when using native JavaScript APIs with low browser support. The alternative is to require that any consumer of your component include a global polyfill in their app, making your component less self-contained, thought this may be preferable in some cases
- **DO** forward `rest` props onto the primary HTML element of the component so that consumers can still attach global HTML attributes such as `id`.
- **DON'T** hardcode content without giving consumers the ability to override it with other copy or languages

#### Styling (CSS Modules, Sass)

- **DO** scope component class names
- **DON'T** specify external margins. Components must be able to fit into various layouts
- **DON'T** use HTML elements or IDs as CSS selectors. Only use class names
- **DON'T** hardcode pixel values unless an absolute pixel value is required. Use tds-core components or relative values such as rem instead.

#### Utility modules

A utility module is a shared package that can provide common functionality to multiple components. Utility modules are not published to NPM, but are versioned in order for lerna to know it should upgrade components consuming one that has been modified. For an example of a utility module, look at [util-generate-id](https://github.com/telus/tds-core/tree/3e7da5d798295f0fc85bef204299057a3c9ed63d/shared/utils/generateId) on tds-core.

- **DO** add utility modules to the `/shared` directory with its own `package.json` file
- **DO** configure `private: true` within a utility module's `package.json`
- **DO** add utility modules as a **devDependency** to components that consume one
- **DON'T** create utility modules that cannot be reused in any other component

### Documenting components

TDS Community uses [React Styleguidist](https://react-styleguidist.js.org/) to generate documentation. In general, components should have a combination of the following:

- A **ComponentName.md** to complement its **ComponentName.jsx**
- Use of doclet tags to document the component's version and props. Visit the React Styleguidist page on [documenting components](https://react-styleguidist.js.org/docs/documenting.html#external-examples-using-doclet-tags) to learn more

  - Use the `@version` doclet tag to extract the component's version from **package.json**. For example:

  ```jsx
  /**
   * Pilter example
   * @version ./package.json
   */

  const SamplePilter = ({ children, a11yText, ...rest }) => (
  ```

  - Add comments above prop names to provide a brief explanation. For example:

  ```jsx
  /**
   * Label to be read by screen readers
   */
  a11yText: PropTypes.string,
  ```

  - See [samples](#samples) for more examples

### Samples

When developing or documenting components, you can see some [sample
components](https://github.com/telus/tds-community/tree/master/samples) as inspiration.

## Making pull requests

When changes to the codebase are ready for review by a member of the DPA, you may submit a pull request. Keep an eye on the pull request in case changes are requested. Once a pull request is approved, a DPA member may merge your branch to `master` and changes can be deployed.
