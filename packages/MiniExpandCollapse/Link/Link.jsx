import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { buttons } from '@tds/shared-styles'
import { small, medium, large } from '@tds/shared-typography'
import { colorGreyShark, colorWhite, colorGainsboro, colorGreyRaven } from '@tds/core-colours'
import { CaretDown, CaretUp } from '@tds/core-interactive-icon'
import { responsiveProps } from '@tds/util-prop-types'
import A11yContent from '@tds/core-a11y-content'
import { handleResponsiveStyles } from '@tds/util-helpers'
import createIconSizeProp from '../createIconSizeProp'

const states = ({ invert }) => {
  return {
    '&:hover': {
      textDecoration: 'none',
    },
    '&:active': {
      color: invert && colorGainsboro,
      backgroundColor: invert ? 'rgba(0,0,0,0.4)' : colorGainsboro,
      borderRadius: '0.25rem',
      padding: '0.125rem',
      margin: '-0.125rem',
      textDecoration: 'underline',
    },
    '&:focus': {
      border: `0.125rem solid ${invert ? colorWhite : colorGreyRaven}`,
      padding: '0.125rem',
      margin: '-0.25rem',
      borderRadius: '0.25rem',
      outline: 'none',
    },
  }
}

const titleSize = props =>
  handleResponsiveStyles({ size: props.size }, ({ size }) => {
    if (size === 'small') {
      return small
    } else if (size === 'medium') {
      return medium
    }
    return large
  })

const LinkButton = styled.button(
  buttons.noStyle,
  states,
  titleSize,
  {
    color: colorGreyShark,
    textDecoration: 'underline',
    textAlign: 'left',
    '& > svg': {
      verticalAlign: 'middle',
      marginLeft: '0.25rem',
      marginRight: '-0.25rem',
    },
  },
  ({ invert, context }) => {
    if (context.inheritColor) {
      return {
        color: 'inherit',
      }
    }
    if (invert) {
      return {
        color: colorWhite,
      }
    }
    return {}
  }
)

const Link = (
  { expandTitle, collapseTitle, isPanelOpen, togglePanel, size, invert, a11yLabel },
  context
) => {
  const handleClick = e => {
    e.preventDefault()
    togglePanel()
  }

  return (
    <LinkButton
      type="button"
      onClick={handleClick}
      size={size}
      invert={invert}
      context={context}
      a11yLabel={a11yLabel}
    >
      {isPanelOpen && expandTitle ? expandTitle : collapseTitle}
      {a11yLabel && <A11yContent>{a11yLabel}</A11yContent>}
      {isPanelOpen ? (
        <CaretUp variant={invert ? 'inverted' : 'basic'} size={createIconSizeProp(size)} />
      ) : (
        <CaretDown variant={invert ? 'inverted' : 'basic'} size={createIconSizeProp(size)} />
      )}
    </LinkButton>
  )
}

Link.propTypes = {
  expandTitle: PropTypes.string,
  collapseTitle: PropTypes.string.isRequired,
  isPanelOpen: PropTypes.bool.isRequired,
  togglePanel: PropTypes.func.isRequired,
  size: responsiveProps(PropTypes.oneOf(['small', 'medium', 'large'])).isRequired,
  invert: PropTypes.bool,
  a11yLabel: PropTypes.string,
}

Link.defaultProps = {
  expandTitle: null,
  invert: undefined,
  a11yLabel: undefined,
}

export default Link
