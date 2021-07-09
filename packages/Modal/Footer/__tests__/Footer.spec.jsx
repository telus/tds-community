import React from 'react'
import { mount } from 'enzyme'

import Footer from '../Footer'

describe('Footer', () => {
  const doMount = (props = {}) =>
    mount(
      <Footer
        footerContent={{
          confirmCTAContent: {
            variant: 'standard',
            rank: 'main',
            text: 'Confirm',
          },
          cancelCTAContent: {
            text: 'Cancel',
            variant: 'danger',
            type: 'button',
            showIcon: true,
          },
        }}
        {...props}
      />
    )

  it('renders', () => {
    const footer = doMount()

    expect(footer).toMatchSnapshot()
  })
})
