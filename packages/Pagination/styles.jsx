import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhiteLilac } from '@tds/core-colours'

export const PaginationContainer = styled.div({ opacity: '1' })

export const Controls = styled.div({
  clear: 'both',
  display: 'flex',
  marginTop: '20px',
  position: 'relative',
  justifyContent: 'center',
  ...media.from('md').css({
    justifyContent: 'left',
  }),
  width: '100%',
})

const BasePaginationContainer = styled.p({
  color: colorTelusPurple,
  fontSize: '1rem',
  lineHeight: '42px',
  ...media.from('md').css({
    lineHeight: '42px',
    padding: '0 8px 0 4px',
  }),
})

export const PrevPaginationContainer = styled(BasePaginationContainer)(props => ({
  display: !props.showPrevious && 'none',
}))

export const NextPaginationContainer = styled(BasePaginationContainer)(props => ({
  display: !props.showNext && 'none',
}))

export const PaginationButtonStyle = styled.button({
  color: colorTelusPurple,
  backgroundColor: colorWhiteLilac,
  border: 'none',
  width: '44px',
  height: '44px',
  margin: '0',
  textAlign: 'center',
  padding: '0',
  cursor: 'pointer',
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

export const PaginationList = styled.ul({
  ...media.until('md').css({
    display: 'none',
  }),
  display: 'flex',
})

export const PaginationListMobile = styled.ul({
  ...media.from('md').css({
    display: 'none',
  }),
})

export const GeneralPaginationButton = styled.button({
  background: 'none',
  border: 'none',
  color: colorTelusPurple,
  cursor: 'pointer',
  padding: '0 5px',
  minWidth: '32px',
  margin: '0',
  width: 'auto',
  height: '32px',
  ...media.from('md').css({
    minWidth: '22px',
    height: '24px',
  }),
})

export const GeneralPagination = styled.li({
  display: 'inline-block',
  color: colorTelusPurple,
  cursor: 'pointer',
  backgroundColor: colorWhiteLilac,
  height: '44px',
  lineHeight: '41px',
  width: '44px',
  minWidth: '32px',
  ...media.from('md').css({
    display: 'inline-block',
    border: `1px solid ${colorWhiteLilac}`,
    minWidth: '22px',
    '&:hover': {
      border: `1px solid ${colorTelusPurple}`,
    },
  }),
  listStyle: 'none',
  marginRight: '0.5rem',
  textAlign: 'center',
  borderRadius: '4px',
  '&:first-child': {
    marginLeft: '0.5rem',
  },
})

export const PaginationEllipsis = styled(GeneralPagination)({
  display: 'inline-block',
  width: '16px',
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

export const PaginationCurrent = styled(GeneralPagination)({
  color: colorWhiteLilac,
  lineHeight: '40px',
  padding: '0 5px',
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
