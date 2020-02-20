import styled from 'styled-components'
import { media } from '@tds/core-responsive'
import { colorTelusPurple, colorWhite } from '@tds/core-colours'

import GeneralTabs from './GeneralTabs'

const TabCurrent = styled(GeneralTabs)({
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

export default TabCurrent
