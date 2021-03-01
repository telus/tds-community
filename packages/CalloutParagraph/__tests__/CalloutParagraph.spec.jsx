import React from 'react'
import { shallow } from 'enzyme'
import { Deals } from '@tds/core-decorative-icon'

import CalloutParagraph from '../CalloutParagraph'

describe('CalloutParagraph', () => {
  const defaultProps = { children: 'Text' }

  const doShallow = props => shallow(<CalloutParagraph {...defaultProps} {...props} />)

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

  it('renders an icon', () => {
    const calloutParagraph = doShallow({ icon: Deals })
    expect(calloutParagraph).toMatchSnapshot()
    expect(calloutParagraph.find('DecorativeIcon')).toExist()
  })

  it('specifies text align', () => {
    const calloutParagraph = doShallow({ textAlign: 'center' })
    expect(calloutParagraph).toMatchSnapshot()
    expect(calloutParagraph).toHaveProp('textAlign', 'center')
  })
})
