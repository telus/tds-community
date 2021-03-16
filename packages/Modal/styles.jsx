import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorWhite, colorAccessibleGreen } from '@tds/core-colours'
import { StyledButton } from '@tds/core-button'
import Box from '@tds/core-box'

export const FullScreenOverlay = styled.div(props => {
  if (props && props.isOpen) {
    return {
      overflow: 'scroll',
      backgroundColor: colorWhite,
      width: '100%',
      height: '100%',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '1400',
      ...media.from('md').css({
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
      }),
    }
  }
  return null
})

export const StyledModal = styled.div(props => {
  const { width } = props
  return {
    height: '100%',
    width: '100%',
    position: 'relative',
    top: '0%',
    left: '0%',
    '> button:first-child': {
      display: 'flex',
      alignSelf: 'flex-end',
      background: 'none',
      border: 'none',
      margin: '1rem 0.5rem',
    },
    ...media.from('md').css({
      margin: '0 auto',
      maxWidth: '736px',
      width: `${width}px`,
      minWidth: '570px',
      height: 'auto',
      borderRadius: '0.25rem',
      boxShadow: '0 0 16px 0 rgba(0,0,0,0.2)',
      zIndex: '2000',
      backgroundColor: colorWhite,
      top: '29%',
    }),
  }
})

export const CTAWrapper = styled.div(props => {
  if (props && !props.cancelCTAExists) {
    return {
      ...media.from('md').css({
        display: 'flex',
        flexFlow: 'row',
        '> button:first-child': {
          marginRight: '1rem',
        },
      }),
    }
  }
  return {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'baseline',
    '> button:first-child': {
      marginBottom: '1rem',
    },
    ...media.from('md').css({
      flexFlow: 'row',
      '> button:first-child': {
        marginRight: '1rem',
        marginBottom: '0rem',
      },
    }),
  }
})

export const PaddingOverride = styled.div({
  '> div:first-child': {
    paddingBottom: '0rem',
  },
})

export const OutlineButton = styled(StyledButton)({
  border: `1px solid ${colorAccessibleGreen}`,
  color: colorAccessibleGreen,
  backgroundColor: colorWhite,
  ':hover': {
    background: colorAccessibleGreen,
    color: colorWhite,
  },
})

export const CloseButtonWrapper = styled.div({
  float: 'right',
  padding: '1rem 1rem 0 0',
  position: 'absolute',
  right: '0%',
  top: '0%',
})

export const ModalWrapper = styled.div({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'space-between',
  height: '100%',
  '> div:first-child': {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-between',
  },
})

export const StyledBox = styled(Box)({
  marginTop: '1rem',
  ...media.from('md').css({
    marginTop: 0,
  }),
})
