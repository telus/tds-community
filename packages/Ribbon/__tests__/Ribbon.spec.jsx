import React from 'react'
import { shallow } from 'enzyme'

import Ribbon from '../Ribbon'

describe('Ribbon', () => {
  const doShallow = (
    props = {
      ribbonCopy: 'Prop Text',
    }
  ) => shallow(<Ribbon {...props} />)

  it('matches snapshot with ribbonCopy prop', () => {
    const ribbon = doShallow()
    expect(ribbon).toMatchSnapshot()
  })

  it('matches snapshot with empty ribbonCopy prop', () => {
    const ribbon = doShallow()
    ribbon.setProps({ ribbonCopy: '' })
    expect(ribbon).toMatchSnapshot()
  })

  it('does not allow custom CSS', () => {
    const ribbon = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })
    expect(ribbon).not.toHaveProp('className', 'my-custom-class')
    expect(ribbon).not.toHaveProp('style')
  })
})
