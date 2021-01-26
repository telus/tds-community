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
    display: inline-flex;
    cursor: pointer;
    margin: 0 2px;
    @media (min-width: 768px) {
      margin: 0 6px;
    }
    min-height: 45px;
    min-width: 44px;
    text-align: center;
    position: relative;

    &:active,
    &.react-tabs__tab--selected {
      h4 {
        text-shadow: 0px 0px 1px #2a2c2e;
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
        flex: 0 0 auto;
        display: flex;
        white-space: initial;
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
  ${props =>
    props.wrapLabel &&
    css`
      max-width: 144px;
      display: flex;
      align-items: center;
      justify-content: center;
    `}
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
const pseudoBar = isSelected => `
  content: '';
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 0;
  border-top: solid 4px ${isSelected ? '#71757b' : '#d8d8d8'};
`

export const TabLabelContainer = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: none;
  color: inherit;
  text-decoration: inherit;
  padding: 10px;
  position: relative;

  &:focus {
    outline: none;
  }

  ::-moz-focus-inner {
    border: 0;
  }

  // not in an active tab
  .react-tabs__tab:not([aria-selected='true']) & {
    &:hover::after {
      ${pseudoBar(false)}
    }

    &:active::after {
      ${pseudoBar(true)}
    }

    &:focus:not(:active)::after {
      content: '';
      display: block;
      pointer-events: none;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border: solid 2px #979797;
      border-radius: 6px;
    }
  }

  // in an active tab
  .react-tabs__tab[aria-selected='true'] & {
    &::after {
      ${pseudoBar(true)}
    }
  }
`
