import React from 'react'
import styled from 'styled-components'
import { safeRest } from '@tds/util-helpers'
import { small } from '@tds/shared-typography'
import { borders } from '@tds/shared-styles'
import PropTypes from 'prop-types'

const baseButton = {
  boxSizing: 'border-box',
  margin: '2px 0',
  padding: '0px 16px 0px 16px',
  cursor: 'pointer',
  background: '#FFFFFF',
  transition: 'all 0.2s ease-in-out',
  minWidth: '44px',
  height: '28px',
  border: '1px solid #71757B',
  position: 'relative',
  borderRadius: '3px',
  color: '#2A2C2E',
  '&:hover': {
    boxShadow: '0 0 0 2px #71757B',
    midWidth: '72px',
  },
  '&:active': {
    border: '3px solid #54595F',
    background: '#D8D8D8',
  },
  '&:focus': {
    background: '#FFFFFF',
    border: '2px solid white',
    boxShadow: '0 0 0 3px #71757B, 0 0 0 1px #54595F inset',
    outline: 'none !important',
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
  },
}
const btnWrapper = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '3px 0px 5px 0px',
  '& svg': {
    margin: '-3px 0 -5px 0',
  },
}
const spaceWrapper = {
  paddingRight: '4px',
}

const StyledQuietButton = styled.button(baseButton, small, borders.rounded)
const ButtonWrapper = styled.div(btnWrapper)
export const SpaceWrapper = styled.div(spaceWrapper)

/**
 * The quiet button is used for optional actions, and only comes in one variant and size
 * @version ./package.json
 */

const spaceFunction = childrenArray => {
  return childrenArray.map((child, index) => {
    if (child.type && child.type.name !== 'A11yContent' && index === childrenArray.length - 1) {
      return child
    }
    return <SpaceWrapper key={child || child.type.name}>{child}</SpaceWrapper>
  })
}

const QuietButton = ({ children, ...rest }) => {
  if (!children) throw new Error('QuietButton component requires children')
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <StyledQuietButton {...safeRest(rest)}>
      <ButtonWrapper>{spaceFunction(childrenArray)}</ButtonWrapper>
    </StyledQuietButton>
  )
}

QuietButton.propTypes = {
  /**
   * Button children.
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

export default QuietButton
