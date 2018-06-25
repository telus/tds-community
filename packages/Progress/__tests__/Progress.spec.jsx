import React from 'react'
import { shallow } from 'enzyme'

import Progress from '../Progress'

describe('Progress', () => {
  const doShallow = (props = {}) =>
    shallow(
      <Progress {...props}>
        <Progress.Bar percentage={0} />
      </Progress>
    )

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
})
