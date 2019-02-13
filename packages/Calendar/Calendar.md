```jsx
<Calendar id="appointment_calendar" label="Book an appointment" />
```

### Stateful Example

```jsx noeditor static
import React, { Component } from 'react'
import moment from 'moment'

class App extends Component {
  state = {
    date: moment(),
  }

  onDateChange = date => {
    this.setState({ date })
  }

  render() {
    return (
      <Calendar
        id="appointment_calendar"
        label="Book an appointment"
        date={this.state.date}
        onDateChange={this.onDateChange}
      />
    )
  }
}
```
