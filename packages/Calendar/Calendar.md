### Usage Criteria

### Overlay Calendar Picker

- Use the Overlay Calendar Picker whenever possible as it is the most accessible solution; the input form field is type-accessible and optimized for mobile customers.
- Overlay Calendar Picker component includes an input form field to allow manual key-in of dates.
- Overlay Calendar Picker opens when the Input form field receives focus.

```jsx
initialState = { date: moment() }
;<Calendar
  id="appointment_calendar"
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```

### Inline Calendar Picker

- Use the Inline Calendar Picker when you want to display the calendar in a larger viewable area; allows the customer to quickly and easily see date availability
- Inline Calendar Picker component does not include an Input form field
- It is optimized for keyboard interaction and tablet touch
- Use for viewports more than or equal to 576px (small breakpoint or larger)
- Prop `inline` is `false` by default.

```jsx
initialState = { date: moment() }
;<Calendar
  inline
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```
