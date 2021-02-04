import React from 'react'
import { shallow, mount } from 'enzyme'
import 'jest-styled-components'

import Image from '@tds/core-image'
import WebVideo from '@tds/core-web-video'

import PreviewCard from '../PreviewCard'

describe('PreviewCard', () => {
  const doShallow = (props = {}) => shallow(<PreviewCard {...props} />)

  const requiredProps = {
    body: 'Hello world!',
    media: {
      type: 'image',
      content: (
        <Image
          src="blog-example.jpg"
          alt="Image of co-workers collaborating"
          width={300}
          height={300}
        />
      ),
    },
    href: '#',
  }

  it('renders with only Required props', () => {
    const previewCard = doShallow({ ...requiredProps })

    expect(previewCard).toMatchSnapshot()
  })

  it('renders with header', () => {
    const previewCard = doShallow({
      ...requiredProps,
      header: 'development \u00B7 April 1st, 2019',
    })

    expect(previewCard).toMatchSnapshot()
  })

  it('renders with footer', () => {
    const previewCard = doShallow({ ...requiredProps, footer: 'By Halo' })

    expect(previewCard).toMatchSnapshot()
  })

  it('renders with all props', () => {
    const previewCard = doShallow({
      ...requiredProps,
      header: 'development \u00B7 April 1st, 2019',
      footer: 'By Halo',
    })

    expect(previewCard).toMatchSnapshot()
  })

  it('renders deprecated image', () => {
    const previewCard = shallow(
      <PreviewCard
        image={
          <Image
            src="blog-example.jpg"
            alt="Image of co-workers collaborating"
            width={300}
            height={300}
          />
        }
      />
    )

    expect(previewCard).toMatchSnapshot()
  })

  it('renders media when type is image', () => {
    const previewCard = shallow(
      <PreviewCard
        media={{
          type: 'image',
          content: (
            <Image
              src="blog-example.jpg"
              alt="Image of co-workers collaborating"
              width={300}
              height={300}
            />
          ),
        }}
      />
    )

    expect(previewCard).toMatchSnapshot()
  })

  it('renders media when type is video', () => {
    const previewCard = shallow(
      <PreviewCard
        media={{
          type: 'video',
          content: (
            <WebVideo
              videoId="video-id"
              videoLength={30}
              aspectRatio="4:3"
              defaultVolume={70}
              copy="en"
            />
          ),
        }}
      />
    )

    expect(previewCard).toMatchSnapshot()
  })

  it('renders with long body text', () => {
    const previewCard = shallow(
      <PreviewCard
        media={{
          type: 'image',
          content: (
            <Image
              src="blog-example.jpg"
              alt="Image of co-workers collaborating"
              width={300}
              height={300}
            />
          ),
        }}
        body="Hello world, this preview card has all the props and has text that is over 70 characters in length"
        href="#"
      />
    )

    expect(previewCard).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const props = {
      ...requiredProps,
      id: 'the-id',
      'data-some-attr': 'some value',
    }
    const previewCard = mount(<PreviewCard {...props} />)

    expect(previewCard).toHaveProp('id', 'the-id')
    expect(previewCard).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const previewCard = doShallow({
      ...requiredProps,
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    })

    expect(previewCard).not.toHaveProp('className', 'my-custom-class')
    expect(previewCard).not.toHaveProp('style')
  })

  it('renders with line height of 21px', () => {
    const previewCard = mount(
      <PreviewCard
        header="development \u00B7 April 1st, 2019"
        footer="By Halo"
        {...requiredProps}
      />
    ).find('[data-testid="contentContainer"]')

    expect(previewCard).toHaveStyleRule('line-height', '21px')
  })
})
