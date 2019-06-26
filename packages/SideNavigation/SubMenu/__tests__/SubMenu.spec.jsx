import React from 'react'
import { mount } from 'enzyme'

import SideNavigation from '../../SideNavigation'

describe('SideNavigation.SubMenu', () => {
  const onClickFunction = jest.fn()
  const SubMenu = (
    <SideNavigation.SubMenu
      active
      label="Threefdsfdsfds"
      id="Three"
      onClick={onClickFunction}
      isOpen={false}
    >
      <SideNavigation.Link href="#">Option 1</SideNavigation.Link>
      <SideNavigation.Link href="#">Option 2</SideNavigation.Link>
      <SideNavigation.Link href="#">Option 3</SideNavigation.Link>
    </SideNavigation.SubMenu>
  )

  const SideNav = (
    <SideNavigation>
      <SideNavigation.SubMenu
        label="Threefdsfdsfds"
        id="Three"
        onClick={onClickFunction}
        isOpen={false}
      >
        <SideNavigation.Link href="#">Option 1</SideNavigation.Link>
        <SideNavigation.Link href="#">Option 2</SideNavigation.Link>
        <SideNavigation.Link href="#">Option 3</SideNavigation.Link>
      </SideNavigation.SubMenu>
    </SideNavigation>
  )

  it('renders', () => {
    const subMenu = mount(SubMenu)

    expect(subMenu).toMatchSnapshot()
  })

  it('calls onClick and internal click function', () => {
    const sideNav = mount(SideNav)

    sideNav.find('button').simulate('click')

    expect(onClickFunction).toHaveBeenCalledTimes(1)
    expect(sideNav.state('open')).toEqual(['TDS-SideNavigation-0'])

    sideNav.find('button').simulate('click')

    expect(onClickFunction).toHaveBeenCalledTimes(2)
    expect(sideNav.state('open')).toEqual([])
  })
})
