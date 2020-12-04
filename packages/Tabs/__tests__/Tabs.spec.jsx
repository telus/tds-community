import React from 'react'
import { mount } from 'enzyme'

import Tabs from '../Tabs'

describe('Tabs', () => {
  const doMount = (props = {}) =>
    mount(
      <Tabs copy="en" {...props}>
        <Tabs.Panel>Content 1</Tabs.Panel>
        <Tabs.Panel>Content 2</Tabs.Panel>
        <Tabs.Panel>Content 3</Tabs.Panel>
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
    const tabs = doMount({ selectedIndex: 1 })
    expect(tabs).toHaveProp('selectedIndex', 1)
    expect(tabs.text()).toContain('Content 2')
    expect(tabs.text()).not.toContain('Content 1')
  })

  it('raises an event when tab clicked', () => {
    const onSelect = jest.fn()
    const tabs = doMount({ onSelect })
    tabs
      .find('Tab')
      .at(2)
      .simulate('click')
    expect(tabs.text()).toContain('Content 3')
  })

  it('stretches', () => {
    const tabs = doMount()
    expect(tabs.find('FlexContainer').length).toBe(3)

    const tabs1 = doMount({ stretch: true })
    expect(tabs1).toHaveProp('stretch', true)
    expect(tabs1.find('FlexContainer').length).toBe(2)
  })
})
