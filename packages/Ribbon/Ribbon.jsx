import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Text from '@tds/core-text'
import { safeRest } from '@tds/util-helpers'

import { colorTelusPurple, colorGreyAthens, colorWhite } from '@tds/core-colours'

const StyledRibbon = styled.div(({ variant }) => ({
  backgroundColor: colorTelusPurple,
  padding: '0px 1.5rem 0px 1rem',
  position: 'relative',
  display: 'inline-block',
  maxWidth: '100%',
  minWidth: '7.875rem',
  height: '1.5rem',
  fontWeight: 500,
  '&:after': {
    content: '""',
    position: 'absolute',
    right: '-0.3125rem',
    bottom: '-0.5rem',
    width: 0,
    height: 0,
    borderRight:
      variant === 'alt' ? `0.8125rem solid ${colorGreyAthens}` : `0.8125rem solid ${colorWhite}`,
    borderTop: '1.25rem solid transparent',
    borderBottom: '1.25rem solid transparent',
  },
  '> span': {
    lineHeight: '1 !important',
  },
}))

/**
 * Ribbon component for focusing attention onto a sale or special feature.
 *
 * @version ./package.json
 */
const Ribbon = ({ children, variant, ...rest }) => {
  return (
    <StyledRibbon {...safeRest(rest)} variant={variant}>
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
  variant: PropTypes.string.isRequired,
}

export default Ribbon
