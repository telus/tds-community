import styled, { css } from 'styled-components'

export const TabsContainer = styled.div`
  position: relative;

  .react-tabs {
    overflow-x: hidden;
  }

  .react-tabs__tab-list {
    transition: 0.9s all ease;
    transform: translate3d(${props => props.positionToMove}px, 0px, 0px);
    white-space: nowrap;
  }

  .react-tabs__tab {
    display: inline-block;
    cursor: pointer;
    padding: 0 25px;
    min-width: 44px;
    text-align: center;
    position: relative;

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }

    &:hover {
      span {
        text-shadow: 0px 0px 1px #2a2c2e;
        border-bottom: 4px solid #d8d8d8;
      }
    }

    &:active,
    &.react-tabs__tab--selected {
      span {
        text-shadow: 0px 0px 1px #2a2c2e;
        border-bottom: 4px solid #71747a;
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
  border-bottom: 1px solid #d8d8d8;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 32px;
    background-image: radial-gradient(
      at center top,
      rgba(150, 150, 150, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    padding: 0px;
    margin: 0px;
    border-width: 0px;
  }
`

export const TabLabel = styled.span`
  height: 100%;
  display: block;
  padding-bottom: 7px;
  border-bottom: 4px solid transparent;
`

export const TabArrows = styled.div`
  position: absolute;
  top: 0;
  background: #fff;
  z-index: 10;
  cursor: pointer;

  ${props =>
    props.direction === 'left' &&
    css`
      left: 0;
      border-right: 1px solid #d8d8d8;
    `};

  ${props =>
    props.direction === 'right' &&
    css`
      right: 0;
      border-left: 1px solid #d8d8d8;
    `};

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 5px;
    background: #fff;
  }
`
