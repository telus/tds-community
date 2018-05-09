# Contributing to TDS Community

Thank you for your interest in contributing! There are a few ways you can help:

* Comment on [existing issues](https://github.com/telusdigital/tds-community/issues) or [open a new one](https://github.com/telusdigital/tds-community/issues/new)
* Propose changes to documentation. (Did you know, you can propose changes [without leaving GitHub](https://help.github.com/articles/editing-files-in-your-repository/)?)
* Add features or patches to [existing components](https://github.com/telusdigital/tds-community/tree/master/packages)
* Add new components! _Read on_

## Table of contents

* [Community component criteria](#community-component-criteria)
* [Process](#process)
* [Designer guide](#designer-guide)
* [Developer guide](#developer-guide)
  * [Codebase overview](#codebase-overview)
  * [Environment setup](#environment-setup)
  * [Versioning packages](#versioning-packages)
* [Making pull requests](#making-pull-requests)

## Community component criteria

Before contributing new components, confirm the following criteria in order to qualify
a viable community component.

A community component...

1.  **Must** have an identified use case in at least 2 unique applications
    * Community components have the most impact when shared across multiple situations in many applications.
2.  **Must** be brand aligned and assessed by Design Direction (if applicable)
    * New user experience patterns must involve Design Direction to preserve a high-quality and consistent end customer experience.
3.  **Must** not include business logic or proprietary information
    * The presence of these things limits the breadth of reuse for a component.
    * Design system components are focused on reusable user experience patterns. Keep business logic, API calls, content, or other application-specific behaviour in the application.
    * Any user-facing copy, such as English phrases, must have the ability to be overridden in order to support multilingual applications
4.  **Must** be sufficiently different than other available shared components
    * Community components reduce duplication by promoting flexibility and reuse of existing code.
    * Before creating a new component, consider whether an existing pattern and component is sufficient. If not, consider extending or adding features to an existing component before creating a new one.
5.  **Should** be sufficiently granular to promote reuse
    * Design system components should encapsulate a single pattern or user experience “element.” Seek to find the most granular, standalone, reusable pattern.

Note, this criteria should be interpreted as described in [RFC2119](https://tools.ietf.org/html/rfc2119).

## Process

When developing or maintaining community components, they typically undergo the following process:

1.  Commonly-used components are identified by design leads and an issue is opened on GitHub for a developer to pick up and contribute
2.  A Digital Platform Ambassador (DPA) who requires a feature for an existing component or a new component can select from the existing list of GitHub issues and assign it to themselves or a volunteer to contribute
3.  Following the [developer guide](#developer-guide) below, a developer builds a component and then submits a pull request
4.  Once all checks and criteria are met, a DPA member merges the pull request and the changes are automatically deployed to its respective package on npmjs.org

## Designer guide

Before transforming designs into code, they must be audited.  
_This section will be completed soon._

## Developer guide

### Codebase overview

For information on file structure, technologies used, and writing tests, see our [codebase overview](https://tds.telus.com/contributing/codebase-overview.html).

### Environment setup

Setting up TDS Community on your development environment is identical to TDS Core. Learn more on our [developer guide](https://tds.telus.com/contributing/developer-guide.html).

### Versioning packages

This repository uses lerna with [conventional commits](https://conventionalcommits.org/) to automate package versioning.
TDS Components must follow [semantic versioning](https://semver.org/) in order for consumers of these components to predictably determine breaking changes as they upgrade over time. When making commits, use `yarn cz` to run commitizen.

Due to the subjectivity of versioning front-end components, keep these suggestions in mind when making conventional commits:

* **Breaking changes** are removals of features such as props, changes that affect the [box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model), or dramatic changes in branding or appearance
* **Minor changes** are new features, animations, props, or visual options
* **Patches** are defect fixes that do not remove features, alter pixel dimensions related to the box model, nor add new features. If an intended feature was not working in a previous release, changing that feature to match the original design counts as a patch even if it affects the box model

### Code style and conventions

Here are some dos and don'ts to consider when writing code.

#### React

* DO make components self-contained. A component should not know anything about other components, except for its direct children
* DO provide a clear, prop-based API to the component. Avoid allowing consumers to customize styles by passing in `className` or `style` as this is not a clear API. Use a prop with known values instead
* DO use React component state for ephemeral UI state within components, while avoiding redux or other application state containers
* DO use dependencies when needed, such as lodash functions or other open source React components
* DO use tds-core components and other tds-community components judiciously
* DO make components compatible with React 15 or greater
* DO use [ponyfills](https://github.com/sindresorhus/ponyfill) when using native JavaScript APIs with low browser support. The alternative is to require that any consumer of your component include a global polyfill in their app, making your component less self-contained, thought this may be preferable in some cases
* DO forward `rest` props onto the primary HTML element of the component so that consumers can still attach global HTML attributes such as `id`.
* DON'T hardcode content without giving consumers the ability to override it with other copy or languages

#### Styling (CSS Modules, Sass)

* DO scope component class names
* DON'T specify external margins. Components must be able to fit into various layouts
* DON'T use HTML elements or IDs as CSS selectors. Only use class names
* DON'T hardcode pixel values. Use tds-core components or relative values such as rem instead

#### Utility modules

* DO add them to the `/shared` directory with its own `package.json` file
* DO configure `private: true` within package.json

### Samples

If this is your first time contributing to TDS Community, you can see some [sample
components](https://github.com/telusdigital/tds-community/tree/master/samples) as inspiration.
