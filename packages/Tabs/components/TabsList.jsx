import styled from 'styled-components'
import { media } from '@tds/core-responsive'

const TabsList = styled.ul({
  ...media.until('md').css({
    display: 'none',
  }),
  display: 'flex',
})

export default TabsList
