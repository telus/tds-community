import React from 'react'
import { shallow } from 'enzyme'

import ToggleSwitch from '../ToggleSwitch'

describe('ToggleSwitch', () => {
  const MANDATORY_PROPS = { id: '123', label: 'label', name: 'name', value: 'value' }
  const doShallow = (props = MANDATORY_PROPS) => shallow(<ToggleSwitch {...props} />)

  it('renders', () => {
    const toggleSwitch = doShallow()

    expect(toggleSwitch).toMatchSnapshot()
  })

  it('should have for attribute matching passed id', () => {
    const toggleSwitch = doShallow()

    expect(
      toggleSwitch
        .find('label')
        .at(0)
        .prop('htmlFor')
    ).toEqual(MANDATORY_PROPS.id)
  })

  it('should have label text with an id that matches the checkbox aria-labelledby attribute', () => {
    const toggleSwitch = doShallow()

    expect(
      toggleSwitch
        .find('label Box span input[type="checkbox"]')
        .at(0)
        .prop('aria-labelledby')
    ).toEqual(`${MANDATORY_PROPS.id}-label`)

    expect(
      toggleSwitch
        .find('label Box span input[type="checkbox"]')
        .at(0)
        .prop('aria-labelledby')
    ).toEqual(
      toggleSwitch
        .find('label Box Text')
        .at(0)
        .prop('id')
    )
  })

  it('should be default unchecked', () => {
    const toggleSwitch = doShallow()

    expect(
      toggleSwitch
        .find('label Box span input')
        .at(0)
        .prop('checked')
    ).toEqual(false)

    expect(
      toggleSwitch
        .find('label Box span')
        .at(1)
        .prop('aria-checked')
    ).toEqual(false)
  })

  it('should be checked when checked property is true', () => {
    const toggleSwitch = doShallow({ ...MANDATORY_PROPS, checked: true })
    expect(
      toggleSwitch
        .find('label Box span input')
        .at(0)
        .prop('checked')
    ).toEqual(true)

    expect(
      toggleSwitch
        .find('label Box span')
        .at(1)
        .prop('aria-checked')
    ).toEqual(true)
  })

  it('internal state should toggle checked when the input is changed by default', () => {
    const toggleSwitch = doShallow()

    toggleSwitch
      .find('label Box span input')
      .at(0)
      .simulate('change')

    expect(
      toggleSwitch
        .find('label Box span input')
        .at(0)
        .prop('checked')
    ).toEqual(true)

    expect(
      toggleSwitch
        .find('label Box span')
        .at(1)
        .prop('aria-checked')
    ).toEqual(true)
  })

  it('should override internal state change when onChange handler is provided ', () => {
    const mockOnChange = jest.fn()
    const mockEvent = { persist: () => {} }
    const toggleSwitch = doShallow({ ...MANDATORY_PROPS, checked: false, onChange: mockOnChange })

    toggleSwitch
      .find('label Box span input')
      .at(0)
      .simulate('change', mockEvent)

    // Checked state should remain false instead of toggling
    expect(
      toggleSwitch
        .find('label Box span input')
        .at(0)
        .prop('checked')
    ).toEqual(false)

    expect(
      toggleSwitch
        .find('label Box span')
        .at(1)
        .prop('aria-checked')
    ).toEqual(false)

    // Custom onChange handler should get event delgated to it instead
    expect(mockOnChange).toHaveBeenCalledWith(mockEvent)
  })

  it('should call onFocus handler when provided ', () => {
    const mockOnFocus = jest.fn()
    const mockEvent = { persist: () => {} }
    const toggleSwitch = doShallow({ ...MANDATORY_PROPS, checked: false, onFocus: mockOnFocus })

    toggleSwitch
      .find('label Box span input')
      .at(0)
      .simulate('focus', mockEvent)

    expect(mockOnFocus).toHaveBeenCalledWith(mockEvent)
  })

  it('should call onBlur handler when provided ', () => {
    const mockOnBlur = jest.fn()
    const mockEvent = { persist: () => {} }
    const toggleSwitch = doShallow({ ...MANDATORY_PROPS, checked: false, onBlur: mockOnBlur })

    toggleSwitch
      .find('label Box span input')
      .at(0)
      .simulate('blur', mockEvent)

    expect(mockOnBlur).toHaveBeenCalledWith(mockEvent)
  })

  it('passes additional attributes to the element', () => {
    const toggleSwitch = doShallow({ ...MANDATORY_PROPS, 'data-some-attr': 'some value' })

    expect(toggleSwitch.find('input').at(0)).toHaveProp('data-some-attr', 'some value')
  })
})
