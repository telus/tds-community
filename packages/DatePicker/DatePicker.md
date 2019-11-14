### Usage Criteria

#### Overlay Date Picker

- Use the overlay `DatePicker` whenever possible as it is the most accessible solution; the input form field is type-accessible and optimized for mobile customers
- The overlay `DatePicker` component includes an input form field to allow manual key-in of dates
- The overlay `DatePicker` opens when the input form field receives focus

```jsx
initialState = { date: moment() }
;<DatePicker
  id="appointment_datePicker"
  label="Book an appointment"
  date={state.date}
  onDateChange={date => setState({ date })}
  copy="en"
/>
```

#### Inline Date Picker

- Use the inline `DatePicker` when you want to display the date picker in a larger viewable area; allows the customer to quickly and easily see date availability
- The inline `DatePicker` component does not include an input form field
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
  copy="en"
/>
```

### Getting Started

#### Moment.js

Moment.js is library that wraps the native JavaScript Date object. It provides additional features making working with dates easier. It is a requirement for the `react-dates` library which is used by the `DatePicker` component. In order to use the `DatePicker` component you must add `moment` as a dependency in your project.

#### Polyfills

`DatePicker` requires a polyfill to work correctly in Internet Explorer 11. We recommend `core-js` with `regenerator-runtime`. You may need to remove polyfills from polyfill.io as they can clash. The polyfills should be imported at the top of the entry point. See the example below for the polyfill setup.

```jsx static
// entry.jsx
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// ...
```

### Localization in DatePicker

- Localization can be implemented by updating the moment instance using `moment.locale(language)` in the consuming application
- For instance if we want a French `DatePicker`, just update the moment instance as `moment.locale('fr')`, it will render the `DatePicker` using French content
- Refer <https://momentjs.com/docs/#/i18n/getting-locale/> for more details on `moment` localization
