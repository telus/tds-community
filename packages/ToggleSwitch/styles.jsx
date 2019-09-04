import styled from 'styled-components'
import { colorAccessibleGreen, colorGainsboro, colorShuttleGrey } from '@tds/core-colours'

export const HiddenInput = styled.input({
  opacity: '0',
  '&:focus': {
    boxShadow: `0 0 4px 1px ${colorShuttleGrey}`,
  },
})

export const Slider = styled.span(props => ({
  position: 'absolute',
  width: '18px',
  height: '18px',
  top: '2px',
  left: props.switchOn ? '24px' : '2px',
  borderRadius: '18px',
  backgroundColor: 'white',
  transition: 'left 0.25s',
}))

export const Switch = styled.span(props => ({
  cursor: props.switchDisabled ? 'not-allowed' : 'pointer',
  display: 'inline-block',
  visibility: props.switchOn && props.isLoading ? 'hidden' : 'none',
  width: '44px',
  minWidth: '44px',
  height: '22px',
  borderRadius: '22px',
  backgroundColor: props.switchOn ? colorAccessibleGreen : colorGainsboro,
  position: 'absolute',
  top: '3px',
}))

export const InputSwitchWrapper = styled.span({ display: 'flex' })

export const SwitchWrapper = styled.span({
  display: 'flex',
  alignItems: 'flex-start',
  position: 'relative',
})

export const SpinnerWrapper = styled.div(props => ({
  position: 'absolute',
  display: props.switchOn ? 'block' : 'none',
  top: '-11px',
  left: '-1px',
}))
