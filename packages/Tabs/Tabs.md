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
  selectedIndex={1}
  onSelect={(index, previous, event) => {
    console.log('tab clicked', index, 'previous', previous, 'event', event)
    return true // return false to cancel
  }}
  stretch
>
  <Tabs.Panel heading="Themepacks" />
  <Tabs.Panel heading="Premium" />
  <Tabs.Panel heading="A-la-carte" />
  <Tabs.Panel heading="Essentials" />
  {/* here you might dynamically show content based on onSelect index */}
</Tabs>
```
