import React from 'react'
import { mount } from 'enzyme'

import Tabs from '../Tabs'

describe('Tabs', () => {
  const children = (
    <Tabs copy="en">
      <Tabs.Panel>Content 1</Tabs.Panel>
      <Tabs.Panel>Content 2</Tabs.Panel>
      <Tabs.Panel>Content 3</Tabs.Panel>
    </Tabs>
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
