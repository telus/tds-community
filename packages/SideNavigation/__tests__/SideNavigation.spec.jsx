import React from 'react'
import { mount } from 'enzyme'

import SideNavigation from '../SideNavigation'

describe('SideNavigation', () => {
  const children = (
    <SideNavigation verticalSpacing={3}>
      <SideNavigation.Link href="#">Home</SideNavigation.Link>
      <SideNavigation.Link href="#one">One</SideNavigation.Link>
      <SideNavigation.Link href="#two">Two</SideNavigation.Link>
      <SideNavigation.SubMenu label="Threefdsfdsfds" onClick={() => {}} isOpen={false}>
        <SideNavigation.Link href="#">Option 1</SideNavigation.Link>
        <SideNavigation.Link href="#">Option 2</SideNavigation.Link>
        <SideNavigation.Link href="#">Option 3</SideNavigation.Link>
      </SideNavigation.SubMenu>
    </SideNavigation>
  )

  const doMount = () => mount(children)

  it('renders', () => {
    const sideNavigation = doMount()
    expect(sideNavigation).toMatchSnapshot()
  })

  it('renders without vertical spacing', () => {
    const childrenNoSpacing = (
      <SideNavigation>
        <SideNavigation.Link href="#">Home</SideNavigation.Link>
        <SideNavigation.SubMenu label="Threefdsfdsfds" onClick={() => {}} isOpen={false}>
          <SideNavigation.Link href="#" active>
            Option 1
          </SideNavigation.Link>
        </SideNavigation.SubMenu>
      </SideNavigation>
    )
    const sideNavigationMount = mount(childrenNoSpacing)

    expect(sideNavigationMount).toMatchSnapshot()
  })

  it('toggles open on submenu', () => {
    const sideNavigation = doMount()

    sideNavigation
      .find('SubMenu')
      .find('button')
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual(['TDS-SideNavigation-3'])
    sideNavigation
      .find('SubMenu')
      .find('button')
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual([])
  })

  it('toggles open multiple submenus', () => {
    const childrenAccordionFalse = (
      <SideNavigation accordion={false}>
        <SideNavigation.SubMenu label="Threefdsfdsfds" onClick={() => {}} isOpen={false}>
          <SideNavigation.Link href="#">Option 1</SideNavigation.Link>
        </SideNavigation.SubMenu>
        <SideNavigation.SubMenu label="Threefdsfdsfds" onClick={() => {}} isOpen={false}>
          <SideNavigation.Link href="#">Option 1</SideNavigation.Link>
        </SideNavigation.SubMenu>
      </SideNavigation>
    )
    const sideNavigation = mount(childrenAccordionFalse)

    sideNavigation
      .find('SubMenu')
      .find('button')
      .at(0)
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual(['TDS-SideNavigation-0'])
    sideNavigation
      .find('SubMenu')
      .find('button')
      .at(1)
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual(['TDS-SideNavigation-0', 'TDS-SideNavigation-1'])
    sideNavigation
      .find('SubMenu')
      .find('button')
      .at(0)
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual(['TDS-SideNavigation-1'])
    sideNavigation
      .find('SubMenu')
      .find('button')
      .at(1)
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual([])
  })

  it('toggles does not allow custom props', () => {
    const childrenAccordionFalse = (
      <SideNavigation accordion={false}>
        <SideNavigation.SubMenu
          label="Threefdsfdsfds"
          onClick={() => {}}
          isOpen={false}
          id="321321"
        >
          <SideNavigation.Link href="#">Option 1</SideNavigation.Link>
        </SideNavigation.SubMenu>
        <SideNavigation.Link href="#">Option 2</SideNavigation.Link>
      </SideNavigation>
    )
    const sideNavigation = mount(childrenAccordionFalse)

    sideNavigation
      .find('SubMenu')
      .find('button')
      .at(0)
      .simulate('click')
    expect(sideNavigation.state('open')).toEqual(['TDS-SideNavigation-0'])
  })

  it('does not allow custom CSS', () => {
    const sideNavigation = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(sideNavigation).not.toHaveProp('className', 'my-custom-class')
    expect(sideNavigation).not.toHaveProp('style')
  })

  it('should remove scoll, resize, and click event listeners', () => {
    const sideNavigation = doMount()
    window.removeEventListener = jest.fn()

    sideNavigation.instance().removeEventListeners()
    expect(window.removeEventListener).toHaveBeenCalledTimes(2)
    expect(window.removeEventListener.mock.calls[0]).toContain('scroll')
    expect(window.removeEventListener.mock.calls[1]).toContain('resize')
  })
})
