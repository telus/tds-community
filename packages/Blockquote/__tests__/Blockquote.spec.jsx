import React from 'react'
import { mount, shallow } from 'enzyme'

import Blockquote from '../Blockquote'

describe('Blockquote', () => {
  const defaultProps = {
    children: 'This is an example of Blockquote',
  }

  const doMount = (props = {}) => mount(<Blockquote {...defaultProps} {...props} />)

  const doShallow = (props = {}) => shallow(<Blockquote {...defaultProps} {...props} />)

  it('renders', () => {
    const blockQuote = doMount()

    expect(blockQuote).toMatchSnapshot()
  })

  it('does other things', () => {
    const blockQuote = doMount()

    expect(blockQuote).toExist()
  })

  it('passes additional attributes to the element', () => {
    const blockQuote = doMount({ id: 'the-id', 'data-some-attr': 'some value' })

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
