import styled from 'styled-components'
import { colorAccessibleGreen, colorGainsboro } from '@tds/core-colours'

export const StyledLabel = styled.label({
  display: 'flex',
  justifyContent: 'space-between',
})

StyledLabel.displayName = 'StyledLabel'

/**
 * Button background should only turn green when the `checked` prop is `true`
 */

export const Button = styled.button(props => ({
  appearance: 'none',
  background: 'none',
  boxShadow: 'none',
  position: 'relative',
  border: 'none',
  padding: '0',
  width: '2.5rem',
  height: '1.5rem',
  borderRadius: '1.5rem',
  backgroundColor: props['aria-checked'] ? colorAccessibleGreen : colorGainsboro,
  '&:focus': {
    // this is explicitly defined as 'solid' for IE11 compatibility
    outlineStyle: props.isLoading ? 'none' : 'solid',
    outlineColor: 'rgb(59, 153, 252)',
    outlineWidth: '0.3125rem',
  },
  '&:focus::-moz-focus-inner': {
    border: 0,
  },
}))

export const Slider = styled.span(props => ({
  position: 'absolute',
  width: '1.125rem',
  height: '1.125rem',
  top: '0.1875rem',
  left: props.pressed ? '1.25rem' : '0.1875rem',
  borderRadius: '1.125rem',
  backgroundColor: 'white',
  transition: 'left 0.25s',
  boxShadow: '0 0 2px 0 #000',

  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none !important',
  },
}))

export const InputSwitchWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
})
