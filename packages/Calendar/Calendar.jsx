import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import 'react-dates/initialize'
import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker'
import DayPickerSingleDateController from 'react-dates/lib/components/DayPickerSingleDateController'
import 'react-dates/lib/css/_datepicker.css'

import safeRest from '@tds/shared-safe-rest'

import DecorativeIcon from '@tds/core-decorative-icon'

import { CalendarContainer, LabelText } from './styles'

/**
 * Calendar component for choosing available dates.
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
    const { id, date, onDateChange, isDayDisabled, inline, label, ...props } = this.props
    const { className, style, ...propsWithoutStyling } = safeRest(props)
    const DatePickerVariant = inline ? DayPickerSingleDateController : SingleDatePicker

    /* Determine daySize based on window.outerWidth and `inline` */
    let responsiveDaySize = 40
    if (window) {
      if (inline) {
        responsiveDaySize = window.outerWidth > 720 ? 60 : 40
      } else {
        responsiveDaySize = window.outerWidth > 720 ? 48 : 40
      }
    }

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <CalendarContainer {...safeRest(propsWithoutStyling)}>
        <label htmlFor={id} />
        <LabelText>{label}</LabelText>
        <DatePickerVariant
          id={id}
          date={date}
          onDateChange={onDateChange}
          focused={this.state.focused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          hideKeyboardShortcutsPanel={true}
          displayFormat="DD / MM / YYYY"
          placeholder="DD / MM / YYYY"
          isDayBlocked={isDayDisabled}
          keepOpenOnDateSelect={false}
          daySize={responsiveDaySize}
          navPrev={<DecorativeIcon symbol="leftChevron" size={16} />}
          navNext={<DecorativeIcon symbol="chevron" size={16} />}
        />
      </CalendarContainer>
    )
  }
}

Calendar.propTypes = {
  /** A unique identifier */
  id: PropTypes.string.isRequired,

  /** A Moment instance representing the currently selected date, i.e. `moment()` */
  date: momentPropTypes.momentObj,

  /** Event triggered every time a new date is clicked on
  @param {Moment} date The new date that was selected */
  onDateChange: PropTypes.func,

  /** A function determining whether a given date should be disabled
  @param {Moment} date The date to optionally disable
  @returns {bool} */
  isDayDisabled: PropTypes.func,

  /** The field label to be displayed above the calendar */
  label: PropTypes.string.isRequired,

  /** A flag determining if the calendar picker is standalone or an input with overlay  */
  inline: PropTypes.bool,
}

Calendar.defaultProps = {
  isDayDisabled: undefined,
  date: undefined,
  onDateChange: () => {},
  inline: false,
}

export default Calendar
