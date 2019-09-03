import React from 'react'
import { shallow, mount } from 'enzyme'
import Heading from '@tds/core-heading'
import Text from '@tds/core-text'
import Image from '@tds/core-image'
import SkeletonProvider from '../SkeletonProvider'

const doShallow = props => shallow(<SkeletonProvider {...props} />)
const doMount = props => mount(<SkeletonProvider {...props} />)

describe('SkeletonProvider', () => {
  it('should render children as skeletons', () => {
    const skeleton = doMount({
      children: (
        <div>
          <Heading level="h1" skeleton>
            Hello
          </Heading>
          <Image width={60} height={60} rounded="corners" src="" alt="skeleton image" skeleton />
          <Text skeleton={{ characters: 4, lines: 2 }}>Hello</Text>
        </div>
      ),
    })
    expect(skeleton.render()).toMatchSnapshot()
  })

  it('should render children as is if the show prop == false', () => {
    const skeleton = doShallow({
      show: false,
      children: (
        <div>
          <Heading level="h1" skeleton>
            Hello
          </Heading>
          <Image width={60} height={60} rounded="corners" src="" alt="image" />
          <Text skeleton={{ characters: 4, lines: 2 }}>Hello</Text>
        </div>
      ),
    })
    expect(skeleton.render()).toMatchSnapshot()
  })

  it('allows additional attributes in skeleton', () => {
    const skeleton = doShallow({
      id: 'some-additiona-id',
      'data-testid': 'some-id-added-for-e2e',
      children: (
        <div>
          <Heading level="h1" skeleton>
            Hello
          </Heading>
          <Image width={60} height={60} rounded="corners" src="" alt="skeleton image" />
          <Text skeleton={{ characters: 4, lines: 2 }}>Hello</Text>
        </div>
      ),
    })

    expect(skeleton).toHaveProp('id', 'some-additiona-id')
    expect(skeleton).toHaveProp('data-testid', 'some-id-added-for-e2e')
  })

  it('does not allow custom CSS', () => {
    const skeleton = doMount({
      children: (
        <div>
          <Heading
            className="custom-heading-class"
            style={{ background: 'red' }}
            level="h1"
            skeleton
          >
            Hello
          </Heading>
          <Image
            className="custom-image-class"
            style={{ background: 'red' }}
            width={60}
            height={60}
            rounded="corners"
            src=""
            alt="skeleton image"
            skeleton
          />
          <Text
            className="custom-text-class"
            style={{ background: 'red' }}
            skeleton={{ characters: 4, lines: 2 }}
          >
            Hello
          </Text>
        </div>
      ),
    })

    expect(
      skeleton
        .find('HeadingSkeleton')
        .find('div')
        .hasClass('custom-heading-class')
    ).toEqual(false)
    expect(skeleton.find('HeadingSkeleton').find('div')).not.toHaveProp('style')

    expect(
      skeleton
        .find('ImageSkeleton')
        .find('div')
        .hasClass('custom-image-class')
    ).toEqual(false)
    expect(skeleton.find('ImageSkeleton').find('div')).not.toHaveProp('style')

    expect(
      skeleton
        .find('TextSkeleton')
        .find('div')
        .first()
        .hasClass('custom-text-class')
    ).toEqual(false)
    expect(
      skeleton
        .find('TextSkeleton')
        .find('div')
        .first()
    ).not.toHaveProp('style')
  })
})
