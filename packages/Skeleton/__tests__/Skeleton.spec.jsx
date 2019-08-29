import React from 'react'
import { shallow, mount } from 'enzyme'

import Skeleton, { SIZES } from '../Skeleton'

const doShallow = (props = {}) => shallow(<Skeleton {...props} />)
const doMount = (props = {}) => mount(<Skeleton {...props} />)

describe('Skeleton', () => {
  it('renders', () => {
    const skeleton = doShallow()

    expect(skeleton).toExist()
    expect(skeleton).toMatchSnapshot()
  })

  it('should set correct class based on size attribute, for all sizes', () => {
    const sizes = Object.keys(SIZES)

    expect.assertions(sizes.length)
    sizes.forEach(size => {
      const skeleton = doMount({ size })

      expect(skeleton).toMatchSnapshot()
    })
  })

  it('passes additional attributes to the element', () => {
    const skeleton = doShallow({
      id: 'the-id-but-not-in-the-freudian-sense',
      'data-test': 'automated-e2e-ftw',
    })

    expect(skeleton).toHaveProp('id', 'the-id-but-not-in-the-freudian-sense')
    expect(skeleton).toHaveProp('data-test', 'automated-e2e-ftw')
  })

  it('does not allow custom CSS', () => {
    const skeleton = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(skeleton).not.toHaveProp('className', 'my-custom-class')
    expect(skeleton).not.toHaveProp('style')
  })
})
