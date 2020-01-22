import React from 'react'
import { shallow } from 'enzyme'

import Tabs from '../Tabs'

describe('Tabs', () => {
  const doShallow = (props = {}) =>
    shallow(
      <Tabs {...props}>
        <Tabs.Panel tab="Tab 1">Content of Tab Panel 1</Tabs.Panel>
        <Tabs.Panel tab="Tab 2">Content of Tab Panel 2</Tabs.Panel>
      </Tabs>
    )

  it('renders', () => {
    const tabs = doShallow()

    expect(tabs).toMatchSnapshot()
  })

  it('does other things', () => {
    const tabs = doShallow()

    expect(tabs).toExist()
  })

  it('passes additional attributes to the element', () => {
    const tabs = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(tabs).toHaveProp('id', 'the-id')
    expect(tabs).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const tabs = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(tabs).not.toHaveProp('className', 'my-custom-class')
    expect(tabs).not.toHaveProp('style')
  })
})
