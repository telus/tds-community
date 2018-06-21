import React from 'react'
import { shallow } from 'enzyme'

import Progress from '../Progress'

describe('Progress', () => {
  const doShallow = (props = {}) => shallow(<Progress {...props} />)

  it('renders', () => {
    const progress = doShallow()

    expect(progress).toMatchSnapshot()
  })

  it('does other things', () => {
    const progress = doShallow()

    expect(progress).toExist()
  })

  it('passes additional attributes to the element', () => {
    const progress = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(progress).toHaveProp('id', 'the-id')
    expect(progress).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const progress = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(progress).not.toHaveProp('className', 'my-custom-class')
    expect(progress).not.toHaveProp('style')
  })

  it('has a width that is a percentage proportional to its value', () => {
    const progress = doShallow({value:50, max:100}).find('.progress')
    expect(progress).toHaveStyle({width:'50%'})
  })

  it('has a width of 0% if max is 0 or less', () => {
    const progress = doShallow({value:50, max: 0}).find('.progress')
    expect(progress).toHaveStyle({width:'0%'})
  })

  it('has a width of 0% if value is less than 0', () => {
    const progress = doShallow({value:-1, max: 100}).find('.progress')
    expect(progress).toHaveStyle({width:'0%'})
  })
})
