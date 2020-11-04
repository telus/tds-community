### Usage criteria

- Use `spacing` prop according to tds-core-card component
- Use all props of tds-core-paragraph component

```jsx
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={5}>
      <Card variant="defaultWithBorder">
        <Box between={3}>
          <Heading level="h3">Internet 15 - Special Offer</Heading>
          <CalloutParagraph>
            Our commitment to service is demonstrated in everything we do.
          </CalloutParagraph>
          <HairlineDivider />
          <Text size="medium">Good for basic browsing, and posting to social media.</Text>
          <Button>Add to cart</Button>
          <ChevronLink href="#">Learn more</ChevronLink>
        </Box>
      </Card>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```

### Rounded Corners

```jsx
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={5}>
      <Card variant="defaultWithBorder">
        <Box between={3}>
          <Heading level="h3">Internet 15 - Special Offer</Heading>
          <CalloutParagraph roundedCorners>Save $70/month.</CalloutParagraph>
          <HairlineDivider />
          <Text size="medium">Good for basic browsing, and posting to social media.</Text>
          <Button>Add to cart</Button>
          <ChevronLink href="#">Learn more</ChevronLink>
        </Box>
      </Card>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```
