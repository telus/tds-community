import React from 'react'
import { shallow } from 'enzyme'

import Modal from '../Modal'

describe('Modal', () => {
  const doShallow = (props = {}) => shallow(<Modal {...props} />)

  it('renders', () => {
    const modal = doShallow()

    expect(modal).toMatchSnapshot()
  })

  it('does other things', () => {
    const modal = doShallow()

    expect(modal).toExist()
  })

  it('passes additional attributes to the element', () => {
    const modal = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(modal).toHaveProp('id', 'the-id')
    expect(modal).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const modal = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(modal).not.toHaveProp('className', 'my-custom-class')
    expect(modal).not.toHaveProp('style')
  })
})
