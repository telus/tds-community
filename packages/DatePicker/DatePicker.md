### Usage Criteria

### Overlay Date Picker

- Use the Overlay Date Picker whenever possible as it is the most accessible solution; the input form field is type-accessible and optimized for mobile customers.
- Overlay Date Picker component includes an input form field to allow manual key-in of dates.
- Overlay Date Picker opens when the Input form field receives focus.

```jsx
initialState = { date: moment() }
;<Datepicker
  id="appointment_datePicker"
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```

### Inline Date Picker

- Use the Inline Date Picker when you want to display the date picker in a larger viewable area; allows the customer to quickly and easily see date availability
- Inline Date Picker component does not include an Input form field
- It is optimized for keyboard interaction and tablet touch
- Use for viewports more than or equal to 576px (small breakpoint or larger)
- Prop `inline` is `false` by default.

```jsx
initialState = { date: moment() }
;<Datepicker
  inline
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```
