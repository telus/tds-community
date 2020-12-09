### Usage criteria

Use `Tabs` according to props data
Note that the `copy` prop must be provided at all times for the correct accessible text.

```jsx
<Tabs copy="en">
  <Tabs.Panel heading="Themepacks">
    Choose from more than 40 options and customize them any time in your online account or on the My
    TELUS app.
  </Tabs.Panel>
  <Tabs.Panel heading="Premium">
    Choose from more than 15 options and customize them any time in your online account or on the My
    TELUS app.
  </Tabs.Panel>
  <Tabs.Panel heading="Essentials">
    A great selection of channels from major Canadian and U.S. networks, plus get 72 Stingray music
    channels.
  </Tabs.Panel>
  <Tabs.Panel heading="More content">
    Choose from more than 40 options and customize them any time in your online account or on the My
    TELUS app.
  </Tabs.Panel>
  <Tabs.Panel heading="More content again">
    Choose from more than 15 options and customize them any time in your online account or on the My
    TELUS app.
  </Tabs.Panel>
  <Tabs.Panel heading="Even more content">
    A great selection of channels from major Canadian and U.S. networks, plus get 72 Stingray music
    channels.
  </Tabs.Panel>
</Tabs>
```

### Controlled Example

Use the `open` and `onOpen` props to control the component externally.

To use controlled mode, you must specify an `id` (string) on each `<Tab.Panel>`.
You can then use the `open` prop on `<Tabs>` to pass in the `id` of the tab you want to open.

When a user selects a tab, the event `onOpen(id)` will be raised, where `id` is the id of the tab clicked.

**Note**: Control mode is enabled when `open` is not `null`. If set, and no `id` matches the `open` prop, the component will render with no tab selected.

```jsx
const ControlledTabsExample = () => {
  const [open, setOpen] = React.useState('a-la-carte')

  const handleOpen = id => {
    setOpen(id)
  }

  return (
    <>
      <Tabs copy="en" open={open} onOpen={handleOpen}>
        <Tabs.Panel id="themepacks" heading="Themepacks" />
        <Tabs.Panel id="premium" heading="Premium" />
        <Tabs.Panel id="a-la-carte" heading="A-la-carte" />
        <Tabs.Panel id="essentials" heading="Essentials" />
        <Tabs.Panel id="more" heading="More Content" />
        <Tabs.Panel id="more-again" heading="More content again" />
        <Tabs.Panel id="even-more" heading="Even more content" />
      </Tabs>
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            <Box below={3}>
              <Text>
                You selected tab: <Strong>{open}</Strong>
              </Text>
            </Box>
          </FlexGrid.Col>
        </FlexGrid.Row>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            <Button onClick={() => handleOpen('no tab')}>Select no tab</Button>
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </>
  )
}
;<ControlledTabsExample />
```

### Accessibility

- When using Tabs, the consuming application should allow hashes in the url to automatically load a tab. Eg. `https://t.com#premium` should load the Premium tab.

- The application should also change the page url to include the hash as tabs change
