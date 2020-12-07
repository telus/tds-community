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

Use `selectedIndex` and `onSelect` to control the component externally
Stretch will make the dividers fit the width of the containing node

```jsx
<Tabs
  copy="en"
  open="a-la-carte"
  onOpen={(id, previousId, event) => {
    console.log('tab clicked:', id, 'previous tab:', previousId, 'event:', event)
    return true // return false to cancel
  }}
  stretch
>
  <Tabs.Panel id="themepacks" heading="Themepacks" />
  <Tabs.Panel id="premium" heading="Premium" />
  <Tabs.Panel id="a-la-carte" heading="A-la-carte" />
  <Tabs.Panel id="essentials" heading="Essentials" />
  {/* here you might dynamically show content based on onSelect index */}
</Tabs>
```

### Accessibility

- When using Tabs, the consuming application should allow hashes in the url to automatically load a tab. Eg. `https://t.com#premium` should load the Premium tab.

- The application should also change the page url to include the hash as tabs change
