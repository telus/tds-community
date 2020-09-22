import React from 'react'
import { shallow, mount } from 'enzyme'
import Box from '@tds/core-box'
import Paragraph from '@tds/core-paragraph'
import RadioCard from '../RadioCard'

describe('RadioCard', () => {
  const defaultProps = {
    label: 'The radio',
    name: 'radio_group',
    value: 'the-value',
    width: 200,
    height: 200,
  }
  const doShallow = () =>
    shallow(
      <RadioCard
        label="1 installment payment"
        name="papn"
        value="1payment"
        width={315}
        height={218}
      >
        <Box vertical={3}>
          <Paragraph>$206.50 due August 15, 2020</Paragraph>
        </Box>
      </RadioCard>
    )

  const doMount = (overrides = {}) => {
    const radioCard = mount(
      <RadioCard {...defaultProps} {...overrides}>
        <Box vertical={3}>
          <Paragraph>$206.50 due August 15, 2020</Paragraph>
        </Box>
      </RadioCard>
    )

    const findRadioElement = () => radioCard.find('[data-testid="hidden-input"]').find('input')

    return {
      radioCard,
      findRadioElement,
      findFakeRadio: () => radioCard.find('[data-testid="fake-input"]'),
      label: radioCard.find('label'),
    }
  }

  it('renders', () => {
    const radioCard = doShallow()

    expect(radioCard).toMatchSnapshot()
  })

  it('renders children', () => {
    const { radioCard } = doMount()
    expect(radioCard.find('Paragraph').exists()).toBeTruthy()
    expect(
      radioCard
        .find('Paragraph')
        .children()
        .text()
    ).toEqual('$206.50 due August 15, 2020')
  })

  it('has a fake radio', () => {
    const { findFakeRadio } = doMount()
    expect(findFakeRadio()).toMatchSnapshot()
  })

  it('must have a label', () => {
    const { label } = doMount({ label: 'Some label' })
    expect(label).toMatchSnapshot()
  })

  describe('connecting the label to the radio', () => {
    it('connects the label to the radio', () => {
      const { label, findRadioElement } = doMount()

      expect(label.prop('htmlFor')).toEqual(findRadioElement().prop('id'))
    })

    it('uses the id when provided', () => {
      const { label, findRadioElement } = doMount({
        id: 'the-id',
        name: 'the-radio-group',
        value: 'the-value',
      })

      expect(label).toHaveProp('htmlFor', 'the-id')
      expect(findRadioElement()).toHaveProp('id', 'the-id')
    })

    it('uses the name and the value when no id is provided', () => {
      const { label, findRadioElement } = doMount({ name: 'the-radio-group', value: 'the-value' })

      expect(label).toHaveProp('htmlFor', 'the-radio-group_the-value')
      expect(findRadioElement()).toHaveProp('id', 'the-radio-group_the-value')
    })
  })

  it('passes additional attributes to the radio', () => {
    const { findRadioElement } = doMount({
      'data-some-attr': 'some value',
    })

    expect(findRadioElement()).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const { findRadioElement } = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(findRadioElement()).not.toHaveProp('className', 'my-custom-class')
    expect(findRadioElement()).not.toHaveProp('style')
  })
})
