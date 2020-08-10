import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { responsiveProps } from '@tds/util-prop-types'

import handleResponsiveStyles from './handleResponsiveStyles'

/**
 * The Below component is used to add spacing below a component where that spacing is not equal to the top spacing
 * The default spacing if no props are passed is box-spacing 8 (64px in mobile, 96px in desktop)
 * @version ./package.json
 * @visibleName Below (beta)
 */
const spacing = {
  mobile: {
    0: '0rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '1rem',
    4: '1.5rem',
    5: '2rem',
    6: '2.5rem',
    7: '3rem',
    8: '4rem',
  },
  desktop: {
    0: '0rem',
    1: '0.25rem',
    2: '0.5rem',
    3: '1rem',
    4: '2rem',
    5: '3rem',
    6: '4rem',
    7: '4.5rem',
    8: '6rem',
  },
}

export const convertToRem = (level, breakpoint) => {
  if (['xs', 'sm'].indexOf(breakpoint) !== -1) {
    return spacing.mobile[level]
  }
  return spacing.desktop[level]
}

const belowStyles = props =>
  handleResponsiveStyles({ space: props.space }, ({ space }, breakpoint) => {
    if (space === undefined) {
      return undefined
    }

    const rem = convertToRem(space, breakpoint)

    return {
      marginBottom: rem,
    }
  })

const BelowComponent = styled.div(belowStyles)

const Below = forwardRef((props, ref) => <BelowComponent {...props} ref={ref} />)

Below.displayName = 'Below'

Below.propTypes = {
  /**
   * Indent the spacing that is added by the Below component.
   *
   * One of: `0,1,2,3,4,5,6,7,8` as a [**responsive prop**](#responsiveProps). Default is
   * 8, as this element is designed for page bottom spacing.
   */
  space: responsiveProps(PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8])),
}

Below.defaultProps = {
  space: 8,
}

export default Below
