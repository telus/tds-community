import styled, { css } from 'styled-components'

export const TabsContainer = styled.div`
  overflow: hidden;
  padding-top: 6px;
  > div {
    position: relative;
  }
  .react-tabs__tab-list {
    padding: 1px 0;
  }
  .react-tabs__tab {
    display: inline-block;
    cursor: pointer;
    padding: 8px 10px 0;
    margin: 0 14px;
    min-width: 44px;
    text-align: center;
    position: relative;
    &:first-child {
      margin-left: 2px;
    }

    &:hover {
      h4 {
        text-shadow: 0px 0px 1px #2a2c2e;
        border-bottom: 4px solid #d8d8d8;
      }
    }

    &:active,
    &.react-tabs__tab--selected {
      h4 {
        text-shadow: 0px 0px 1px #2a2c2e;
        border-bottom: 4px solid #71747a;
      }
    }
    &:focus {
      box-shadow: 0 0 0 2px #979797;
      border-radius: 4px;
      outline: none;
      h4 {
        border-bottom: none;
      }
    }
  }

  .react-tabs__tab-panel {
    display: none;

    &.react-tabs__tab-panel--selected {
      display: block;
    }
  }
`

export const TabListContainer = styled.div`
  position: relative;
  transition: 0.9s all ease;
  padding-right: 24px;
  transform: translate(${props => props.positionToMove}px);
  white-space: nowrap;
`

export const TabLabel = styled.h4`
  height: 100%;
  display: block;
  padding-bottom: 8px;
  border-bottom: 4px solid transparent;
`

export const TabArrows = styled.div`
  position: absolute;
  top: 8px;
  z-index: 10;
  padding: 5px 0;
  cursor: pointer;
  &:focus {
    outline: none;
    div {
      box-shadow: 0 0 0 2px #979797;
      border-radius: 4px;
      margin: 0 2px;
    }
  }
  ${props =>
    props.direction === 'left' &&
    css`
      left: 0;
      padding-right: 7px;
    `};

  ${props =>
    props.direction === 'right' &&
    css`
      right: 0;
      padding-left: 7px;
    `};
`
export const ArrowInner = styled.div`
  background: #fff;
  ${props =>
    props.direction === 'left' &&
    css`
      border-right: 1px solid #d8d8d8;
    `};

  ${props =>
    props.direction === 'right' &&
    css`
      border-left: 1px solid #d8d8d8;
    `};
`
