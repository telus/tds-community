import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhiteLilac } from '@tds/core-colours'

import GeneralTabs from './GeneralTabs'

const TabBeforeCurrent = styled(GeneralTabs)({
  ...media.from('md').css({
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: '0',
    position: 'relative',
    lineHeight: '5px',
    paddingTop: '6px',
    '&::after': {
      content: '""',
      width: 'calc(100% + 0.125rem)',
      height: '8px',
      position: 'absolute',
      right: '-0.125rem',
      top: '100%',
      pointerEvents: 'none' /* this allows you to click through elements */,
      backgroundColor: colorWhiteLilac,
      display: 'inline-block',
      borderRight: `1px solid ${colorTelusPurple}`,
      borderBottom: `1px solid ${colorTelusPurple}`,
      borderRadius: '0 0 8px 0',
    },
  }),
})

export default TabBeforeCurrent
