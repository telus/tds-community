import React from 'react'
import { mount } from 'enzyme'

import Footer from '../Footer'
import { CANCELLATION_BUTTON_TYPES, BUTTON_VARIANTS } from '../../configs'

describe('Footer', () => {
  const handleClose = jest.fn()
  const handleConfirm = jest.fn()

  const doMount = (props = {}) =>
    mount(
      <Footer
        cancelButtonText="Cancel"
        cancelButtonType={CANCELLATION_BUTTON_TYPES.LINK_WITHOUT_ICON}
        confirmButtonText="Confirm"
        confirmButtonVariant={BUTTON_VARIANTS.STANDARD}
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        {...props}
      />
    )

  it('renders', () => {
    const footer = doMount()

    expect(footer).toMatchSnapshot()
  })
})
