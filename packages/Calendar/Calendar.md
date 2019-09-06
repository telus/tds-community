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
