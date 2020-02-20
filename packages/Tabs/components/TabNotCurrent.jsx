import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple } from '@tds/core-colours'

import GeneralTabs from './GeneralTabs'

const TabNotCurrent = styled(GeneralTabs)(props => ({
  ...media.from('md').css({
    borderTop: `none`,
    borderLeft: '0',
    borderRight: '0',
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

export default TabNotCurrent
