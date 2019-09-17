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
  height: '26px',
  padding: '0',
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
  left: props.switchOn ? '20px' : '3px',
  borderRadius: '18px',
  backgroundColor: 'white',
  transition: 'left 0.25s',
  boxShadow: '0 0 2px 0 #000',
}))

export const Switch = styled.span(props => ({
  position: 'relative',
  top: '2px',
  display: 'inline-block',
  width: '40px',
  height: '24px',
  borderRadius: '24px',
  backgroundColor: props.switchOn ? colorAccessibleGreen : colorGainsboro,
}))

export const InputSwitchWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
})
