### Usage Criteria

#### Overlay Date Picker

- Use the overlay DatePicker whenever possible as it is the most accessible solution; the input form field is type-accessible and optimized for mobile customers
- The overlay DatePicker component includes an input form field to allow manual key-in of dates
- The overlay DatePicker opens when the input form field receives focus

```jsx
initialState = { date: moment() }
;<DatePicker
  id="appointment_datePicker"
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```

#### Inline Date Picker

- Use the inline DatePicker when you want to display the date picker in a larger viewable area; allows the customer to quickly and easily see date availability
- The inline DatePicker component does not include an input form field
- It is optimized for keyboard interaction and tablet touch
- Use for viewports greater than or equal to 576px (small breakpoint or larger)

```jsx
initialState = { date: moment() }
;<DatePicker
  id="appointment_datePicker-inline"
  inline
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```
