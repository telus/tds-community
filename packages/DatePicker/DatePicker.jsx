import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'

import 'react-dates/initialize'
import SingleDatePicker from 'react-dates/lib/components/SingleDatePicker'
import DayPickerSingleDateController from 'react-dates/lib/components/DayPickerSingleDateController'
import 'react-dates/lib/css/_datepicker.css'

import { safeRest, getCopy } from '@tds/util-helpers'

import DecorativeIcon from '@tds/core-decorative-icon'

import { CalendarContainer, LabelText, HiddenInputFieldContainer } from './styles'

import copyDictionary from './datePickerText'

/**
 * The `DatePicker` component is used to select a single date. It is available as an inline date picker or overlay date picker where the customer may select a date, either by keying in (input form field) or selecting through the overlay.
 * @version ./package.json
 */

/* Determine daySize based on window.innerWidth and `inline` */
const getResponsiveDaySize = inline => () => {
  let responsiveDaySize
  if (typeof window === 'undefined') {
    return undefined
  }
  if (window.innerWidth >= 432) {
    responsiveDaySize = inline ? 60 : 48
  } else if (window.innerWidth >= 376) {
    responsiveDaySize = 40
  } else {
    responsiveDaySize = inline ? undefined : 33
  }
  return responsiveDaySize
}

const getIcon = type => <DecorativeIcon symbol={type} size={16} />

const DatePicker = ({ id, date, copy, onDateChange, isDayDisabled, inline, label, ...props }) => {
  const [isFocused, setIsFocused] = useState(false)
  const labelRef = useRef(null)

  useEffect(() => {
    window.addEventListener('resize', getResponsiveDaySize(inline))

    return () => {
      window.removeEventListener('resize', getResponsiveDaySize(inline))
    }
  })

  useEffect(() => {
    if (!isFocused) {
      labelRef.current.control.blur()
    }
  }, [isFocused])

  const onFocusChange = ({ focused }) => {
    setIsFocused(focused)
  }

  const { className, style, ...propsWithoutStyling } = safeRest(props)

  /* eslint-disable jsx-a11y/label-has-for */

  const daySize = getResponsiveDaySize(inline)()
  return (
    <CalendarContainer {...safeRest(propsWithoutStyling)} daySize={daySize}>
      <label htmlFor={id} ref={labelRef}>
        <LabelText>{label}</LabelText>
        {inline && (
          <React.Fragment>
            <HiddenInputFieldContainer>
              <input id={id} type="text" value={date.format('YYYY-MM-DD') || ''} readOnly />
            </HiddenInputFieldContainer>
            <DayPickerSingleDateController
              date={date}
              onDateChange={onDateChange}
              focused={isFocused}
              onFocusChange={onFocusChange}
              numberOfMonths={1}
              hideKeyboardShortcutsPanel={true}
              keepOpenOnDateSelect={false}
              daySize={daySize}
              navPrev={getIcon('leftChevron')}
              navNext={getIcon('chevron')}
              isOutsideRange={isDayDisabled}
              phrases={getCopy(copyDictionary, copy)}
            />
          </React.Fragment>
        )}
        {!inline && (
          <SingleDatePicker
            id={id}
            date={date}
            onDateChange={onDateChange}
            focused={isFocused}
            onFocusChange={onFocusChange}
            numberOfMonths={1}
            hideKeyboardShortcutsPanel={true}
            displayFormat="DD / MM / YYYY"
            placeholder="DD / MM / YYYY"
            keepOpenOnDateSelect={false}
            daySize={daySize}
            navPrev={getIcon('leftChevron')}
            navNext={getIcon('chevron')}
            isOutsideRange={isDayDisabled}
            phrases={getCopy(copyDictionary, copy)}
          />
        )}
      </label>
    </CalendarContainer>
  )
}

DatePicker.propTypes = {
  /** A unique identifier */
  id: PropTypes.string.isRequired,

  copy: PropTypes.oneOf(['en', 'fr']).isRequired,

  /** A Moment instance representing the currently selected date, i.e. `moment()` */
  date: momentPropTypes.momentObj,

  /** Event triggered every time a new date is clicked on
  @param {Moment} date The new date that was selected */
  onDateChange: PropTypes.func,

  /** A function determining whether a given date should be disabled *(implemented only since 1.0.5)*
  @param {Moment} date The date to optionally disable
  @returns {bool}
  @since 1.0.5
  @see See [issue #502](https://https://github.com/telus/tds-community/issues/502) for further information */
  isDayDisabled: PropTypes.func,

  /** The field label to be displayed above the calendar */
  label: PropTypes.string.isRequired,

  /** A flag determining if the calendar picker is standalone or an input with overlay  */
  inline: PropTypes.bool,
}

DatePicker.defaultProps = {
  isDayDisabled: undefined,
  date: undefined,
  onDateChange: () => {},
  inline: false,
}

export default DatePicker
