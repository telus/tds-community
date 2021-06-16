import React from 'react'
import { shallow, mount } from 'enzyme'

import StoryCard from '../StoryCard'

describe('StoryCard', () => {
  const allProps = {
    storyType: 'Article',
    date: 'May 11th, 2021',
    title: 'Crisis Text Line provides mental health support for youth during lockdown',
    description: 'With the help of a Foundation grant',
    imgUrl: 'blog-example.jpg',
    href: 'kids-help-line',
  }
  const doShallow = () => shallow(<StoryCard {...allProps} />)

  it('renders with all props', () => {
    const storyCard = doShallow()

    expect(storyCard).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const props = {
      ...allProps,
      id: 'the-id',
      'data-some-attr': 'some value',
    }
    const previewCard = mount(<StoryCard {...props} />)

    expect(previewCard).toHaveProp('id', 'the-id')
    expect(previewCard).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const storyCard = doShallow({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(storyCard).not.toHaveProp('className', 'my-custom-class')
    expect(storyCard).not.toHaveProp('style')
  })

  it('renders without required prop', () => {
    const allRequiredProps = {
      storyType: undefined,
      date: undefined,
      title: 'Crisis Text Line provides mental health support for youth during lockdown',
      description: 'With the help of a Foundation grant',
      imgUrl: 'blog-example.jpg',
      href: 'kids-help-line',
    }
    const doShallowRequiredProps = () => shallow(<StoryCard {...allRequiredProps} />)
    const storyCard = doShallowRequiredProps()

    expect(storyCard).toMatchSnapshot()
  })
})
