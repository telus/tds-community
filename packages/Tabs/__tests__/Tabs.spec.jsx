import React from 'react'
import { mount } from 'enzyme'

import Tabs from '../Tabs'

describe('Tabs', () => {
  const doMount = (props = {}) =>
    mount(
      <Tabs copy="en" {...props}>
        <Tabs.Panel id="1">Content 1</Tabs.Panel>
        <Tabs.Panel id="2">Content 2</Tabs.Panel>
        <Tabs.Panel id="3">Content 3</Tabs.Panel>
      </Tabs>
    )

  it('renders', () => {
    const tabs = doMount()
    expect(tabs).toMatchSnapshot()
    expect(tabs.text()).toContain('Content 1')
  })
  it('does other things', () => {
    const tabs = doMount()
    expect(tabs).toExist()
  })

  it('selects a tab', () => {
    const tabs = doMount({ open: '2' })
    expect(tabs).toHaveProp('open', '2')
    expect(tabs.text()).toContain('Content 2')
    expect(tabs.text()).not.toContain('Content 1')
  })

  it('raises an event when tab clicked', () => {
    const onOpen = jest.fn()
    const tabs = doMount({ open: '1', onOpen })
    tabs
      .find('Tab')
      .at(2)
      .simulate('click')
    expect(tabs.text()).toContain('Content 3')
    expect(onOpen).toHaveBeenCalledWith('3')

    tabs
      .find('Tab')
      .at(1)
      .simulate('click')
    expect(tabs.text()).toContain('Content 2')
    expect(onOpen).toHaveBeenCalledWith('2')
  })
})
