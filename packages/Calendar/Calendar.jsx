import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import 'react-dates/initialize'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'

import safeRest from '@tds/shared-safe-rest'

import DecorativeIcon from '@tds/core-decorative-icon'

import { CalendarContainer, LabelText } from './styles'

/** Calendar component for choosing available dates.
 * @version ./package.json
 */

class Calendar extends Component {
  state = {
    focused: false,
  }

  onFocusChange = ({ focused }) => {
    this.setState({ focused })
  }

  render() {
    const { id, date, onDateChange, isDayDisabled, label, ...props } = this.props
    const { className, style, ...propsWithoutStyling } = props

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <CalendarContainer {...safeRest(propsWithoutStyling)}>
        <label htmlFor={id}>
          <LabelText>{label}</LabelText>
          <SingleDatePicker
            id={id}
            date={this.state.date}
            onDateChange={onDateChange}
            focused={this.state.focused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            hideKeyboardShortcutsPanel={true}
            displayFormat="DD / MM / YYYY"
            placeholder="DD / MM / YYYY"
            isDayBlocked={isDayDisabled}
            keepOpenOnDateSelect={false}
            daySize={window && window.outerWidth > 720 ? 44 : 39}
            navPrev={<DecorativeIcon symbol="leftChevron" size={16} />}
            navNext={<DecorativeIcon symbol="chevron" size={16} />}
          />
        </label>
      </CalendarContainer>
    )
  }
}

Calendar.propTypes = {
  /** A unique identifier */
  id: PropTypes.string.isRequired,

  /** A Moment instance representing the currently selected date <em>i.e. moment() </em> */
  date: momentPropTypes.momentObj,

  /** Event triggered every time a new date is clicked on
  @param {Moment} date The new date that was clicked */
  onDateChange: PropTypes.func,

  /** A function determing whether a given date should be disabled
  @param {Moment} date The date to optionally disable
  @returns {bool} */
  isDayDisabled: PropTypes.func,

  /** The field label to be displayed above the calendar */
  label: PropTypes.string.isRequired,
}

Calendar.defaultProps = {
  isDayDisabled: undefined,
  date: undefined,
  onDateChange: () => {},
}

export default Calendar
