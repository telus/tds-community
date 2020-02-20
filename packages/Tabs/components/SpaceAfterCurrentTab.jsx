import styled from 'styled-components'
import { colorTelusPurple, colorWhite } from '@tds/core-colours'

import SpaceAroundTabs from './SpaceAroundTabs'

const SpaceAfterCurrentTab = styled(SpaceAroundTabs)({
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
    display: 'inline-block',
    borderLeft: `1px solid ${colorTelusPurple}`,
    borderBottom: `1px solid ${colorTelusPurple}`,
    borderRadius: '0 0 0 8px',
  },
})

export default SpaceAfterCurrentTab
