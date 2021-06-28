The StoryCard component is meant to display a snippet of an Article, Podcast or Video. The whole card is clickable, to take you to the destination of said story.

### Usage criteria

- Typical usage of this component will be to display a snippet of an Article, Podcast or Video
- This component is completely dynamic, so it can likely be modified to suit other needs

```jsx
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col md={6}>
      <StoryCard
        date="May 11th, 2021"
        title="Crisis Text Line provides mental health support for youth during lockdown"
        description="With the help of a Foundation grant, Kids Help Line was able to expand its mental health resources to include a Crisis Text Line in greater Edmonton."
        imgUrl="blog-example.jpg"
        href="kids-help-line"
      />
    </FlexGrid.Col>
    <FlexGrid.Col md={6}>
      <StoryCard
        storyType="Article"
        date="May 11th, 2021"
        title="Crisis Text Line provides mental health support for youth during lockdown"
        description="With the help of a Foundation grant, Kids Help Line was able to expand its mental health."
        imgUrl="blog-example.jpg"
        href="kids-help-line"
      />
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```
