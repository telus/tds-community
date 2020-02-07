import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorWhite } from '@tds/core-colours'

export const FullScreenOverlay = styled.div(props => {
  if (props && props.modalOpen) {
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

export const StyledModal = styled.div({
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
    maxWidth: '570px',
    maxHeight: '330px',
    minHeight: '330px',
    borderRadius: '0.25rem',
    boxShadow: '0 0 16px 0 rgba(0,0,0,0.2)',
    zIndex: '2000',
    backgroundColor: colorWhite,
    top: '29%',
  }),
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

export const CloseButtonWrapper = styled.div({
  float: 'right',
  padding: '1rem 1rem 0 0',
  position: 'absolute',
  right: '0%',
  top: '0%',
})

export const ModalWrapper = styled.div({
  height: '100%',
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'space-between',
  padding: '3rem',
  overflow: 'scroll',
})
