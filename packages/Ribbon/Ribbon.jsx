import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '@tds/core-text'
import { safeRest } from '@tds/util-helpers'

import { colorTelusPurple } from '@tds/core-colours'

const StyledRibbon = styled.div({
  // backgroundColor: colorTelusPurple,
  // padding: '0px 1.5rem 0px 1rem',
  // position: 'relative',
  // display: 'inline-block',
  maxWidth: '100%',
  minWidth: '7.875rem',
  height: '1.5rem',
  fontWeight: 500,
  // '&:after': {
  //   content: '""',
  //   position: 'absolute',
  //   right: '-0.3125rem',
  //   bottom: '-0.5rem',
  //   width: 0,
  //   height: 0,
  //   borderRight: '0.8125rem solid transparent',
  //   borderTop: '1.25rem solid transparent',
  //   borderBottom: '1.25rem solid transparent',
  // },
  '> span': {
    lineHeight: '1 !important',

    padding: '0.35rem 1.75rem 0.25rem 1rem',
    display: 'inline-block',
    height: '1.5rem',
    background: `conic-gradient(from 90deg at 90% 50%,transparent 14%, ${colorTelusPurple} 16%, ${colorTelusPurple} 84%,transparent 86%)`,
  },
})

/**
 * Ribbon component for focusing attention onto a sale or special feature.
 *
 * @version ./package.json
 */
const Ribbon = ({ children, ...rest }) => {
  return (
    <StyledRibbon {...safeRest(rest)}>
      <Text bold invert size="small">
        {children}
      </Text>
    </StyledRibbon>
  )
}

Ribbon.propTypes = {
  /**
   * Ribbon text.
   */
  children: PropTypes.string.isRequired,
}

export default Ribbon
