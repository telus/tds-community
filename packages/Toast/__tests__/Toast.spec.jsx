import React from 'react'
import { shallow } from 'enzyme'

import Toast from '../Toast'

const STYLE_VARIANTS = {
  DEFAULT: 'default',
  TOAST: 'toast',
  LIGHT: 'light',
}
const headline = 'Limited time offer.'
const copy = 'Save $100 when you shop online'
const link = {
  href: 'https://www.telus.com',
  text: 'Learn now',
}

const { TOAST, LIGHT } = STYLE_VARIANTS

describe('Toast', () => {
  const doShallow = (props = {}) => shallow(<Toast copy={copy} {...props} />)

  it('renders', () => {
    const toast = doShallow()

    expect(toast).toMatchSnapshot()
  })

  it('does not allow custom CSS', () => {
    const toast = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(toast).not.toHaveProp('className', 'my-custom-class')
    expect(toast).not.toHaveProp('style')
  })

  it('should render properly with both copy and link provided', () => {
    const toast = doShallow(link)
    expect(toast).toMatchSnapshot()
  })

  it('should render properly with headline, copy and link provided', () => {
    const updatedProp = {
      headline,
      link,
    }
    const toast = doShallow(updatedProp)
    expect(toast).toMatchSnapshot()
  })

  it('should render properly with toast variant', () => {
    const updatedProp = {
      headline,
      link,
      variant: TOAST,
    }
    const toast = doShallow(updatedProp)
    expect(toast).toMatchSnapshot()
  })

  it('should render properly with light variant', () => {
    const updatedProp = {
      headline,
      link,
      variant: LIGHT,
    }
    const toast = doShallow(updatedProp)
    expect(toast).toMatchSnapshot()
  })
})
