import React from 'react'
import { shallow } from 'enzyme'

import Skeleton, { SIZES } from '../Skeleton'
import styles from '../Skeleton.scss'

const doShallow = (props = {}) => shallow(<Skeleton {...props} />)

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
      const skeleton = doShallow({ size })

      expect(skeleton).toHaveClassName(styles[`size-${SIZES[size]}`])
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

  it('does not allow custom className', () => {
    const skeleton = doShallow({ className: 'my-custom-class' })

    expect(skeleton).not.toHaveProp('className', 'my-custom-class')
  })

  it('does allow custom style', () => {
    const skeleton = doShallow({ style: { color: 'hotpink' } })
    const { style: skeletonStyle } = skeleton.get(0).props

    expect(skeleton).toHaveProp('style')
    expect(skeletonStyle.color).not.toEqual('hotpink')
  })
})
