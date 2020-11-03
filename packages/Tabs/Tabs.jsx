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
  const tabsRoot = useRef()
  const [tabsContainerWidth, setTabsContainerWidth] = useState()
  const [tabsTranslatePosition, setTabsTranslatePosition] = useState(0)
  const [totalTabsWidth, setTotalTabsWidth] = useState(0)
  const [firstTabWidth, setFirstTabWidth] = useState(0)
  const [isScrollEnabled, setScrollEnabled] = useState(false)
  const [isLeftArrowVisible, setLeftArrowVisible] = useState(false)
  const [isRightArrowVisible, setRightArrowVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const tabRef = useRef(null)
  const tabPanelToFocus = useRef(null)
  const { children, leftArrowLabel, rightArrowLabel, ...rest } = props

  const getTabsWidth = () => {
    let tabsWidthValue = 0
    const marginBuffer = 28
    const tabsArray =
      tabRef.current && tabRef.current.children[0] && tabRef.current.children[0].childNodes
    const firstTab =
      tabRef.current && tabRef.current.children[0] && tabRef.current.children[0].firstChild
    tabsArray.forEach(value => {
      if (value && value.offsetWidth) {
        tabsWidthValue += value.offsetWidth + marginBuffer
      }
    })
    const firstTabValue = firstTab.offsetWidth - marginBuffer * 3
    setFirstTabWidth(firstTabValue)
    setTotalTabsWidth(tabsWidthValue)
    if (tabsRoot.current.offsetWidth < totalTabsWidth) {
      setTabsContainerWidth(`${totalTabsWidth}px`)
      return setScrollEnabled(true)
    }
    setTabsTranslatePosition(0)
    return setScrollEnabled(false)
  }

  const scrollTabs = direction => {
    let currentPosition = tabsTranslatePosition
    if (direction === 'right') {
      currentPosition -= 100
    }
    if (direction === 'left') {
      currentPosition += 100
    }
    setTabsTranslatePosition(currentPosition)
    getTabsWidth()
  }

  const handleTabsKeyUp = (e, i) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setCurrent(i)
    }
    if (e.target.offsetLeft <= 28) {
      return setTabsTranslatePosition(0)
    }
    setTabsTranslatePosition(-e.target.offsetLeft + 28)
    return getTabsWidth()
  }

  const handleArrowKeyUp = (e, value) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
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
  }, [totalTabsWidth, firstTabWidth, tabsTranslatePosition, getTabsWidth])

  useEffect(() => {
    function handleResize() {
      getTabsWidth()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getTabsWidth])

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
          <TabPanel key={hash(i)} ref={tabPanelToFocus} tabindex="0">
            <FlexGrid>
              <FlexGrid.Row>
                <FlexGrid.Col xs={12}>
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
                  <TabList scrollEnabled={isScrollEnabled} style={{ width: tabsContainerWidth }}>
                    {mapTabs()}
                  </TabList>
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

Tabs.defaultPropTypes = {
  leftArrowLabel: 'Move menu to the left',
  rightArrowLabel: 'Move menu to the right',
}

Tabs.Panel = Panel
export default Tabs
