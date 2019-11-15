Toggle switches are digital on/off switches. They prompt users to choose between two mutually exclusive options and always have a default value. Toggles should provide immediate results. They are best used for changing the state of system functionalities and preferences.

### Usage Criteria

- Must provide concise, non-neutral label
- Use positive, active wording for the label; make clear what thing is being turned on
- May group similar toggles; grouped toggles do not affect each other as each toggle provides on/off states for a specific option
- `ToggleSwitch` component is a controlled component and requires an `onClick` handler
- Use the `ToggleSwitch` button to trigger an API request or change the state of your application
- Use the `isLoading` prop to show overlay spinner above `ToggleSwitch` whil API request is processing (see example _Asynchoronous usage_)
- Use the `autofocus` prop to automatically focus back to `ToggleSwitch` between state transitions (see example _Asynchoronous usage with autofocus back on toggle after checked prop transition_)
- Use the `ref` prop to mangually focus on `ToggleSwitch` (see example _Manual focus using Ref_)
- If the intent is to use it as a form input element with a designated value, please use either [@tds/core-checkbox](https://tds.telus.com/components/index.html#checkbox) or [@tds/core-radio](https://tds.telus.com/components/index.html#radio)
- By default, the `ToggleSwitch` button is right aligned of the container
- The distance between the label and the button can be controlled by the width of the container that wraps `ToggleSwitch`. Highly recommend to limit the width of the `ToggleSwitch` button so that it's not too far from the label for better user experience and accessibility. Use `FlexGrid` as a container to control the distance between the button and label. Please refer to the `ToggleSwitch` example sandbox
- `ToggleSwitch` may include the optional `Tooltip` to provide additional explanation or instructions. `Tooltip` can be added by providing `tooltipText` and `tooltipCopy`
- [Tooltip](https://tds.telus.com/components/index.html#tooltip) will follow existing usage criteria
- [Tooltip](https://tds.telus.com/components/index.html#tooltip) is not mandatory to toggle label

### Accessibility

- `ToggleSwitch` component is an html `<button>` element with a role `switch` that has two states `aria-checked="true"` or `aria-checked="false"`
- `ToggleSwitch` has a built-in `Spinner` that requires an assistive text. You must provide this assistive text by passing a string to `spinnerLabel` prop

**Basic usage**

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)

  const handleClick = event => {
    setIsChecked(!isChecked)
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            id="toggle-accessibility"
            label="Enable data"
            tooltipCopy="en"
            tooltipText="Tool Tip Text"
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

**Asynchoronous usage**

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const handleClick = event => {
    setIsLoading(true)
    setTimeout(() => {
      setIsChecked(!isChecked)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            id="toggle-accessibility"
            label="Enable data"
            tooltipCopy="en"
            tooltipText="Tool Tip Text"
            spinnerLabel="Request is processing."
            checked={isChecked}
            onClick={handleClick}
            isLoading={isLoading}
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  )
}

;<App />
```

**Asynchoronous usage with autofocus back on toggle after checked prop transition**

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const handleClick = event => {
    setIsLoading(true)
    setTimeout(() => {
      setIsChecked(!isChecked)
      setIsLoading(false)
    }, 2000)
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            id="toggle-accessibility"
            label="Enable data"
            tooltipCopy="en"
            tooltipText="Tool Tip Text"
            spinnerLabel="Request is processing."
            checked={isChecked}
            onClick={handleClick}
            isLoading={isLoading}
            autofocus
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  )
}

;<App />
```

**Manual focus using Ref**

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const toggleSwitchRef = React.useRef()
  const handleClick = event => {
    setIsLoading(true)
    setTimeout(() => {
      setIsChecked(!isChecked)
      setIsLoading(false)
      toggleSwitchRef.current.focus()
    }, 2000)
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            ref={toggleSwitchRef}
            id="toggle-accessibility"
            label="Enable data"
            tooltipCopy="en"
            tooltipText="Tool Tip Text"
            spinnerLabel="Request is processing."
            checked={isChecked}
            onClick={handleClick}
            isLoading={isLoading}
          />
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  )
}

;<App />
```
