import styled from 'styled-components'
import { media } from '@tds/core-responsive'

const TabsListMobile = styled.ul({
  ...media.from('md').css({
    display: 'none',
  }),
})

export default TabsListMobile
