### Usage Criteria

- `Pagination` can be used in content heavy pages to divide content and present in a limited and digestible manner
- The component can take any content as children inside a Panel
- Any number of panels can be used to paginate
- Style your content within Panel however you wish
- copy can be passed in as a prop, en is set as default

```jsx
<Pagination copy="en">
  <Pagination.Panel>Content 1: any type of content can be used here.</Pagination.Panel>
  <Pagination.Panel>Content 2: use responsibly.</Pagination.Panel>
  <Pagination.Panel>Content 3: Pagination Panels take &lt;div /&gt; tags, image tags, heading tags and so on.</Pagination.Panel>
  <Pagination.Panel>Content 4: <div><Heading level="h2">This is an h2 heading</Heading></div></Pagination.Panel>
  <Pagination.Panel>Content 5: `copy` can be passed in as a prop, "en" is the default, "fr" is the other option.</Pagination.Panel>
  <Pagination.Panel>If you are dynamically loading content, then you can use a Panel as a placeholder and then load the content once it fetches, inside the Panel.</Pagination.Panel>
  <Pagination.Panel>Panels are wrappers that can contain any content, and have no pre-built UI</Pagination.Panel>
  <Pagination.Panel>Content 8</Pagination.Panel>
  <Pagination.Panel>
    <div>
      <p>This is a paragraph on the 9th panel</p>
    </div>
  </Pagination.Panel>
</Pagination>
<Box inset={4}> </Box>
```
