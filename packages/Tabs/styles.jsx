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
    // borderLeft: props.leftToCurrent && `1px solid ${colorTelusPurple}`,
    // borderRight: props.rightToCurrent && `1px solid ${colorTelusPurple}`,
    lineHeight: '5px',
    // borderRight: `none`,
    // borderBottomLeftRadius: props.rightToCurrent && '8px',
    // borderBottomRightRadius: props.leftToCurrent && '8px',
    ...(props.separator && {
      '&::after': {
        content: '""',
        position: 'absolute',
        right: '0',
        display: 'block',
        height: '50%',
        width: '1px',
        backgroundColor: `${colorTelusPurple}`,
        top: '25%',
      },
    }),
  }),
}))

export const TabBeforeCurrent = styled(GeneralTabs)({
  ...media.from('md').css({
    borderTop: `none`,
    position: 'relative',
    // borderLeft: props.leftToCurrent && `1px solid ${colorTelusPurple}`,
    // borderRight: props.rightToCurrent && `1px solid ${colorTelusPurple}`,
    lineHeight: '5px',
    // borderRight: `none`,
    // borderBottomLeftRadius: props.rightToCurrent && '8px',
    // borderBottomRightRadius: props.leftToCurrent && '8px',
    '&::after': {
      content: '""',
      width: '100%',
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

export const TabAfterCurrent = styled(GeneralTabs)({
  ...media.from('md').css({
    borderTop: `none`,
    position: 'relative',
    // borderLeft: props.leftToCurrent && `1px solid ${colorTelusPurple}`,
    // borderRight: props.rightToCurrent && `1px solid ${colorTelusPurple}`,
    lineHeight: '5px',
    // borderRight: `none`,
    // borderBottomLeftRadius: props.rightToCurrent && '8px',
    // borderBottomRightRadius: props.leftToCurrent && '8px',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: '0',
      display: 'block',
      height: '50%',
      width: '1px',
      backgroundColor: `${colorTelusPurple}`,
      top: '25%',
    },
    '&::before': {
      content: '""',
      width: '100%',
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
})

export const TabCurrent = styled(GeneralTabs)({
  backgroundColor: `${colorWhite}`,
  color: `${colorTelusPurple}`,
  border: `1px solid ${colorTelusPurple}`,
  // borderBottom: `0`,
  borderRadius: '8px 8px 0 0',
  paddingTop: '10px',
  lineHeight: '46px',
  // verticalAlign: 'top',
  padding: '0 0',
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
  height: '44px',
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
  // borderRadius: '0 0 8px 0',
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
  // borderRadius: '0 0 0 8px',
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
    borderRadius: '0 0 8px 0',
  },
})
