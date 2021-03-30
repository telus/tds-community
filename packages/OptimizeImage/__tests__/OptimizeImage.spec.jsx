import React from 'react'
import { shallow } from 'enzyme'

import OptimizeImage from '../OptimizeImage'

describe('OptimizeImage', () => {
  const doShallow = (props = {}) => shallow(<OptimizeImage {...props} />)

  it('renders', () => {
    const optimizeImage = doShallow()

    expect(optimizeImage).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const optimizeImage = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(optimizeImage).toHaveProp('id', 'the-id')
    expect(optimizeImage).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const optimizeImage = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(optimizeImage).not.toHaveProp('className', 'my-custom-class')
    expect(optimizeImage).not.toHaveProp('style')
  })
})
