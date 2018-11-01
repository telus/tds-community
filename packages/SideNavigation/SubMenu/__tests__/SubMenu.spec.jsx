import React from 'react'
import { shallow } from 'enzyme'

import SubMenu from '../SubMenu'
import Link from '../../Link/Link'

describe('SideNavigation.SubMenu', () => {
  const children = (
    <SubMenu active label="Threefdsfdsfds" id="Three" onClick={() => {}} isOpen={false}>
      <Link href="#">Option 1</Link>
      <Link href="#">Option 2</Link>
      <Link href="#">Option 3</Link>
    </SubMenu>
  )
  const doShallow = () => shallow(children)

  it('renders', () => {
    const subMenu = doShallow()

    expect(subMenu).toMatchSnapshot()
  })
})
