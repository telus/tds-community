### Usage Criteria

By default `ToggleSwitch` button sticks to the right side of the contrainer.
The distance between that label and the button can be controlled by the width of the container that wraps `ToggleSwitch`.
It is recommended to maintain a close enough distance for better user experience.
`FlexGrid` can be used as a container that can control this distance. This is demonstrated in the example below.

```jsx
<FlexGrid gutter={false}>
  <FlexGrid.Row>
    <FlexGrid.Col xs={3}>
      <ToggleSwitch id="toggle-default" label="Enable data" toolTipText="Tool Tip Text" />
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```

### Accessibility

When `ToggleSwitch` is used with `Spinner` that is triggered by `isLoading` prop you must provide an assistive text for it by passing a string to `spinnerLabel`.

See example below that demonstrates it.

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)

  const handleClick = event => {
    setTimeout(() => {
      setIsChecked(!isChecked)
    }, 2000)
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={3}>
          <ToggleSwitch
            id="toggle-accessibility"
            label="Enable data"
            toolTipText="Tool Tip Text"
            checked={isChecked}
            spinnerLabel="Request is processing."
            onClick={handleClick}
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  )
}

;<App />
```
