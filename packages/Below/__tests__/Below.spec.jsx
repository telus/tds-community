import React from 'react'
import { shallow } from 'enzyme'

import Below, { convertToRem } from '../Below'
import handleResponsiveStyle from '../handleResponsiveStyles'

describe('convertToRem', () => {
  it('works for phone screens', () => {
    const rem = convertToRem(8, 'xs')
    expect(rem).toEqual('4rem')
  })
  it('works for big screens', () => {
    const rem = convertToRem(7, 'md')
    expect(rem).toEqual('4.5rem')
  })
})

describe('handleResponsiveStyle', () => {
  const props = {
    space: { xs: 8 },
  }
  const styleFn = ({ space }, breakpoint) => {
    if (space === undefined) {
      return undefined
    }

    const rem = convertToRem(space, breakpoint)

    return { marginBottom: rem }
  }

  it('returns styles based on media size', () => {
    const styles = handleResponsiveStyle(props, styleFn)
    expect(styles).toEqual({
      '@media (max-width: 767px)': {
        marginBottom: '4rem',
      },
      '@media (min-width: 768px)': {
        marginBottom: '6rem',
      },
    })
  })
})

describe('Below', () => {
  const doShallow = (props = {}) => shallow(<Below {...props} />)

  it('renders', () => {
    const props = {
      space: 4,
    }
    const below = doShallow(props)

    expect(below).toMatchSnapshot()
  })

  it('defaults to size 8', () => {
    const below = doShallow()
    expect(below).toHaveProp('space', 8)
  })

  it('handles responsive props', () => {
    const below = doShallow({ space: { xs: 3, md: 4 } })
    expect(below).toHaveProp('space', { xs: 3, md: 4 })
    expect(below).toMatchSnapshot()
  })
})
