import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhiteLilac, colorWhite, colorShark } from '@tds/core-colours'

export const TabsContainer = styled.div({ opacity: '1' })

export const Controls = styled.div({
  clear: 'both',
  display: 'flex',
  marginTop: '20px',
  position: 'relative',
  justifyContent: 'center',
  ...media.from('md').css({
    justifyContent: 'flex-start',
  }),
  width: '100%',
})

export const TabsList = styled.ul({
  ...media.until('md').css({
    display: 'none',
  }),
  display: 'flex',
})

export const TabsListMobile = styled.ul({
  ...media.from('md').css({
    display: 'none',
  }),
})

export const GeneralTabsButton = styled.button({
  background: 'none',
  border: 'none',
  color: colorTelusPurple,
  padding: '0 5px',
  minWidth: '32px',
  margin: '0',
  width: '100%',
  height: '100%',
  '&:hover': {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
})

export const GeneralTabs = styled.li({
  display: 'inline-block',
  color: colorShark,
  backgroundColor: colorWhiteLilac,
  height: '44px',
  lineHeight: '41px',
  width: '140px',
  minWidth: '64px',
  listStyle: 'none',
  textAlign: 'center',
  borderRadius: '0',
  position: 'relative',
  '&:first-child': {
    marginLeft: '0.5rem',
  },
  ...media.from('md').css({
    display: 'inline-block',
    lineHeight: '44px',
    border: `1px solid ${colorWhiteLilac}`,
    minWidth: '22px',
    borderBottom: `1px solid ${colorTelusPurple}`,
  }),
})

export const TabNotCurrent = styled(GeneralTabs)(props => ({
  ...media.from('md').css({
    borderTop: `none`,
    position: 'relative',
    lineHeight: '5px',
    height: '52px',
    ...(props.separator && {
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '0',
        display: 'block',
        height: '55%',
        width: '1px',
        backgroundColor: `${colorTelusPurple}`,
        top: '25%',
      },
    }),
  }),
}))

export const TabBeforeCurrent = styled(GeneralTabs)({
  ...media.from('md').css({
    borderTop: 'none',
    borderBottom: 'none',
    position: 'relative',
    lineHeight: '5px',
    paddingTop: '6px',
    '&::after': {
      content: '""',
      width: '102%',
      height: '8px',
      position: 'absolute',
      right: '-1px',
      top: '100%',
      pointerEvents: 'none' /* this allows you to click through elements */,
      backgroundColor: colorWhiteLilac,
      display: 'inline - block',
      borderRight: `1px solid ${colorTelusPurple}`,
      borderBottom: `1px solid ${colorTelusPurple}`,
      borderRadius: '0 0 8px 0',
    },
  }),
})

export const TabAfterCurrent = styled(GeneralTabs)(props => ({
  ...media.from('md').css({
    borderTop: 'none',
    borderBottom: 'none',
    position: 'relative',
    lineHeight: '5px',
    paddingTop: '6px',
    ...(props.separator && {
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '0',
        display: 'block',
        height: '65%',
        width: '1px',
        backgroundColor: `${colorTelusPurple}`,
        top: '25%',
      },
    }),
    '&::before': {
      content: '""',
      width: '102%',
      height: '8px',
      position: 'absolute',
      left: '-1px',
      top: '100%',
      pointerEvents: 'none' /* this allows you to click through elements */,
      backgroundColor: colorWhiteLilac,
      display: 'inline - block',
      borderLeft: `1px solid ${colorTelusPurple}`,
      borderBottom: `1px solid ${colorTelusPurple}`,
      borderRadius: '0 0 0 8px',
    },
  }),
}))

export const TabCurrent = styled(GeneralTabs)({
  backgroundColor: `${colorWhite}`,
  color: `${colorTelusPurple}`,
  border: `1px solid ${colorTelusPurple}`,
  borderRadius: '8px 8px 0 0',
  lineHeight: '46px',
  padding: '0 0',
  paddingTop: '3px',
  fontWeight: 'bold',
  ...media.from('md').css({
    borderTop: `1px solid ${colorTelusPurple}`,
    borderLeft: `1px solid ${colorTelusPurple}`,
    borderRight: `1px solid ${colorTelusPurple}`,
    borderBottom: `none`,
    minWidth: '24px',
    '&::before': {
      content: '',
      width: 'auto',
      height: '100 %',
      borderBottom: `1px solid ${colorTelusPurple}`,
    },
    '&::after': {
      content: '',
      width: 'auto',
      height: '100 %',
      borderBottom: `1px solid ${colorTelusPurple}`,
    },
  }),
})

export const SpaceBeforeAfterTabs = styled.li({
  display: 'inline-block',
  backgroundColor: `${colorWhite}`,
  height: '52px',
  lineHeight: '41px',
  width: '64px',
  minWidth: '32px',
  listStyle: 'none',
  textAlign: 'center',
  borderBottom: `1px solid ${colorTelusPurple}`,
  ...media.until('md').css({
    display: 'none',
  }),
})

export const SpaceBeforeCurrentTab = styled(SpaceBeforeAfterTabs)({
  position: 'relative',
  height: '44px',
  borderBottom: 'none',
  '&::after': {
    content: '""',
    width: '100%',
    height: '8px',
    position: 'absolute',
    right: '-1px',
    top: '100%',
    pointerEvents: 'none' /* this allows you to click through elements */,
    backgroundColor: `${colorWhite}`,
    display: 'inline - block',
    borderRight: `1px solid ${colorTelusPurple}`,
    borderBottom: `1px solid ${colorTelusPurple}`,
    borderRadius: '0 0 8px 0',
  },
})

export const SpaceAfterCurrentTab = styled(SpaceBeforeAfterTabs)({
  position: 'relative',
  height: '44px',
  borderBottom: 'none',
  '&::before': {
    content: '""',
    width: '100%',
    height: '8px',
    position: 'absolute',
    left: '-1px',
    top: '100%',
    pointerEvents: 'none' /* this allows you to click through elements */,
    backgroundColor: `${colorWhite}`,
    display: 'inline - block',
    borderLeft: `1px solid ${colorTelusPurple}`,
    borderBottom: `1px solid ${colorTelusPurple}`,
    borderRadius: '0 0 0 8px',
  },
})
