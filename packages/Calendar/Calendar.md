### Usage Criteria

- `Calendar` component can be used for appointment booking or other scenarios where users need to pick a date.
- Use `inline` prop to render inline calendar picker which does not contain input field.
- Prop `inline` is `false` by default.

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

```jsx
initialState = { date: moment() }
;<Calendar
  inline
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
/>
```
