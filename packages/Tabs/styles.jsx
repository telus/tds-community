import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhiteLilac } from '@tds/core-colours'

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

const BaseTabsContainer = styled.p({
  color: colorTelusPurple,
  fontSize: '1rem',
  lineHeight: '42px',
  ...media.from('md').css({
    lineHeight: '42px',
    padding: '0 8px 0 4px',
  }),
})

export const PrevTabsContainer = styled(BaseTabsContainer)(props => ({
  display: !props.showPrevious && 'none',
}))

export const NextTabsContainer = styled(BaseTabsContainer)(props => ({
  display: !props.showNext && 'none',
}))

export const TabsButtonStyle = styled.button({
  color: colorTelusPurple,
  backgroundColor: colorWhiteLilac,
  border: 'none',
  width: '44px',
  height: '44px',
  margin: '0',
  textAlign: 'center',
  padding: '0',
  borderRadius: '4px',
  ...media.from('md').css({
    background: 'none',
    width: 'auto',
    height: 'auto',
  }),
})

export const ButtonLabel = styled.span({
  display: 'none',
  ...media.from('md').css({ display: 'inline-block' }),
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
})

export const GeneralTabs = styled.li({
  display: 'inline-block',
  color: colorTelusPurple,
  backgroundColor: colorWhiteLilac,
  height: '44px',
  lineHeight: '41px',
  width: '140px',
  minWidth: '64px',
  '&:hover': {
    border: `1px solid ${colorTelusPurple}`,
  },
  listStyle: 'none',
  marginRight: '0.5rem',
  textAlign: 'center',
  borderRadius: '4px',
  '&:first-child': {
    marginLeft: '0.5rem',
  },
  ...media.from('md').css({
    display: 'inline-block',
    lineHeight: '44px',
    border: `1px solid ${colorWhiteLilac}`,
    minWidth: '22px',
  }),
})

export const TabsEllipsis = styled(GeneralTabs)({
  display: 'inline-block',
  width: '16px',
  height: '32px',
  minWidth: '16px',
  backgroundColor: 'inherit',
  lineHeight: '28px',
  marginRight: '0.25rem',
  marginLeft: '-0.25rem',
  border: 'none',
  ...media.from('md').css({
    border: 'none',
    '&:hover': { border: 'none' },
  }),
})

export const TabsCurrent = styled(GeneralTabs)({
  color: colorWhiteLilac,
  lineHeight: '46px',
  verticalAlign: 'bottom',
  padding: '0 5px',
  border: 'none',
  '&:hover': { border: 'none' },
  backgroundColor: colorTelusPurple,
  ...media.from('md').css({
    border: `1px solid ${colorTelusPurple}`,
    minWidth: '24px',
  }),
})

export const PanelContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
})
