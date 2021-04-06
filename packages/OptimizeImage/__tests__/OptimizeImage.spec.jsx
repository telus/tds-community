import React from 'react'
import { mount } from 'enzyme'

import OptimizeImage from '../OptimizeImage'
import checkWebpFeature from '../checkWebpFeature'

jest.mock('../checkWebpFeature')

describe('OptimizeImage', () => {
  beforeEach(() => {
    checkWebpFeature.mockImplementation(res => res(true))
  })

  const doMount = (props = {}) =>
    mount(
      <OptimizeImage
        contentfulAssetUrl="https://images.ctfassets.net/Alpaca.jpg"
        alt="test-image"
        {...props}
      />
    )

  it('renders', () => {
    const optimizeImage = doMount()
    expect(optimizeImage).toMatchSnapshot()
  })

  it('passes additional attributes to the element', () => {
    const optimizeImage = doMount({ id: 'the-id', 'data-some-attr': 'some value' })

    expect(optimizeImage).toHaveProp('id', 'the-id')
    expect(optimizeImage).toHaveProp('data-some-attr', 'some value')
  })

  it('does not allow custom CSS', () => {
    const optimizeImage = doMount({
      className: 'my-custom-class',
      style: { color: 'hotpink' },
    }).find('ResponsiveImage')

    expect(optimizeImage).not.toHaveProp('className', 'my-custom-class')
    expect(optimizeImage).not.toHaveProp('style')
  })

  it('should not alter the url if it is an svg', () => {
    const optimizeImage = doMount({
      contentfulAssetUrl: 'https://images.ctfassets.net/Alpaca.svg',
    }).find('ResponsiveImage')

    expect(optimizeImage).toHaveProp('xsSrc', 'https://images.ctfassets.net/Alpaca.svg')
  })

  it('should format with webp if browser supports it', () => {
    const optimizeImage = doMount({
      contentfulAssetUrl: 'https://images.ctfassets.net/Alpaca.jpg',
    }).find('ResponsiveImage')

    expect(optimizeImage).toHaveProp(
      'xsSrc',
      'https://images.ctfassets.net/Alpaca.jpg?w=320&q=80&fm=webp'
    )
  })

  it('should format with progressive jpg if browser does not support webp', () => {
    checkWebpFeature.mockImplementation(res => res(false))

    const optimizeImage = doMount({
      contentfulAssetUrl: 'https://images.ctfassets.net/Alpaca.jpeg',
    }).find('ResponsiveImage')

    expect(optimizeImage).toHaveProp(
      'xsSrc',
      'https://images.ctfassets.net/Alpaca.jpeg?w=320&q=80&fm=jpg&fl=progressive'
    )
  })
})
