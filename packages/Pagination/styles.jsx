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
  padding: '0 4px 0 0',
  fontSize: '1rem',
  lineHeight: '16px',
  ...media.from('md').css({
    lineHeight: '22px',
    padding: '0 8px 0 4px',
  }),
})

export const PrevPaginationContainer = styled(BasePaginationContainer)(props => ({
  visibility: props.showPrevious ? 'visible' : 'hidden',
}))

export const NextPaginationContainer = styled(BasePaginationContainer)(props => ({
  visibility: props.showNext ? 'visible' : 'hidden',
}))

export const PaginationButtonStyle = styled.button({
  color: colorTelusPurple,
  backgroundColor: colorWhiteLilac,
  border: 'none',
  width: '32px',
  height: '32px',
  margin: '0',
  textAlign: 'center',
  padding: '0',
  cursor: 'pointer',
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

export const PaginationList = styled.ul({ display: 'flex' })

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
  backgroundColor: colorWhiteLilac,
  height: '32px',
  lineHeight: '29px',
  width: 'auto',
  minWidth: '32px',
  ...media.from('md').css({
    border: `1px solid ${colorWhiteLilac}`,
    minWidth: '22px',
    height: '24px',
    lineHeight: '24px',
    '&:hover': {
      border: `1px solid ${colorTelusPurple}`,
    },
  }),
  listStyle: 'none',
  marginRight: '4px',
  textAlign: 'center',
})

export const PaginationEllipsis = styled(GeneralPagination)({
  width: '16px',
  minWidth: '16px',
  backgroundColor: 'inherit',
  lineHeight: '22px',
  border: 'none',
  ...media.from('md').css({
    lineHeight: '15px',
    border: 'none',
    '&:hover': { border: 'none' },
  }),
})

export const PaginationCurrent = styled(GeneralPagination)({
  color: colorWhiteLilac,
  lineHeight: '31px',
  padding: '0 5px',
  backgroundColor: colorTelusPurple,
  ...media.from('md').css({
    border: `1px solid ${colorTelusPurple}`,
    lineHeight: '23px',
    minWidth: '24px',
  }),
})

export const PanelContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
})
