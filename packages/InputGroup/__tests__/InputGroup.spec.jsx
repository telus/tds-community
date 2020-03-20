import React from 'react'
import { shallow, mount } from 'enzyme'
import InputGroup from '../InputGroup'

describe('InputGroup', () => {
  let onChangeMockFn
  let onKeyDownMockFn
  let onButtonClickMockFn
  let onClearButtonClickMockFn

  let props

  const doShallow = (properties = {}) => shallow(<InputGroup {...properties} />)

  const doMount = (properties = {}) => mount(<InputGroup {...properties} />)
  beforeEach(() => {
    onChangeMockFn = jest.fn()
    onKeyDownMockFn = jest.fn()
    onButtonClickMockFn = jest.fn()
    onClearButtonClickMockFn = jest.fn()

    props = {
      id: 'someId',
      className: 'someClassName',
      placeholder: 'some placeholder',
      defaultValue: 'default value',
      buttonText: 'button text',
      onChange: onChangeMockFn,
      onKeyDown: onKeyDownMockFn,
      onButtonClick: onButtonClickMockFn,
      onClearButtonClick: onClearButtonClickMockFn,
    }
  })

  describe('Render', () => {
    it('renders InputGroup with label and hint', () => {
      const inputGroup = doMount(props)

      expect(inputGroup.find('label').exists()).toEqual(false)
    })
    it('renders InputGroup with label and hint', () => {
      props.label = 'some label'
      props.hint = 'some hint'
      const inputGroup = doMount(props)
      const texts = inputGroup.find('Text')

      expect(texts.at(0).text()).toEqual('some label')
      expect(texts.at(1).text()).toEqual('some hint')
    })
  })

  describe('Events', () => {
    describe('Input#onChange', () => {
      it('shows clear button', () => {
        props.defaultValue = ''
        props.onChange = undefined
        const inputGroup = doShallow(props)
        const inputWrapper = inputGroup.find('input')
        expect(inputGroup.find('IconButton').exists()).toEqual(false)
        inputWrapper.simulate('change', { target: { value: 'input text' } })
        expect(inputGroup.find('IconButton').exists()).toEqual(true)
      })

      it('calls onChange prop function', () => {
        props.defaultValue = ''
        const inputGroup = doShallow(props)
        const inputWrapper = inputGroup.find('input')
        inputWrapper.simulate('change', { target: { value: 'input text' } })
        expect(onChangeMockFn.mock.calls.length).toEqual(1)
      })
    })

    describe('Close#onClick', () => {
      it('hides clear button', () => {
        props.onClearButtonClick = undefined
        const inputGroup = doMount(props)
        const inputWrapper = inputGroup.find('input')
        inputWrapper.simulate('change', { target: { value: 'input text' } })
        const closeButtonWrapper = inputGroup.find('IconButton')
        expect(closeButtonWrapper.exists()).toEqual(true)
        closeButtonWrapper.simulate('click')
        expect(inputGroup.find('IconButton').exists()).toEqual(false)
      })

      it('calls onClearButtonClick prop function', () => {
        const inputGroup = doMount(props)
        const inputWrapper = inputGroup.find('input')
        inputWrapper.simulate('change', { target: { value: 'input text' } })
        const closeButtonWrapper = inputGroup.find('IconButton')
        expect(closeButtonWrapper.exists()).toEqual(true)
        closeButtonWrapper.simulate('click')
        expect(onClearButtonClickMockFn.mock.calls.length).toEqual(1)
      })
    })
  })
})
