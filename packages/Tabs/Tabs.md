### Usage criteria

Use `AddTabs` according to props data
Note that the `copy` prop must be provided at all times for the correct accessible text.

```jsx
<AddTabs copy="en" tabs={['Themepacks', 'Premium', 'Essentials']}>
  <AddTabs.Panel>
    Choose from more than 40 options and customize them any time in your online account or on the My
    TELUS app.
  </AddTabs.Panel>
  <AddTabs.Panel>
    Choose from more than 15 options and customize them any time in your online account or on the My
    TELUS app.
  </AddTabs.Panel>
  <AddTabs.Panel>
    A great selection of channels from major Canadian and U.S. networks, plus get 72 Stingray music
    channels.
  </AddTabs.Panel>
</AddTabs>
```
