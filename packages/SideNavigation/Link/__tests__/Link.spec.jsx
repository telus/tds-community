import React from 'react'
import { shallow } from 'enzyme'

import warn from '../../../../shared/utils/warn'
import Link from '../Link'

jest.mock('../../../../shared/utils/warn')

describe('SideNavigation.Link', () => {
  const children = <Link href="#">Home</Link>
  const doShallow = () => shallow(children)

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    const link = doShallow()

    expect(link).toMatchSnapshot()
  })

  it('renders with active styles', () => {
    const link = shallow(
      <Link href="#" active>
        Home
      </Link>
    )

    expect(link).toMatchSnapshot()
  })

  it('must use `reactRouterLinkComponent` and `to` props together', () => {
    const doShallowLink = (overrides = {}) => shallow(<Link {...overrides}>Go home</Link>)
    const MyLink = () => <span />
    doShallowLink({ reactRouterLinkComponent: MyLink })

    expect(warn).toHaveBeenCalled()

    jest.clearAllMocks()

    const link = doShallowLink({ to: '/about' })

    expect(link).toHaveProp('to')
    expect(warn).toHaveBeenCalled()
  })
})
