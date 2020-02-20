import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhite } from '@tds/core-colours'

const SpaceBeforeAfterTabs = styled.li({
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

export default SpaceBeforeAfterTabs
