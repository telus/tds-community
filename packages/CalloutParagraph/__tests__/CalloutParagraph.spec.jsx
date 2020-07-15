import React from 'react'
import { shallow } from 'enzyme'

import CalloutParagraph from '../CalloutParagraph'

describe('CalloutParagraph', () => {
  const doShallow = (props = {}) => shallow(<CalloutParagraph {...props} />)

  it('renders', () => {
    const calloutParagraph = doShallow()

    expect(calloutParagraph).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const calloutParagraph = doShallow({ bgColor: true, textColor: true })

    expect(calloutParagraph).toHaveProp('bgColor', true)
    expect(calloutParagraph).toHaveProp('textColor', true)
  })
})
