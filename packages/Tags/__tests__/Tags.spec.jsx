import React from 'react'
import { shallow, mount } from 'enzyme'
import A11yContent from '@tds/core-a11y-content'
import Tags from '../Tags'

describe('Tags', () => {
  const defaultProps = {
    copy: 'en',
    tags: [
      {
        children: 'Android',
        isSelected: false,
        isLoading: false,
      },
      {
        children: 'iOS',
        isSelected: false,
        isLoading: false,
      },
    ],
    onClick: () => {},
  }
  const doShallow = (props = {}) => shallow(<Tags {...defaultProps} {...props} />)
  const doMount = (props = {}) => mount(<Tags {...defaultProps} {...props} />)

  it('renders', () => {
    const tags = doMount()

    expect(tags).toMatchSnapshot()
  })

  it('renders when using the children prop', () => {
    const tags = doMount({
      tags: undefined,
      children: [
        <Tags.Item key="android">Android</Tags.Item>,
        <Tags.Item key="ios">iOS</Tags.Item>,
      ],
    })

    expect(tags).toMatchSnapshot()
  })

  it('renders isSelected', () => {
    const tags = doMount({
      tags: [
        {
          children: 'Android',
          isSelected: false,
          isLoading: false,
        },
        {
          children: 'iOS',
          isSelected: true,
          isLoading: false,
        },
      ],
    })

    expect(tags).toMatchSnapshot()
  })

  it('renders A11yContent', () => {
    const tags = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    const a11yContent = tags.find(A11yContent)
    expect(a11yContent).toExist()
  })

  it('adds aria-describedby to each TagItem', () => {
    const tags = doShallow()

    const a11yContent = tags.find(A11yContent)

    const a11yContentId = a11yContent.props().id
    const buttons = tags.find(Tags.Item)
    buttons.forEach(button => {
      expect(button.props()['aria-describedby']).toBe(a11yContentId)
    })
  })

  it('calls onClick with the children parameter', () => {
    const onClickSpy = jest.fn()
    const tags = doMount({ onClick: onClickSpy })
    const firstButton = tags.find(Tags.Item).first()
    firstButton.simulate('click')

    expect(onClickSpy).toHaveBeenCalledWith('Android')
  })

  it('passes additional attributes to the element', () => {
    const tags = doShallow({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(tags).toHaveProp('id', 'the-id')
    expect(tags).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const tags = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(tags).not.toHaveProp('className', 'my-custom-class')
    expect(tags).not.toHaveProp('style')
  })
})
