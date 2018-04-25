import React from 'react'
import { render, shallow } from 'enzyme'

import SamplePilter from '../SamplePilter'

describe('SamplePilter', () => {
  const doShallow = props => shallow(<SamplePilter {...props}>Android</SamplePilter>)

  it('renders', () => {
    const pilter = render(<SamplePilter>Some Content</SamplePilter>)

    expect(pilter).toMatchSnapshot()
  })

  it('can have custom a11y text', () => {
    const pilter = doShallow({ a11yText: 'Sort by' })

    expect(pilter).toHaveProp('aria-label', 'Sort by Android')
  })

  it('cannot be used to submit forms', () => {
    const pilter = doShallow({ type: 'submit' })

    expect(pilter).toHaveProp('type', 'button')
  })

  it('passes additional attributes to the element', () => {
    const pilter = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(pilter).toHaveProp('id', 'the-id')
    expect(pilter).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const pilter = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(pilter).not.toHaveProp('className', 'my-custom-class')
    expect(pilter).not.toHaveProp('style')
  })
})
