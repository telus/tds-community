import React from 'react'
import { mount } from 'enzyme'

import AddTabs from '../Tabs'

describe('AddTabs', () => {
  const children = (
    <AddTabs copy="en">
      <AddTabs.Panel>Content 1</AddTabs.Panel>
      <AddTabs.Panel>Content 2</AddTabs.Panel>
      <AddTabs.Panel>Content 3</AddTabs.Panel>
    </AddTabs>
  )
  const doMount = () => mount(children)

  it('renders', () => {
    const tabs = doMount()
    expect(tabs).toMatchSnapshot()
  })
  it('does other things', () => {
    const tabs = doMount()
    expect(tabs).toExist()
  })
  it('does not allow custom CSS', () => {
    const tabs = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })
    expect(tabs).not.toHaveProp('className', 'my-custom-class')
    expect(tabs).not.toHaveProp('style')
  })
})
