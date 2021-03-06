import React from 'react'
import { shallow, mount } from 'enzyme'

import Image from '@tds/core-image'

import Testimonial from '../Testimonial'

describe('Testimonial', () => {
  const doShallow = (props = {}) => shallow(<Testimonial {...props} />)
  const doMount = (props = {}) => mount(<Testimonial {...props} />)

  const props = {
    testimonial:
      "My office is where ever my customers are. TELUS helps me stay connected whether I'm making a sale or doing payroll.",
    image: (
      <Image
        src="image-example.jpg"
        rounded="circle"
        width={60}
        height={60}
        alt="Image of co-workers collaborating"
      />
    ),
    title: 'Dave Smith, Foreman',
    additionalInfo: 'Pinnacle Reforestation',
  }

  it('renders', () => {
    const testimonial = doMount({ ...props })

    expect(testimonial).toMatchSnapshot()
  })

  it('renders without an image', () => {
    const testimonial = doShallow({ ...props, image: null })
    expect(testimonial.find('Image').exists()).toEqual(false)
  })

  it('renders testimonial text as a large paragraph by default', () => {
    const testimonial = doShallow({ ...props })
    expect(testimonial.find('Paragraph').first()).toHaveProp('size', 'large')
  })

  it('renders testimonial text as a level h2 heading when testimonialStyle is heading2', () => {
    const testimonial = doShallow({ ...props, testimonialStyle: 'heading2' })
    expect(testimonial.find('Heading').first()).toHaveProp('level', 'h2')
  })

  it('renders with an image', () => {
    const testimonial = doShallow({ ...props })
    expect(testimonial.find('Image').exists()).toEqual(true)
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
