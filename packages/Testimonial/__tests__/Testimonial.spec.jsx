import React from 'react'
import { shallow } from 'enzyme'

import Testimonial from '../Testimonial'

describe('Testimonial', () => {
  const doShallow = (props = {}) => shallow(<Testimonial {...props} />)

  const props = {
    testimonial:
      "My office is where ever my customers are. TELUS helps me stay connected whether I'm making a sale or doing payroll.",
    imgAlt: 'Robot Avatar',
    imgSrc: '//via.placeholder.com/60x60',
    title: 'Dave Smith, Foreman',
    additionalInfo: 'Pinnacle Reforestation',
  }

  it('renders', () => {
    const testimonial = doShallow({ ...props })

    expect(testimonial).toMatchSnapshot()
  })

  it('does other things', () => {
    const testimonial = doShallow({ ...props })

    expect(testimonial).toExist()
  })

  it('renders without an image', () => {
    const testimonial = doShallow({ ...props, imgSrc: null })
    expect(
      testimonial.find({ dangerouslyAddClassName: 'testimonial-author' }).children().length
    ).toEqual(1)
  })

  it('renders with an image', () => {
    const testimonial = doShallow({ ...props })
    expect(
      testimonial.find({ dangerouslyAddClassName: 'testimonial-author' }).children().length
    ).toEqual(2)
  })

  it('passes additional attributes to the element', () => {
    const testimonial = doShallow({ id: 'the-id', 'data-some-attr': 'some value', ...props })

    expect(testimonial).toHaveProp('id', 'the-id')
    expect(testimonial).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const testimonial = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
      ...props,
    })

    expect(testimonial).not.toHaveProp('className', 'my-custom-class')
    expect(testimonial).not.toHaveProp('style')
  })
})
