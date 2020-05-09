Welcome to the TELUS Design System community component library. The design system is based on the principles, characteristics, and
aesthetics of the TELUS brand. We embed the brand into React components which are available in this component library.

## Contents

- [New to TDS?](#new-to-tds)
- [Contributing to TDS Community](#contributing-to-tds-community)
- [Community Heroes](#community-heroes)
- [Community Components](#community-components)

```jsx noeditor
<Box vertical={3}>
  <HairlineDivider gradient />
</Box>
```

<div id="new-to-tds" />
## New to TDS?

To learn more about the design system, design principles, contribution flow, or our support channels, you can get started:

```jsx noeditor
<ChevronLink variant="secondary" href="https://tds.telus.com/getting-started/designers.html">
  For designers
</ChevronLink>
```

```jsx noeditor
<ChevronLink variant="secondary" href="https://tds.telus.com/getting-started/developers.html">
  For developers
</ChevronLink>
```

```jsx noeditor
<ChevronLink variant="secondary" href="https://tds.telus.com/components/index.html">
  TDS Core
</ChevronLink>
```

```jsx noeditor
<Box vertical={3}>
  <HairlineDivider gradient />
</Box>
```

<div id="contributing-to-tds-community" />
## Contributing to TDS Community

TDS Community features two **contribution journeys**:

### v1 Community Components

**What are v1 community components?**

- Components built with the goal of being highly reusable
- Coded components begin at v1.Y.Z to indicate most customer experience concerns were addressed by the point of release
- Follows all the checks and balances as described in the [TDS contributing guide](https://tds.telus.com/contributing/contributing.html)

**How do I contribute v1 components?**

- Follow the [process outlined in tds-community](https://github.com/telus/tds-community/blob/master/.github/CONTRIBUTING.md)

### v0 Private components (new in 2020!)

**What are private components?**

- Components being used by TELUS teams that were stored in their private repositories or Sketch documents and are not easily discoverable
- They were built to get to a sharable state as quickly as possible
- Coded components are versioned at v0.Y.Z to indicate more work needs to be done to address all customer experience concerns
- Follows checks and balances by the respective outcome team contributing the component
- Built with the intention of iterating to reach a similar state as v1 components

**How do I contribute private components?**

In all cases, reach out to the [Digital Platform Ambassadors (DPA)](https://github.com/orgs/telus/teams/digital-platform-ambassadors/members) for any required assistance. They are available in **#dpa-community** on Slack.

Designers should:

- Share static Sketch symbols in the tds_community DSM Library

Developers must:

1. Contribute private components to tds-community on GitHub
2. Start by creating a branch, and [scaffold your component](https://tds.telus.com/contributing/developer-guide.html#write-some-code)
3. Follow [Conventional commits](https://tds.telus.com/contributing/developer-guide.html#make-a-commit)
4. If you need to add dependencies or work with the monorepo in any capacity, please note these [helpful lerna commands](https://tds.telus.com/contributing/developer-guide.html#helpful-lerna-commands)
5. Ensure you have some documentation in your `Component.md` file, and [JSDoc](https://react-styleguidist.js.org/docs/documenting.html#code-comments-and-proptypes) in your main `Component.jsx` file
6. Ensure unit tests pass with `npm test`
7. Make your pull request and inform the DPA!

Visit the [TDS contributing guide for developers](https://tds.telus.com/contributing/developer-guide.html) for full details.

```jsx noeditor
<Box vertical={3}>
  <HairlineDivider gradient />
</Box>
```

<div id="community-heroes" />
## Community Heroes

TDS Community depends on your valuable contributions in order to evolve into a beautiful, robust and efficient design system.
This makes all of our contributors nothing short of Heroes to us.
Check out who our Community Heroes are, and find out how you too can get featured on our [Community Heroes](https://tds.telus.com/community-heroes) page.

### It's more than just bragging rights

TELUS employees that work at the Toronto or Vancouver offices are eligible to redeem **swag** based on their contributions.

```jsx noeditor
<Box vertical={3}>
  <ChevronLink href="https://tds.telus.com/community-heroes">Visit Community Heroes</ChevronLink>
</Box>
```

```jsx noeditor
<Box vertical={3}>
  <HairlineDivider gradient />
</Box>
```
