import React from 'react'
import { shallow, mount } from 'enzyme'
import moment from 'moment'
import Datepicker from '../DatePicker'

describe('Datepicker', () => {
  const defaultProps = {
    id: 'appointment_datePicker',
    label: 'Book an appointment',
    date: moment(1608924597000),
    copy: 'en',
  }
  const doShallow = (props = defaultProps) => shallow(<Datepicker {...props} />)
  const doMount = (props = defaultProps) => mount(<Datepicker {...props} />)

  it('renders', () => {
    const datepicker = doShallow()

    expect(datepicker).toMatchSnapshot()
  })

  it('opens the calendar when input is in focus', () => {
    const datepicker = doMount()

    datepicker.find('.DateInput_input').simulate('focus')

    expect(datepicker.find('.SingleDatePicker_picker')).toHaveLength(1)
  })

  it('passes additional attributes to the element', () => {
    const datepicker = doShallow({
      ...defaultProps,
      'data-some-attr': 'some value',
    })

    expect(datepicker).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const datepicker = doShallow({
      ...defaultProps,
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(datepicker).not.toHaveProp('className', 'my-custom-class')
    expect(datepicker).not.toHaveProp('style')
  })
})
