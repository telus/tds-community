import React from 'react'
import { shallow } from 'enzyme'

import Bar from '../Bar'

describe('Progress', () => {
  const defaultProps = { percentage: 3, a11yLabel: 'Data Usage' }
  const doShallow = (overrides = {}) => shallow(<Bar {...defaultProps} {...overrides} />)

  it('renders', () => {
    const progressBar = doShallow()

    expect(progressBar).toMatchSnapshot()
  })

  it('does other things', () => {
    const progressBar = doShallow()

    expect(progressBar).toExist()
  })

  it('passes additional attributes to the element', () => {
    const progressBar = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(progressBar).toHaveProp('id', 'the-id')
    expect(progressBar).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const progressBar = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(progressBar).not.toHaveProp('className', 'my-custom-class')
    expect(progressBar).not.toHaveProp('style', { color: 'hotpink' })
  })

  it('has a width that is a percentage proportional to its value', () => {
    const progressBar = doShallow({ percentage: 50 })
    expect(progressBar).toMatchSnapshot()
  })

  it('has a width of 5% if value is equal or less than 5', () => {
    const progressBar = doShallow({ percentage: 5 })
    expect(progressBar).toMatchSnapshot()
  })
})
