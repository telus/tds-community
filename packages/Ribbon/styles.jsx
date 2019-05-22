import styled from 'styled-components'

const RibbonWrapper = styled.div`
  background: #4b286d;
  color: #ffffff;
  padding: 0px 30px 0px 11px;
  margin: 16px 0;
  position: relative;
  font-size: 16px;
  display: inline-block;
  max-width: 100%;
  min-width: 126px;
  height: 24px;
  font-weight: 500;
  &:after {
    content: '';
    position: absolute;
    right: -1px;
    bottom: -8px;
    width: 0;
    height: 0;
    border-right: 13px solid white;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
  }
`

export default RibbonWrapper
