import styled, { css } from 'styled-components'

export const TabsContainer = styled.div`
  overflow: hidden;
  padding-top: 6px;
  > div {
    position: relative;
  }
  .react-tabs__tab-list {
    padding: 2px 0 0 0;
  }
  .react-tabs__tab {
    display: inline-block;
    cursor: pointer;
    padding: 8px 10px 1px;
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
      outline: none;
    }
  }

  .react-tabs__tab-panel {
    display: none;

    &.react-tabs__tab-panel--selected {
      display: block;
      margin-top: 0;
    }
  }

  ${props =>
    props.wrapLabels &&
    css`
      .react-tabs__tab-list {
        display: flex;
        position: relative;
      }

      .react-tabs__tab {
        max-width: 180px;
        flex: 0 0 auto;
        display: flex;
        white-space: initial;

        h4 {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    `}
`

export const TabBorder = styled.div`
  overflow-x: hidden;
  position: relative;
`

export const TabListOuterContainer = styled.div`
  display: flex;
  position: relative;
  overflow: hidden;
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
  padding: 8px 0px 4px 0;
  border-bottom: 4px solid transparent;
`

export const TabArrows = styled.div`
  position: absolute;
  top: 0;
  padding: 2px 0;
  z-index: 10;
  height: calc(100% - 8px);
  display: flex;
  align-items: stretch;
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
  display: flex;
  align-items: center;
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

export const TabLabelContainer = styled.button`
  border: none;
  background-color: #fff;
  color: inherit;
  text-decoration: inherit;
  padding: 1px 8px;
  border: 2px solid transparent;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: ${props => (props.isActive ? 'transparent' : 'rgb(151, 151, 151)')};
  }
  &:active {
    outline: none;
    border: 2px solid transparent;
  }
  ::-moz-focus-inner {
    border: 0;
  }
`
