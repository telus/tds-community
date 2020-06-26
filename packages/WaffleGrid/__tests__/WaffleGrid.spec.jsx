import React from 'react'
import { shallow } from 'enzyme'

import WaffleGrid from '../WaffleGrid'

describe('WaffleGrid', () => {
  const defaultProps = {
    items: [
      {
        image: 'www.image.com/cool.svg',
        imageAltText: 'Cool image',
        href: 'www.image.com',
        text: 'Cool image',
      },
    ],
  }
  const doShallow = (props = {}) => shallow(<WaffleGrid {...defaultProps} {...props} />)

  it('renders', () => {
    const waffleGrid = doShallow()

    expect(waffleGrid).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const waffleGrid = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(waffleGrid).toHaveProp('id', 'the-id')
    expect(waffleGrid).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const waffleGrid = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(waffleGrid).not.toHaveProp('className', 'my-custom-class')
    expect(waffleGrid).not.toHaveProp('style')
  })
})
