import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import { safeRest } from '@tds/util-helpers'
import { ChevronRight, ChevronLeft } from '@tds/core-interactive-icon'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import { TabsContainer, TabListContainer, TabLabel, TabArrows } from './styles'
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
  const [isScrollEnabled, setScrollEnabled] = useState(false)
  const [isLeftArrow, setIsLeftArrow] = useState(false)
  const [isRightArrow, setIsRightArrow] = useState(false)
  const [current, setCurrent] = useState(0)
  const fullWithRef = useRef(0)
  const { children, ...rest } = props

  const currentIndex = i => {
    setCurrent(i)
  }
  const _nodes = new Map()
  const getTabsWidth = () => {
    let totalTabsWidth = 0
    Object.keys(_nodes).forEach(key => {
      const value = _nodes[key]
      if (value && value.node && value.node.offsetWidth) {
        totalTabsWidth += value.node.offsetWidth
      }
    })

    if (tabsRoot.current.offsetWidth < totalTabsWidth) {
      setTabsContainerWidth(`${totalTabsWidth}px`)
      fullWithRef.current = totalTabsWidth
      setIsRightArrow(true)
      return setScrollEnabled(true)
    }
    return setScrollEnabled(false)
  }
  const setRef = (tabRef, i) => {
    _nodes[i] = tabRef
  }
  const mapTabs = () => {
    if (props.children.length > 0) {
      return props.children.map((tab, i) => {
        return (
          <Tab ref={tabRef => setRef(tabRef, i)} key={hash(i)} onClick={() => currentIndex(i)}>
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
      setTimeout(() => getTabsWidth(), 100)
    }
  }, [])
  return (
    <TabsContainer {...safeRest(rest)} ref={tabsRoot} positionToMove={tabsTranslatePosition}>
      <FlexGrid gutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            {isLeftArrow && (
              <TabArrows direction="left" onClick={() => scrollTabs('left')}>
                <ChevronLeft variant="basic" />
              </TabArrows>
            )}
            <ReactTabs>
              <TabListContainer isScrollEnabled={isScrollEnabled}>
                <TabList style={{ width: tabsContainerWidth }}>{mapTabs()}</TabList>
              </TabListContainer>
              {mapTabContent()}
            </ReactTabs>
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

Tabs.propTypes = {
  /**
   * The tab panels. Must be at least one `<Tabs.Panel />`.
   */
  children: PropTypes.node.isRequired,
}
Tabs.Panel = Panel
export default Tabs
