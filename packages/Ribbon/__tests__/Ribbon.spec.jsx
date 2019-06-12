import React from 'react'
import { shallow, mount } from 'enzyme'

import Ribbon from '../Ribbon'

describe('Ribbon', () => {
  const doShallow = props => shallow(<Ribbon {...props}>I am a ribbon</Ribbon>)

  it('renders', () => {
    const ribbon = mount(<Ribbon>2 year plan</Ribbon>)
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
