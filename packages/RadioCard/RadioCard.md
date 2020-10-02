Similar to `Radio` buttons, `RadioCards` are used when there is a list of two or more options that are mutually exclusive and the user must select exactly one choice. `RadioCards` allow users to easily compare and see options with greater detail. Clicking anywhere on the card selects that option.

### Usage criteria

- All `RadioCards` within a group should have the same height and width
- Use the `fullHeight` prop to have the bottom edge of the `RadioCards` aligned. This is usually needed when using cards in a `FlexGrid` and will result in the `RadioCards` matching the height of their parent container
- The state of the RadioCards should be controlled, and as such both a `checked` and an `onChange` prop should be passed to each RadioCard
- For accessibility, `RadioCards` should be grouped using a `<fieldset>`tag with a `<legend>` tag to define a caption
- Avoid nesting interactive elements as `children` and additional details provided as `children` to the `RadioCard` should maintain a limit of 150 characters

```jsx
initialState = {
  choice: '1payment',
}

const setChoice = event => {
  setState({ choice: event.target.value })
}

;<Box tag="fieldset" between={3}>
  <legend>
    <Text bold size="medium">
      Select your preferred payment arrangement:
    </Text>
  </legend>
  <FlexGrid>
    <FlexGrid.Row>
      <FlexGrid.Col xs={12} md={4}>
        <RadioCard
          label="1 installment payment"
          name="papn"
          value="1payment"
          fullHeight={true}
          checked={state.choice === '1payment'}
          onChange={setChoice}
        >
          <Box below={3} />
          <Paragraph>
            <Text bold={true}>$206.50</Text> due August 15, 2020
          </Paragraph>
        </RadioCard>
      </FlexGrid.Col>
      <FlexGrid.Col xs={12} md={4}>
        <RadioCard
          label="2 installment payments"
          name="papn"
          value="2payment"
          fullHeight={true}
          checked={state.choice === '2payment'}
          onChange={setChoice}
        >
          <Box below={3} />
          <Paragraph>
            <Text bold={true}>$103.25</Text> due August 15, 2020
          </Paragraph>
          <Paragraph>
            <Text bold={true}>$103.25</Text> due September 15, 2020
          </Paragraph>
        </RadioCard>
      </FlexGrid.Col>
      <FlexGrid.Col xs={12} md={4}>
        <RadioCard
          label="3 installment payments"
          name="papn"
          value="3payment"
          fullHeight={true}
          checked={state.choice === '3payment'}
          onChange={setChoice}
        >
          <Box below={3} />
          <Paragraph>
            <Text bold={true}>$68.83</Text> due August 15, 2020
          </Paragraph>
          <Paragraph>
            <Text bold={true}>$68.83</Text> due September 15, 2020
          </Paragraph>
          <Paragraph>
            <Text bold={true}>$68.83</Text> due October 15, 2020
          </Paragraph>
        </RadioCard>
      </FlexGrid.Col>
    </FlexGrid.Row>
  </FlexGrid>
</Box>
```

### Variants

By default, RadioCards will be displayed in the `standard` variant.

```jsx
<div style={{ width: '240px' }}>
  <RadioCard label="1 line selection" name="selection" value="selection" checked={true} />
</div>
```

The `brand` variant.

```jsx
<div style={{ width: '240px' }}>
  <RadioCard
    label="2 line selection"
    name="selection2"
    value="selection2"
    variant="brand"
    checked={true}
  />
</div>
```
