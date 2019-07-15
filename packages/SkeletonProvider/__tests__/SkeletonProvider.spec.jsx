import React from 'react'
import { shallow } from 'enzyme'
import Heading from '@tds/core-heading'
import Text from '@tds/core-text'
import Image from '@tds/core-image'
import SkeletonProvider from '../SkeletonProvider'

const doShallow = props => shallow(<SkeletonProvider {...props} />)

describe('SkeletonProvider', () => {
  it('should render children as skeletons', () => {
    const skeleton = doShallow({
      children: (
        <div>
          <Heading level="h1" skeleton>
            Hello
          </Heading>
          <Image width={60} height={60} corners="rounded" src="" alt="skeleton image" />
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
          <Image width={60} height={60} corners="rounded" src="" alt="image" />
          <Text skeleton={{ characters: 4, lines: 2 }}>Hello</Text>
        </div>
      ),
    })
    expect(skeleton.render()).toMatchSnapshot()
  })
})
