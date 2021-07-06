import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '@tds/core-text'
import { safeRest } from '@tds/util-helpers'

import { colorTelusPurple } from '@tds/core-colours'

const StyledRibbon = styled.div({
  maxWidth: '100%',
  minWidth: '7rem',
  height: '1.5rem',
  fontWeight: 500,
  backgroundColor: colorTelusPurple,
  padding: '0rem 1rem',
  display: 'inline-block',
  position: 'relative',
  left: '0px',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '0px',
    height: '0px',
    right: '-0.75rem',
    top: '0px',
    borderStyle: 'solid',
    borderColor: `${colorTelusPurple} transparent`,
    borderRadius: '0.0625rem',
    borderWidth: '.75rem',
  },

  '> span': {
    lineHeight: '1 !important',
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
