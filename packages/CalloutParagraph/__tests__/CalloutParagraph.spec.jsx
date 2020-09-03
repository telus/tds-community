import React from 'react'
import { shallow } from 'enzyme'

import CalloutParagraph from '../CalloutParagraph'

describe('CalloutParagraph', () => {
  const doShallow = (props = {}) => shallow(<CalloutParagraph {...props} />)

  it('renders', () => {
    const calloutParagraph = doShallow()

    expect(calloutParagraph).toMatchSnapshot()
    expect(calloutParagraph).toHaveProp('spacing', 'default')
  })

  it('renders with narrow', () => {
    const calloutParagraph = doShallow({ spacing: 'narrow' })
    expect(calloutParagraph).toMatchSnapshot()
    expect(calloutParagraph).toHaveProp('spacing', 'narrow')
  })

  it('renders with compact', () => {
    const calloutParagraph = doShallow({ spacing: 'compact' })
    expect(calloutParagraph).toMatchSnapshot()
    expect(calloutParagraph).toHaveProp('spacing', 'compact')
  })

  it('renders with intermediate', () => {
    const calloutParagraph = doShallow({ spacing: 'intermediate' })
    expect(calloutParagraph).toMatchSnapshot()
    expect(calloutParagraph).toHaveProp('spacing', 'intermediate')
  })
})
