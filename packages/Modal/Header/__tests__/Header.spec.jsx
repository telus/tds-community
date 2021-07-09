import React from 'react'
import { mount } from 'enzyme'

import Header from '../Header'

describe('Header', () => {
  const doMount = (props = {}) =>
    mount(
      <Header
        heading={{
          text: 'Mock text',
          level: 'h3',
        }}
        {...props}
      />
    )

  it('renders', () => {
    const header = doMount()

    expect(header).toMatchSnapshot()
  })
})
