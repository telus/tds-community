### Usage Criteria

- Use when you want to showcase and guide your users to a webpage.
- Use media for showing images and videos. Video type only supports WebVideo components.
- The image property is deprecated, use media instead.

```jsx
<FlexGrid limitWidth={false} gutter={true}>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        header="Data Intelligence \u00B7 March 21, 2019"
        media={{
          type: 'image',
          content: (
            <img src="blog-example.jpg" alt="Image of co-workers collaborating" width="100%" />
          ),
        }}
        body="Hello world, this preview card has all the props and has text that is over 70 characters in length"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        header="Data Intelligence"
        media={{
          type: 'image',
          content: (
            <img src="blog-example.jpg" alt="Image of co-workers collaborating" width="100%" />
          ),
        }}
        body="Hello world, this preview card has a category"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        header="Data Intelligence"
        media={{
          type: 'video',
          content: (
            <WebVideo
              videoId="ppF-fn37SDs"
              videoLength={30}
              aspectRatio="4:3"
              defaultVolume={70}
              copy="en"
              posterSrc="blog-example.jpg"
            />
          ),
        }}
        body="Hello world, this preview card has no category nor footer"
        footer="By Emelyn Ticong"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        header="Data Intelligence"
        media={{
          type: 'video',
          content: (
            <WebVideo
              videoId="ppF-fn37SDs"
              videoLength={30}
              aspectRatio="4:3"
              defaultVolume={70}
              copy="en"
              posterSrc="blog-example.jpg"
            />
          ),
        }}
        body="Hello world, this preview card has no category nor footer"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        media={{
          type: 'video',
          content: (
            <WebVideo
              videoId="ppF-fn37SDs"
              videoLength={30}
              aspectRatio="4:3"
              defaultVolume={70}
              copy="en"
              posterSrc="blog-example.jpg"
            />
          ),
        }}
        body="Hello world, this preview card has no category nor footer"
        href="#"
      />
    </FlexGrid.Col>
    <FlexGrid.Col xs={12} md={6} lg={4}>
      <PreviewCard
        media={{
          type: 'image',
          content: (
            <img src="blog-example.jpg" alt="Image of co-workers collaborating" width="100%" />
          ),
        }}
        body="Hello world, this preview card has a category"
        href="#"
      />
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```
