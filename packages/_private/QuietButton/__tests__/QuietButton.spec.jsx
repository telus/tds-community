import React from 'react'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'

import A11yContent from '@tds/core-a11y-content'
import { Edit } from '@tds/core-interactive-icon'
import QuietButton from '../QuietButton'

describe('QuietButton', () => {
  const doShallow = (props = {}) => shallow(<QuietButton {...props}>Words</QuietButton>)
  const doMount = (props = {}) => mount(<QuietButton {...props}>Words</QuietButton>)

  it('renders', () => {
    const quietButton = doMount()

    expect(quietButton).toMatchSnapshot()
    quietButton.unmount()
  })

  it('does not allow custom CSS', () => {
    const quietButton = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(quietButton).not.toHaveProp('className', 'my-custom-class')
    expect(quietButton).not.toHaveProp('style')
  })

  it('should contain A11yContent', () => {
    const button = shallow(
      <QuietButton>
        Go home
        <A11yContent>testing</A11yContent>
      </QuietButton>
    )

    expect(button).toContainReact(<A11yContent>testing</A11yContent>)
  })

  it('should contain an interactiveIcon', () => {
    const button = shallow(
      <QuietButton>
        Go home
        <Edit />
      </QuietButton>
    )

    expect(button).toContainReact(<Edit />)
  })

  it('should contain text', () => {
    const button = shallow(<QuietButton>Text</QuietButton>)

    expect(button.text()).toEqual('Text')
  })

  it('should do something when clicked', () => {
    const mockCallBack = jest.fn()
    const button = shallow(<QuietButton onClick={mockCallBack}>Text</QuietButton>)
    button.simulate('click')
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})
