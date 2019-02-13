import React from 'react'
import { shallow, mount } from 'enzyme'
import moment from 'moment'

import Calendar from '../Calendar'

describe('Calendar', () => {
  const defaultProps = {
    id: 'appointment_calendar',
    label: 'Book an appointment',
    date: moment('12-25-2020', 'MM-DD-YYYY'),
  }
  const doShallow = (props = defaultProps) => shallow(<Calendar {...props} />)
  const doMount = (props = defaultProps) => mount(<Calendar {...props} />)

  it('renders', () => {
    const calendar = doShallow()

    expect(calendar).toMatchSnapshot()
  })

  it('opens the calendar when input is in focus', () => {
    const calendar = doMount()

    calendar.find('.DateInput_input').simulate('focus')

    expect(calendar.find('.SingleDatePicker_picker')).toHaveLength(1)
  })

  it('passes additional attributes to the element', () => {
    const calendar = doShallow({
      ...defaultProps,
      'data-some-attr': 'some value',
    })

    expect(calendar).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const calendar = doShallow({
      ...defaultProps,
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(calendar).not.toHaveProp('className', 'my-custom-class')
    expect(calendar).not.toHaveProp('style')
  })
})
