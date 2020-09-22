Similar to `Radio` buttons, `RadioCards` are used when there is a list of two or more options that are mutually exclusive and the user must select exactly one choice. `RadioCards` allow users to easily compare and see options with greater detail. Clicking anywhere on the card selects that option.

### Usage criteria

- All `RadioCards` within a group should have the same `height` and `width`
- The state of the RadioCards should be controlled, and as such both a `checked` and an `onChange` prop should be passed to each RadioCard

```jsx
initialState = {
  choice: '1payment',
}

const setChoice = event => {
  setState({ choice: event.target.value })
}

;<Box between={2} inline>
  <RadioCard
    label="1 installment payment"
    name="papn"
    value="1payment"
    width={315}
    height={200}
    checked={state.choice === '1payment'}
    onChange={setChoice}
  >
    <Box vertical={3}>
      <Paragraph>
        <Text bold={true}>$206.50</Text> due August 15, 2020
      </Paragraph>
    </Box>
  </RadioCard>

  <RadioCard
    label="2 installment payments"
    name="papn"
    value="2payment"
    width={315}
    height={200}
    checked={state.choice === '2payment'}
    onChange={setChoice}
  >
    <Box vertical={3}>
      <Paragraph>
        <Text bold={true}>$103.25</Text> due August 15, 2020
      </Paragraph>
      <Paragraph>
        <Text bold={true}>$103.25</Text> due September 15, 2020
      </Paragraph>
    </Box>
  </RadioCard>
</Box>
```

### Variants

By default, RadioCards will be displayed in the `standard` variant.

```jsx
<RadioCard
  label="1 line selection"
  name="selection"
  value="selection"
  width={240}
  height={90}
  checked={true}
/>
```

The `brand` variant.

```jsx
<RadioCard
  label="2 line selection"
  name="selection2"
  value="selection2"
  variant="brand"
  width={240}
  height={90}
  checked={true}
/>
```
