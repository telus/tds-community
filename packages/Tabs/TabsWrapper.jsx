import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import { ChevronRight, ChevronLeft } from '@tds/core-interactive-icon'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { TabsContainer, TabListContainer, TabLabel, TabArrows } from './styles'
import hash from './hash'
// import TabsElement from './TabsElement'
/**
 * @version ./package.json
 * @visibleName Tabs (beta)
 */

const TabsWrapper = ({ tabsEntries, tabIndex }) => {
  const tabsRoot = useRef()
  const [tabsContainerWidth, setTabsContainerWidth] = useState()
  const [tabsTranslatePosition, setTabsTranslatePosition] = useState(0)
  const [isScrollEnabled, setScrollEnabled] = useState(false)
  const [isLeftArrow, setIsLeftArrow] = useState(false)
  const [isRightArrow, setIsRightArrow] = useState(false)
  const fullWithRef = useRef(0)

  const getTabsWidth = () => {
    const tabsArray = document.querySelectorAll('.react-tabs__tab')
    let totalTabsWidth = 0
    tabsArray.forEach(tab => {
      totalTabsWidth += tab.offsetWidth
    })
    if (tabsRoot.current.offsetWidth < totalTabsWidth) {
      setTabsContainerWidth(`${totalTabsWidth}px`)
      fullWithRef.current = totalTabsWidth
      setIsRightArrow(true)
      return setScrollEnabled(true)
    }
    return setScrollEnabled(false)
  }

  const mapTabs = () => {
    if (tabsEntries.length > 0) {
      return tabsEntries.map(tab => {
        return (
          <Tab key={hash(tab)}>
            <TabLabel>{tab.tabTitle}</TabLabel>
          </Tab>
        )
      })
    }
    return ''
  }

  const mapTabContent = () => {
    if (tabsEntries.length > 0) {
      return tabsEntries.map(tab => {
        return (
          <TabPanel key={hash(tab)}>
            <FlexGrid>
              <FlexGrid.Row>
                <FlexGrid.Col xs={12}>{tab && tab.tabContent[0].entryTitle}</FlexGrid.Col>
              </FlexGrid.Row>
            </FlexGrid>
          </TabPanel>
        )
      })
    }
    return ''
  }

  const scrollTabs = direction => {
    let currentPosition = tabsTranslatePosition
    if (direction === 'right') {
      currentPosition -= 100
      setIsLeftArrow(true)
    }
    if (direction === 'left') {
      currentPosition += 100
      setIsRightArrow(true)
    }
    if (
      Math.abs(currentPosition) + tabsRoot.current.offsetWidth >= fullWithRef.current &&
      currentPosition < 0
    ) {
      setIsRightArrow(false)
    }
    if (currentPosition === 0) {
      setIsLeftArrow(false)
    }
    setTabsTranslatePosition(currentPosition)
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => getTabsWidth(), 10)
    }
  }, [])
  return (
    <TabsContainer ref={tabsRoot} positionToMove={tabsTranslatePosition}>
      <FlexGrid gutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            {isLeftArrow && (
              <TabArrows direction="left" onClick={() => scrollTabs('left')}>
                <ChevronLeft variant="basic" />
              </TabArrows>
            )}
            <Tabs defaultIndex={tabIndex}>
              <TabListContainer isScrollEnabled={isScrollEnabled}>
                <TabList style={{ width: tabsContainerWidth }}>{mapTabs()}</TabList>
              </TabListContainer>
              {mapTabContent()}
            </Tabs>
            {isRightArrow && (
              <TabArrows direction="right" onClick={() => scrollTabs('right')}>
                <ChevronRight variant="basic" />
              </TabArrows>
            )}
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    </TabsContainer>
  )
}

TabsWrapper.propTypes = {
  tabsEntries: PropTypes.array,
  tabIndex: PropTypes.number,
}

TabsWrapper.defaultProps = {
  tabsEntries: [],
  tabIndex: PropTypes.any,
}

export default TabsWrapper
