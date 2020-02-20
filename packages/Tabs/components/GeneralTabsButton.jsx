import styled from 'styled-components'
import { colorTelusPurple } from '@tds/core-colours'

const GeneralTabsButton = styled.button({
  background: 'none',
  border: 'none',
  color: colorTelusPurple,
  padding: '0 5px',
  minWidth: '32px',
  margin: '0',
  width: '100%',
  height: '100%',
  '&:hover': {
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  '&:focus': {
    zIndex: '10',
    borderRadius: '8px',
    border: '2px solid black',
    outline: 0,
    height: 'calc(100% + 10px)',
    backgroundColor: '#fff',
    '& + *': {
      // do this on the next element
      borderLeft: 0,
    },
  },
})

export default GeneralTabsButton
