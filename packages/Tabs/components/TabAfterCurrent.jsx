import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhiteLilac } from '@tds/core-colours'

import GeneralTabs from './GeneralTabs'

const TabAfterCurrent = styled(GeneralTabs)(props => ({
  ...media.from('md').css({
    borderTop: 'none',
    borderBottom: 'none',
    borderRight: '0',
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
      width: 'calc(100% + 2px)',
      height: '8px',
      position: 'absolute',
      left: '-2px',
      top: '100%',
      pointerEvents: 'none' /* this allows you to click through elements */,
      backgroundColor: colorWhiteLilac,
      display: 'inline-block',
      borderLeft: `1px solid ${colorTelusPurple}`,
      borderBottom: `1px solid ${colorTelusPurple}`,
      borderRadius: '0 0 0 8px',
    },
  }),
}))

export default TabAfterCurrent
