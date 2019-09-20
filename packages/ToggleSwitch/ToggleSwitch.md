### Usage Criteria

- `ToggleSwitch` button is a controlled component that requires an `onClick` handler that will trigger `true` or `false` value of `aria-checked` attribute
- The main intent for a `ToggleSwitch` should be using it as a button. For example, you could trigger an API request or change some state of your application
- If the intent is to use it as a form input element with a designated value, please use either [@tds/core-checkbox](https://tds.telus.com/components/index.html#checkbox) or [@tds/core-radio](https://tds.telus.com/components/index.html#radio)
- By default, `ToggleSwitch` button sticks to the right side of the container
  The distance between the label and the button can be controlled by the width of the container that wraps `ToggleSwitch`
  It is recommended to maintain a close enough distance for better user experience and accessibility
  `FlexGrid` can be used as a container that can control this distance. This is demonstrated in the example below
- `ToggleSwitch` can also be used with an optional `ToolTip` to provide additional explanation or instructions. This `ToolTip` can be added by providing `toolTipText` and `toolTipCopy`

### Accessibility

- `ToggleSwitch` component is an html `<button>` element with a role `switch` that has two states `aria-checked="true"` or `aria-checked="false"`
- `ToggleSwitch` has a built-in `Spinner` that requires an assistive text. You must provide this assistive text by passing a string to `spinnerLabel` prop

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)

  const handleClick = event => {
    /* this setTimeout imitates an async call to an API */
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
            toolTipCopy="en"
            toolTipText="Tool Tip Text"
            spinnerLabel="Request is processing."
            checked={isChecked}
            onClick={handleClick}
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  )
}

;<App />
```
