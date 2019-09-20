import styled from 'styled-components'
import { colorAccessibleGreen, colorGainsboro } from '@tds/core-colours'

export const StyledLabel = styled.label({
  display: 'flex',
  justifyContent: 'space-between',
})

StyledLabel.displayName = 'StyledLabel'

export const Button = styled.button(props => ({
  appearance: 'none',
  background: 'none',
  boxShadow: 'none',
  position: 'relative',
  border: 'none',
  padding: '0',
  top: '2px',
  width: '40px',
  height: '24px',
  borderRadius: '24px',
  backgroundColor: props['aria-checked'] ? colorAccessibleGreen : colorGainsboro,
  '&:focus': {
    outline: props.isLoading ? 'none' : 'auto',
    outlineColor: 'rgb(59, 153, 252)',
    outlineWidth: '5px',
  },
}))

export const Slider = styled.span(props => ({
  position: 'absolute',
  width: '18px',
  height: '18px',
  top: '3px',
  left: props.pressed ? '20px' : '3px',
  borderRadius: '18px',
  backgroundColor: 'white',
  transition: 'left 0.25s',
  boxShadow: '0 0 2px 0 #000',
}))

export const InputSwitchWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
})
