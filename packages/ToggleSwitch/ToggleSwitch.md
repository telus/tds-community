Toggle switches are digital on/off switches. They prompt users to choose between two mutually exclusive options and always have a default value. Toggles should provide immediate results. They are best used for changing the state of system functionalities and preferences.

### Usage Criteria

- Should use a neutral label that describes the toggleable setting, not the action (example: "Mobile data", "Online billing")
- Recommend displaying feedback text to the customer after they have clicked the `ToggleSwitch`. After an asynchronous action has completed, the feedback text should be focused
- Multiple toggles may be present on a single page; grouped toggles do not affect each other as each toggle provides on/off states for a specific option
- By default, the `ToggleSwitch` button is right aligned of the container
- If the intent is to use it as a form input element with a designated value, please use either [@tds/core-checkbox](https://tds.telus.com/components/index.html#checkbox) or [@tds/core-radio](https://tds.telus.com/components/index.html#radio)
- The distance between the label and the button can be controlled by the width of the container that wraps `ToggleSwitch`. Highly recommend to limit the width of the `ToggleSwitch` button so that it's not too far from the label for better user experience and accessibility. Use `FlexGrid` as a container to control the distance between the button and label. Please refer to the `ToggleSwitch` example sandbox
- `ToggleSwitch` may include the optional [`Tooltip`](https://tds.telus.com/components/index.html#!/Tooltip) to provide additional explanation or instructions. `Tooltip` can be added by providing `tooltipText` and `tooltipCopy`

### Accessibility features

- `ToggleSwitch` component is an html `<button>` element with a role `switch` that has two states `aria-checked="true"` or `aria-checked="false"`. This gets announced to assistive technology when determining the current state and its interaction type

### Accessibility guide

- `ToggleSwitch` has a built-in `Spinner` that requires label text. You must provide label text by passing a string to `spinnerLabel` prop so that its loading state can be communicated to assitive technology
- After a toggle has been clicked, usually an immediate or asynchronous action will occur. Once complete, it is important to focus either back on the toggle or to adjacent feedback copy so that customers using screen magnifiers can view relevant information after the action has completed

**Basic usage**

```jsx
const App = () => {
  const [isChecked, setIsChecked] = React.useState(false)
  const toggleRef = React.useRef()

  const handleClick = event => {
    setIsChecked(!isChecked)
    toggleRef.current.focus()
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            ref={toggleRef}
            id="toggle-basic"
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
  const toggleRef = React.useRef()

  const handleClick = event => {
    setIsLoading(true)

    // NOTE: setTimeout does not allow proper focus management. Use promises in production
    setTimeout(() => {
      setIsChecked(!isChecked)
      setIsLoading(false)
      toggleRef.current.focus()
    }, 2000)
  }

  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <ToggleSwitch
            ref={toggleRef}
            id="toggle-autofocus"
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

**Complete example with async first-time load, async toggle, and error handling**

A typical example with the following steps:

1. Go to a page
2. Load user settings, display the `ToggleSwitch` in its loading state (`isLoading={true}`) along with a label for the Spinner
3. Once loaded, display the `ToggleSwitch` with the appropriate `checked` value
4. When the customer clicks on the `ToggleSwitch`, an action can be made. If it is an asynchronous call that takes longer than 200ms, show the appropriate `isLoading` state
5. Once the asynchronous call is complete, set the appropriate `checked` value, turn off the Spinner (`isLoading={false}`), and then focus on newly-rendered feedback text close to the `ToggleSwitch`
6. If there is an error in changing the `ToggleSwitch` state, set the appropriate `checked` value and display an error dialogue using [InputFeedback](https://tds.telus.com/components/index.html#!/InputFeedback)

Note: you can focus on most HTML elements by providing a `tabIndex="-1"` attribute, setting a `ref` value, and then calling `yourRef.current.focus()`. You can learn more about refs and forwarding refs on the [React documentation](https://reactjs.org/docs/refs-and-the-dom.html).

```jsx
const App = () => {
  const [isRouted, setIsRouted] = React.useState(false)
  const [appIsLoaded, setAppIsLoaded] = React.useState(false)
  const [showFeedbackText, setShowFeedbackText] = React.useState(false)
  const [isChecked, setIsChecked] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  const toggleSwitchRef = React.useRef()
  const feedbackTextRef = React.useRef()

  const loadApp = () => {
    setIsRouted(true)
    setTimeout(() => {
      setAppIsLoaded(true)
      setIsLoading(false)
      setIsChecked(true)
    }, 2000)
  }

  const handleToggle = event => {
    setIsLoading(true)
    setShowFeedbackText(false)
    setTimeout(() => {
      setIsChecked(!isChecked)
      setIsLoading(false)
      setShowFeedbackText(true)
    }, 2000)
  }
  const handleToggleError = event => {
    setIsLoading(true)
    setShowFeedbackText(false)

    // NOTE: setTimeout does not allow proper focus management. Use promises in production
    setTimeout(() => {
      setIsChecked(!isChecked)
      setIsLoading(false)
      setShowFeedbackText(true)
    }, 2000)
  }

  const getToggleLabel = () => {
    if (!appIsLoaded) {
      return 'Loading data setting'
    } else if (isChecked) {
      return 'Disable mobile data'
    } else if (!isChecked) {
      return 'Enable mobile data'
    }
  }

  React.useEffect(() => {
    if (!isLoading && feedbackTextRef.current && showFeedbackText) {
      feedbackTextRef.current.focus()
    }
  })

  if (!isRouted) {
    return (
      <Box between={3}>
        <div>
          <Button onClick={loadApp}>Load example</Button>
        </div>
        <Paragraph>
          This simulates routing to a new page, which will then load current user settings.
        </Paragraph>
      </Box>
    )
  }
  return (
    <FlexGrid gutter={false}>
      <FlexGrid.Row>
        <FlexGrid.Col xs={12} md={3}>
          <Box between={3}>
            <ToggleSwitch
              id="toggle-complete"
              ref={toggleSwitchRef}
              label="Mobile data"
              tooltipCopy="en"
              tooltipText="Enable or disable mobile data"
              spinnerLabel="Changing data setting."
              checked={isChecked}
              onClick={handleToggle}
              isLoading={isLoading}
            />
            {showFeedbackText && (
              <div tabIndex="-1" ref={feedbackTextRef}>
                <Paragraph>{`Data has been ${
                  isChecked ? 'enabled' : 'disabled'
                } for this account.`}</Paragraph>
              </div>
            )}
          </Box>
        </FlexGrid.Col>
      </FlexGrid.Row>
    </FlexGrid>
  )
}

;<App />
```
