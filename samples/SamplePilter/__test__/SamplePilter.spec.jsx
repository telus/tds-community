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
})
