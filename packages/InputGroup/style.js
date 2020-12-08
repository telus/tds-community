import styled from 'styled-components'

export const LabelStyle = styled.label(() => ({
  span: {
    fontSize: '14px',
    color: '#2A2C2E',
    display: 'block',
  },
}))

export const InputGroupStyle = styled.div(({ hasValue }) => ({
  display: 'inline-flex',
  flexWrap: 'nowrap',
  height: '52px',
  width: '100%',
  maxWidth: '768px',
  minWidth: '384px',
  borderRadius: '5px',
  '&:hover': {
    boxShadow: '0 0 0 1px #4B286D',
    input: {
      borderColor: '#4B286D',
    },
  },
  input: {
    marginLeft: 0,
    height: '100%',
    borderLeft: '1px solid #D8D8D8',
    borderTop: '1px solid #D8D8D8',
    borderBottom: '1px solid #D8D8D8',
    borderRight: 'none',
    borderRadius: '4px 0 0 4px',
    color: '#2A2C2E',
    flexGrow: 1,
    marginRight: hasValue ? '-52px' : '0',
    textIndent: '15px',
    '&::-ms-clear': {
      display: 'none',
    },
    '&::placeholder': {
      color: '#71757B',
    },
    '&:active': {
      borderColor: '#4B286D',
    },
    '&:focus': {
      borderColor: '#4B286D',
    },
  },
  button: {
    height: '100%',
    width: '52px',
    cursor: 'pointer',
    '&:last-child': {
      backgroundColor: '#462C6A',
      borderLeft: 'none',
      borderTop: '1px solid #462C6A',
      borderRight: '1px solid #462C6A',
      borderBottom: '1px solid #462C6A',
      borderRadius: '0 4px 4px 0',
      i: {
        color: '#FFFFFF',
      },
    },
  },
  'input:focus, button:last-child:focus': {
    outlineWidth: '4px',
    outlineStyle: 'solid',
    outlineColor: 'rgba(75, 40, 109, 0.5)',
    outlineOffset: '1px',
    '-moz-outline-radius': '8px',
  },
}))
