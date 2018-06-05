import React from 'react'
import { shallow } from 'enzyme'

import Skeleton, { SIZES, VARIANTS } from '../Skeleton'
import styles from '../Skeleton.scss'

const doShallow = (props = {}) => shallow(<Skeleton {...props} />)

describe('Skeleton', () => {
  it('renders', () => {
    const skeleton = doShallow()

    expect(skeleton).toExist()
    expect(skeleton).toMatchSnapshot()
  })

  it('should have default size when attribute not specified', () => {
    const skeleton = doShallow()

    expect(skeleton).toHaveClassName(styles['variant-default'])
  })

  it('should set correct class based on size attribute, for all sizes', () => {
    const sizes = Object.keys(SIZES)

    expect.assertions(sizes.length)
    sizes.forEach(size => {
      const skeleton = doShallow({ size })
      expect(skeleton).toHaveClassName(styles[`size-${SIZES[size]}`])
    })
  })

  it('should have default size when invalid attribute specified', () => {
    const invalidSize = 'rubbish'
    const skeleton = doShallow({ size: invalidSize })

    expect(skeleton).toHaveClassName(styles['variant-default'])
  })

  it('should have default variant when attribute not specified', () => {
    const skeleton = doShallow()

    expect(skeleton).toHaveClassName(styles['size-18'])
  })

  it('should set correct class based on size attribute, for all sizes', () => {
    const variants = Object.keys(VARIANTS)

    expect.assertions(variants.length)
    variants.forEach(variant => {
      const skeleton = doShallow({ variant })

      expect(skeleton).toHaveClassName(styles[`variant-${VARIANTS[variant]}`])
    })
  })

  it('should have default size when invalid attribute specified', () => {
    const invalidVariant = 'nonsense'
    const skeleton = doShallow({ variant: invalidVariant })

    expect(skeleton).toHaveClassName(styles['variant-default'])
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
