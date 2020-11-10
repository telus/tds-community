import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import { safeRest } from '@tds/util-helpers'
import { ChevronRight, ChevronLeft } from '@tds/core-interactive-icon'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import {
  TabsContainer,
  TabBorder,
  TabListContainer,
  TabLabel,
  TabArrows,
  ArrowInner,
} from './styles'
import hash from './hash'
import Panel from './Panel/Panel'
/**
 * @version ./package.json
 * @visibleName Tabs (beta)
 */

const Tabs = props => {
  // Constants
  const MARGIN_BUFFER = 28
  const FIRST_TAB_MARGIN_BUFFER = MARGIN_BUFFER * 3
  const MOVE_TABS_VALUE = 300
  const ENTER_KEY = 13
  const SPACE_BAR_KEY = 32

  const tabsRoot = useRef()
  const tabRef = useRef(null)
  const [tabsContainerWidth, setTabsContainerWidth] = useState()
  const [tabsTranslatePosition, setTabsTranslatePosition] = useState(0)
  const [totalTabsWidth, setTotalTabsWidth] = useState(0)
  const [firstTabWidth, setFirstTabWidth] = useState(0)
  const [lastTabWidth, setLastTabWidth] = useState(0)
  const [resizeTriggered, setResizeTriggered] = useState(false)
  const [isLeftArrowVisible, setLeftArrowVisible] = useState(false)
  const [isRightArrowVisible, setRightArrowVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const { children, leftArrowLabel, rightArrowLabel, ...rest } = props

  const getTabsWidth = () => {
    let tabsWidthValue = 0
    const tabsArray =
      tabRef.current && tabRef.current.children[0] && tabRef.current.children[0].childNodes
    const firstTab =
      tabRef.current && tabRef.current.children[0] && tabRef.current.children[0].firstChild
    const lastTab =
      tabRef.current && tabRef.current.children[0] && tabRef.current.children[0].lastChild

    tabsArray.forEach(value => {
      if (value && value.offsetWidth) {
        tabsWidthValue += value.offsetWidth + MARGIN_BUFFER
      }
    })
    const firstTabValue = firstTab.offsetWidth + FIRST_TAB_MARGIN_BUFFER
    const lastTabValue = lastTab.offsetWidth + FIRST_TAB_MARGIN_BUFFER

    setFirstTabWidth(firstTabValue)
    setLastTabWidth(lastTabValue)
    setTotalTabsWidth(tabsWidthValue)
    if (tabsRoot.current.offsetWidth < totalTabsWidth) {
      return setTabsContainerWidth(`${totalTabsWidth}px`)
    }
    return setTabsTranslatePosition(0)
  }

  const scrollTabs = direction => {
    let currentPosition = tabsTranslatePosition
    if (direction === 'right') {
      currentPosition -= MOVE_TABS_VALUE
    }
    if (direction === 'left') {
      currentPosition += MOVE_TABS_VALUE
    }
    if (-currentPosition + lastTabWidth > totalTabsWidth) {
      currentPosition = -totalTabsWidth + lastTabWidth - MARGIN_BUFFER
    }
    if (direction === 'left' && -currentPosition < firstTabWidth) {
      currentPosition = 0
    }
    setTabsTranslatePosition(currentPosition)
    getTabsWidth()
  }

  const handleTabsKeyUp = (e, i) => {
    if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_BAR_KEY) {
      setCurrent(i)
    }
    if (e.target.offsetLeft <= MARGIN_BUFFER) {
      return setTabsTranslatePosition(0)
    }
    setTabsTranslatePosition(-e.target.offsetLeft + MARGIN_BUFFER)
    return getTabsWidth()
  }

  const handleArrowKeyUp = (e, value) => {
    if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_BAR_KEY) {
      scrollTabs(value)
    }
  }

  // handles arrow visibility
  useEffect(() => {
    if (-tabsTranslatePosition <= firstTabWidth) {
      setLeftArrowVisible(false)
      setRightArrowVisible(true)
    } else if (-tabsTranslatePosition < totalTabsWidth) {
      setLeftArrowVisible(true)
      setRightArrowVisible(true)
    }
    if (-tabsTranslatePosition + tabsRoot.current.offsetWidth >= totalTabsWidth) {
      setRightArrowVisible(false)
    }
    setResizeTriggered(false)
  }, [totalTabsWidth, firstTabWidth, tabsTranslatePosition, resizeTriggered])

  useEffect(() => {
    function handleResize() {
      getTabsWidth()
      setResizeTriggered(true)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getTabsWidth, resizeTriggered])

  const mapTabs = () => {
    if (props.children.length > 0) {
      return props.children.map((tab, i) => {
        return (
          <Tab
            key={hash(i)}
            onKeyUp={e => handleTabsKeyUp(e, i)}
            onClick={() => setCurrent(i)}
            aria-label={tab.props.heading}
          >
            <TabLabel>{tab.props.heading}</TabLabel>
          </Tab>
        )
      })
    }
    return ''
  }

  const mapTabContent = () => {
    if (props.children.length > 0) {
      return props.children.map((tab, i) => {
        return (
          <TabPanel key={hash(i)}>
            <FlexGrid>
              <FlexGrid.Row>
                <FlexGrid.Col xs={12} tabindex="0">
                  <Panel {...rest}>{children[current]}</Panel>
                </FlexGrid.Col>
              </FlexGrid.Row>
            </FlexGrid>
          </TabPanel>
        )
      })
    }
    return ''
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => getTabsWidth(), 100)
    }
  }, [])
  return (
    <TabsContainer {...safeRest(rest)} ref={tabsRoot}>
      <FlexGrid gutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            {isLeftArrowVisible && (
              <TabArrows
                tabIndex="0"
                direction="left"
                aria-label={leftArrowLabel}
                onKeyUp={e => handleArrowKeyUp(e, 'left')}
                onClick={() => scrollTabs('left')}
              >
                <ArrowInner direction="left">
                  <ChevronLeft variant="basic" />
                </ArrowInner>
              </TabArrows>
            )}
            <ReactTabs>
              <TabBorder>
                <TabListContainer ref={tabRef} positionToMove={tabsTranslatePosition}>
                  <TabList style={{ width: tabsContainerWidth }}>{mapTabs()}</TabList>
                </TabListContainer>
              </TabBorder>
              {mapTabContent()}
            </ReactTabs>
            {isRightArrowVisible && (
              <TabArrows
                tabIndex="0"
                direction="right"
                onKeyUp={e => handleArrowKeyUp(e, 'right')}
                aria-label={rightArrowLabel}
                onClick={() => scrollTabs('right')}
              >
                <ArrowInner direction="right">
                  <ChevronRight variant="basic" />
                </ArrowInner>
              </TabArrows>
            )}
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </TabsContainer>
  )
}

Tabs.propTypes = {
  /**
   * The tab panels. Must be at least one `<Tabs.Panel />`.
   */
  children: PropTypes.node.isRequired,
  leftArrowLabel: PropTypes.string,
  rightArrowLabel: PropTypes.string,
}

Tabs.defaultProps = {
  leftArrowLabel: 'Move menu to the left',
  rightArrowLabel: 'Move menu to the right',
}

Tabs.Panel = Panel
export default Tabs
