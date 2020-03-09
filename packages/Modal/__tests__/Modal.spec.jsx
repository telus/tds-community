import React from 'react'
import { mount } from 'enzyme'

import Modal from '../Modal'

describe('Modal', () => {
  const doMount = (props = {}) =>
    mount(
      <Modal
        modalOpen={true}
        heading="A heading"
        bodyText="Are you sure?"
        confirmCTAText="I am sure"
        proceedModalHandler={() => {}}
        {...props}
      />
    )

  it('renders', () => {
    const modal = doMount()

    expect(modal).toMatchSnapshot()
  })

  it('does other things', () => {
    const modal = doMount()

    expect(modal).toExist()
  })

  it('passes additional attributes to the element', () => {
    const modal = doMount({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(modal).toHaveProp('id', 'the-id')
    expect(modal).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const modal = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    }).find('[data-testid="tds-modal-overlay"]')

    expect(modal).not.toHaveProp('className', 'my-custom-class')
    expect(modal).not.toHaveProp('style')
  })

  //   Check if confirm and cancel buttons appear when using Dialogue Modal
  // Check if confirm and close buttons appear when using Content Modal
  // Ensure heading appears using level-3 styles (using level={h3} tag="div" props)
})
