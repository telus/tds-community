import styled from 'styled-components'

const RibbonWrapper = styled.div`
  background: #4b286d;
  color: #ffffff;
  padding: 8px 30px 8px 15px;
  margin: 16px 0;
  position: relative;
  font-size: 1rem;
  display: inline-block;
  max-width: 100%;
  min-width: 126px;
  height: 40px;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-right: 13px solid white;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
`

export default RibbonWrapper
