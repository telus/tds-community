import React from 'react'
import { shallow } from 'enzyme'

import BlockQuote from '../BlockQuote'

describe('BlockQuote', () => {
  const doShallow = (props = {}) =>
    shallow(<BlockQuote {...props}>This is an example of BlockQuote</BlockQuote>)

  it('renders', () => {
    const blockQuote = doShallow()

    expect(blockQuote).toMatchSnapshot()
  })

  it('does other things', () => {
    const blockQuote = doShallow()

    expect(blockQuote).toExist()
  })

  it('passes additional attributes to the element', () => {
    const blockQuote = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(blockQuote).toHaveProp('id', 'the-id')
    expect(blockQuote).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const blockQuote = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(blockQuote).not.toHaveProp('className', 'my-custom-class')
    expect(blockQuote).not.toHaveProp('style')
  })
})
