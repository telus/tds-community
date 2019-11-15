import React from 'react'
import { shallow, mount } from 'enzyme'

import ToggleSwitch from '../ToggleSwitch'

describe('ToggleSwitch', () => {
  const mockOnClick = jest.fn()
  const defaultProps = {
    id: 'my-id-123',
    label: 'label',
    name: 'name',
    value: 'value',
    toolTipCopy: 'en',
    spinnerLabel: 'Request is processing.',
    onClick: mockOnClick,
  }

  const doShallow = props => shallow(<ToggleSwitch {...defaultProps} {...props} />)

  it('renders', () => {
    const toggleSwitch = mount(<ToggleSwitch {...defaultProps} />)

    expect(toggleSwitch).toMatchSnapshot()
  })

  it('should have for attribute matching passed id', () => {
    const toggleSwitch = doShallow()

    expect(toggleSwitch.find('StyledLabel').prop('htmlFor')).toEqual(defaultProps.id)
  })

  it('should have label text with an id that matches the checkbox aria-labelledby attribute', () => {
    const toggleSwitch = doShallow()

    expect(
      toggleSwitch
        .find(`#${defaultProps.id}`)
        .at(0)
        .prop('aria-labelledby')
    ).toEqual(`${defaultProps.id}-label`)

    expect(
      toggleSwitch
        .find(`#${defaultProps.id}`)
        .at(0)
        .prop('aria-labelledby')
    ).toEqual(
      toggleSwitch
        .find(`#${defaultProps.id}-label`)
        .at(0)
        .prop('id')
    )
  })

  it('should be default unchecked', () => {
    const toggleSwitch = mount(<ToggleSwitch {...defaultProps} />)
    expect(
      toggleSwitch
        .find(`styles__Button#${defaultProps.id}`)
        .children(0)
        .prop('aria-checked')
    ).toEqual(false)

    expect(
      toggleSwitch
        .find(`[data-testid="${defaultProps.id}-switch"]`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(false)
  })

  it('should be checked when checked property is true', () => {
    const toggleSwitch = doShallow({ checked: true })
    expect(
      toggleSwitch
        .find(`#${defaultProps.id}`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(true)

    expect(
      toggleSwitch
        .find(`[data-testid="${defaultProps.id}-switch"]`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(true)
  })

  it('internal state should toggle checked when the input is changed by default', () => {
    const toggleSwitch = doShallow({ checked: true, onClick: mockOnClick })

    const mockEvent = { persist: () => {} }

    toggleSwitch
      .find(`#${defaultProps.id}`)
      .at(0)
      .simulate('click', mockEvent)

    expect(
      toggleSwitch
        .find(`#${defaultProps.id}`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(true)

    expect(
      toggleSwitch
        .find(`[data-testid="${defaultProps.id}-switch"]`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(true)
  })

  it('should override internal state change when onClick handler is provided ', () => {
    const mockEvent = { persist: () => {} }
    const toggleSwitch = doShallow({ checked: false, onClick: mockOnClick })

    toggleSwitch
      .find(`#${defaultProps.id}`)
      .at(0)
      .simulate('click', mockEvent)

    // Checked state should remain false instead of toggling
    expect(
      toggleSwitch
        .find(`#${defaultProps.id}`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(false)

    expect(
      toggleSwitch
        .find(`[data-testid="${defaultProps.id}-switch"]`)
        .at(0)
        .prop('aria-checked')
    ).toEqual(false)

    // Custom onChange handler should get event delgated to it instead
    expect(mockOnClick).toHaveBeenCalledWith(mockEvent)
  })

  it('should call onFocus handler when provided ', () => {
    const mockOnFocus = jest.fn()
    const mockEvent = { persist: () => {} }
    const toggleSwitch = doShallow({ checked: false, onFocus: mockOnFocus })

    toggleSwitch
      .find(`#${defaultProps.id}`)
      .at(0)
      .simulate('focus', mockEvent)

    expect(mockOnFocus).toHaveBeenCalledWith(mockEvent)
  })

  it('should call onBlur handler when provided ', () => {
    const mockOnBlur = jest.fn()
    const mockEvent = { persist: () => {} }
    const toggleSwitch = doShallow({ checked: false, onBlur: mockOnBlur })

    toggleSwitch
      .find(`#${defaultProps.id}`)
      .at(0)
      .simulate('blur', mockEvent)

    expect(mockOnBlur).toHaveBeenCalledWith(mockEvent)
  })

  it('passes additional attributes to the element', () => {
    const toggleSwitch = doShallow({ 'data-some-attr': 'some value' })

    expect(toggleSwitch.find(`#${defaultProps.id}`).at(0)).toHaveProp(
      'data-some-attr',
      'some value'
    )
  })

  it('should not show spinner when isLoading=false', () => {
    const toggleSwitch = doShallow({ isLoading: false })
    const spinner = toggleSwitch.find('Spinner')
    expect(spinner.prop('spinning')).toEqual(false)
  })

  it('show spinner when isLoading=true', () => {
    const toggleSwitch = doShallow({ isLoading: true })
    const spinner = toggleSwitch.find('Spinner')
    expect(spinner.prop('spinning')).toEqual(true)
  })
})
