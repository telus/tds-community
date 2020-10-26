import React from 'react'
import styled from 'styled-components'
import Box from '@tds/core-box'
import {
  colorGreyRaven,
  colorWhite,
  colorGreyShuttle,
  colorGreyGainsboro,
  colorGreyShark,
} from '@tds/core-colours'
import { componentWithName } from '@tds/util-prop-types'
import { safeRest } from '@tds/util-helpers'
import { small } from '@tds/shared-typography'
import { borders } from '@tds/shared-styles'
import PropTypes from 'prop-types'

const baseButton = {
  boxSizing: 'border-box',
  margin: '0.125rem',
  padding: '0rem',
  cursor: 'pointer',
  background: colorWhite,
  transition: 'all 0.2s ease-in-out',
  minWidth: '2.75rem',
  minHeight: '1.75rem',
  border: `0.0625rem solid ${colorGreyRaven}`,
  position: 'relative',
  borderRadius: '0.1875rem',
  color: colorGreyShark,
  '&:hover': {
    boxShadow: `0 0 0 0.125rem ${colorGreyRaven}`,
    midWidth: '4.5rem',
  },
  '&:active': {
    border: `0.0625rem solid ${colorGreyShuttle}`,
    boxShadow: `0 0 0 0.125rem ${colorGreyShuttle}`,
    background: colorGreyGainsboro,
  },
  '&:focus': {
    background: colorWhite,
    boxShadow: `0 0 0 0.125rem ${colorGreyRaven}, 0 0 0 0.125rem ${colorWhite} inset, 0 0 0 0.1875rem ${colorGreyShuttle} inset`,
    outline: 'none !important',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
  },
}
const btnWrapper = {
  display: 'flex',
  flexDirection: 'row',
  padding: '0.1875rem 0rem 0.3125rem 0rem',
  '& svg': {
    margin: '-0.0625rem 0rem -0.4375rem 0rem',
  },
}
const spaceWrapper = {
  paddingRight: '0.25rem',
}

const StyledQuietButton = styled.button(baseButton, small, borders.rounded)
const ButtonWrapper = styled.div(btnWrapper)
const SpaceWrapper = styled.div(spaceWrapper)

const spaceFunction = childrenArray => {
  return childrenArray.map((child, index) => {
    if ((child.type && child.type.name === 'A11yContent') || index === childrenArray.length - 1) {
      return child
    }
    return <SpaceWrapper key={child || child.type.name}>{child}</SpaceWrapper>
  })
}
/**
 * The quiet button is used for optional actions, and only comes in one variant and size
 * @version ./package.json
 * @visibleName QuietButton (beta)
 */

const QuietButton = ({ children, ...rest }) => {
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <StyledQuietButton type="button" {...safeRest(rest)}>
      <Box horizontal={3}>
        <ButtonWrapper>{spaceFunction(childrenArray)}</ButtonWrapper>
      </Box>
    </StyledQuietButton>
  )
}

QuietButton.propTypes = {
  /**
   * Button children.
   */

  children: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        componentWithName('A11yContent'),
        componentWithName('Dependent', true),
      ])
    ),
    PropTypes.string,
  ]).isRequired,
}

export default QuietButton
