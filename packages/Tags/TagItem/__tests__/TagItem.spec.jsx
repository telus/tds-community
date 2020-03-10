import React from 'react'
import { shallow, mount } from 'enzyme'

import TagItem from '../TagItem'

describe('TagItem', () => {
  const defaultProps = {
    children: 'Android',
    onClick: () => {},
  }
  const doShallow = (props = {}) => shallow(<TagItem {...defaultProps} {...props} />)
  const doMount = (props = {}) => mount(<TagItem {...defaultProps} {...props} />)

  it('renders', () => {
    const tagItem = doMount()

    expect(tagItem).toMatchSnapshot()
  })

  it('renders with a button with role="switch"', () => {
    const tagItem = doShallow()
    expect(tagItem).toHaveProp('role', 'switch')
  })

  it('renders with a pressed state when isLoading is true', () => {
    const tagItem = doMount({ isLoading: true })
    expect(tagItem).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const tagItem = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(tagItem).toHaveProp('id', 'the-id')
    expect(tagItem).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const tagItem = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(tagItem).not.toHaveProp('className', 'my-custom-class')
    expect(tagItem).not.toHaveProp('style')
  })
})
