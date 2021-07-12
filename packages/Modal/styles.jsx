import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorWhite, colorAccessibleGreen, colorGreyRaven } from '@tds/core-colours'
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

export const HeaderWrapper = styled.div({
  // paddingTop: '1rem',
})

export const ContentWrapper = styled.div(({ offsetHeight, showHeaderDivider, showFooter }) => {
  const updatedHeight = showHeaderDivider ? offsetHeight : offsetHeight - 16

  return {
    margin: '0 -2rem',
    padding: '0 2rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: `calc(100vh - ${updatedHeight}px - 10rem)`,
    marginTop: 0,
    ...media
      .from('xs')
      .until('md')
      .css({
        maxHeight: `calc(100vh - ${updatedHeight}px - ${showFooter ? 6 : 5}rem)`,
      }),
  }
})

export const LinkWrapper = styled.div({
  cursor: 'pointer',
  marginTop: '1rem',
  '> a': {
    textDecoration: 'underline',
  },
  ...media
    .from('xs')
    .until('md')
    .css({
      marginTop: 0,
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
})

export const FooterWrapper = styled.div({
  // marginTop: '1rem',
  ...media.from('md').css({
    marginBottom: '-1rem',
  }),
})

export const HairlineDividerWrapper = styled.div({
  margin: '0 -2rem',
})

export const NotificationWrapper = styled.div({
  backgroundColor: colorGreyRaven,
  borderRadius: '4px',
  padding: '0 0.5rem',
  height: '1.5rem',
  span: {
    color: colorWhite,
    fontWeight: 'bold',
  },
})
