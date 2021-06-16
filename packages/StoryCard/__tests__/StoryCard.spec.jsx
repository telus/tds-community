import React from 'react'
import { shallow, mount } from 'enzyme'

import StoryCard from '../StoryCard'

describe('StoryCard', () => {
  const defaultProps = {
    storyType: 'Article',
    date: 'May 11th, 2021',
    title: 'Crisis Text Line provides mental health support for youth during lockdown',
    description: 'With the help of a Foundation grant',
    imgUrl: 'blog-example.jpg',
    slug: 'kids-help-line',
  }
  const doShallow = () => shallow(<StoryCard {...defaultProps} />)

  it('renders', () => {
    const storyCard = doShallow()

    expect(storyCard).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const props = {
      ...defaultProps,
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
})
