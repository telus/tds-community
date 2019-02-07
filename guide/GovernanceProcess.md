## Community governance process

Consuming TDS Community components is very similar to [TDS Core](https://tds.telus.com/getting-started/getting-started.html).

**For designers**

- TDS_community components available in its own design library on DSM (design systems manager).
- Follow the guidelines to [set up TDS_core & community](https://tds.telus.com/getting-started/designers.html) design libraries.
- Community component designs will be audited by the DPA and help will be assigned.

**For developers**

Unlike TDS Core, npm modules from TDS Community are prefixed @tds/community-\*. To set up your project to consume community or core components:

- Follow the community [getting started guide](https://github.com/telus/tds-community/blob/master/.github/CONTRIBUTING.md)
- Go to the [TDS Community catalogue](https://tds.telus.com/community/index.html) and choose a component to install

## Community Versioning

TDS Community features individually-versioned components and each component is an npm package that adheres to Semantic Versioning to make it easier for consumers to manage upgrades across independent components.

- Major version changes denote breaking API changes such as renaming a component.
- Minor version changes denote backwards compatible changes such as introducing a new prop to a component.
- Patch changes denote bug fixes.

## Community Backlog

The TDS Community backlog is managed through GitHub Projects.

[https://github.com/telus/tds-community/projects/1](https://github.com/telus/tds-community/projects/1)

All issues are placed on a Kanban style board for maximum transparency. As issues are processed by the leads and the DPA they will flow through each of the columns. Staff members and discussions will take place on the individual issues themselves. To learn more about the process of tickets flowing through the project board, see the [community backlog process](./CommunityBacklog.md)
