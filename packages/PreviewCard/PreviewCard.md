### Usage Criteria

- Use when you want to showcase and guide your users to a webpage.
- Using an image is a design requirement and is strongly recommended.

```jsx
<FlexGrid limitWidth={false} gutter={true}>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        header="Data Intelligence \u00B7 March 21, 2019"
        image={<img src="blog-example.jpg" alt="Image of co-workers collaborating" width="100%" />}
        body="Hello world, this preview card has all the props and has text that is over 70 characters in length"
        footer="By Emelyn Ticong"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        header="Data Intelligence"
        image={<img src="blog-example.jpg" alt="Image of co-workers collaborating" width="100%" />}
        body="Hello world, this preview card has a category"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        image={<img src="blog-example.jpg" alt="Image of co-workers collaborating" width="100%" />}
        body="Hello world, this preview card has no category nor footer"
        href="#"
      />
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```
