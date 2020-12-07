import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import HairlineDivider from '@tds/core-hairline-divider'
import DimpleDivider from '@tds/core-dimple-divider'
import FlexGrid from '@tds/core-flex-grid'
import { safeRest } from '@tds/util-helpers'
import { ChevronRight, ChevronLeft } from '@tds/core-interactive-icon'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import {
  TabsContainer,
  TabListContainer,
  TabLabel,
  TabArrows,
  ArrowInner,
  SandwichFilling,
} from './styles'
import hash from './hash'
import Panel from './Panel/Panel'
/**
 * @version ./package.json
 * @visibleName Tabs (beta)
 */

// no need for props validation, internal use only
const FlexContainer = p => (
  <FlexGrid gutter={p.gutter}>
    <FlexGrid.Row>
      <FlexGrid.Col xs={12} tabIndex={p.tabIndex}>
        {p.children}
      </FlexGrid.Col>
    </FlexGrid.Row>
  </FlexGrid>
)

const Divider = () => (
  <>
    <HairlineDivider />
    <SandwichFilling />
    <DimpleDivider />
  </>
)

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
  const { children, stretch, leftArrowLabel, rightArrowLabel, ...rest } = props

  useEffect(() => {
    if (props.open === null || props.open === undefined) return
    if (!props.children.length) return
    const tabIndex = props.children.findIndex(child => child.props.id === props.open)
    setCurrent(tabIndex)
  }, [props.open])

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
            id={tab.props.id}
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
            <FlexContainer tabIndex="0">
              <Panel {...rest}>{children[current]}</Panel>
            </FlexContainer>
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

  const handleSelect = (index, previousIndex, event) => {
    const newTab = props.children[index]
    const previousTab = props.children[previousIndex]

    return props.onOpen(newTab.props.id, previousTab.props.id, event)
  }

  return (
    <TabsContainer {...safeRest(rest)} ref={tabsRoot}>
      <ReactTabs selectedIndex={current} onSelect={handleSelect}>
        <FlexContainer gutter={false}>
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
          <TabListContainer ref={tabRef} positionToMove={tabsTranslatePosition}>
            <TabList style={{ width: tabsContainerWidth }}>{mapTabs()}</TabList>
          </TabListContainer>
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
        </FlexContainer>
        {stretch ? (
          <Divider />
        ) : (
          <FlexContainer>
            <Divider />
          </FlexContainer>
        )}
        {mapTabContent()}
      </ReactTabs>
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
  /**
   * Event raised on tab click
   */
  onOpen: PropTypes.func,
  /**
   * Set the selected tab by id
   */
  open: PropTypes.string,
  /**
   * Dividers stretch full width of container if true, default=false
   */
  stretch: PropTypes.bool,
}

Tabs.defaultProps = {
  open: null,
  leftArrowLabel: 'Move menu to the left',
  rightArrowLabel: 'Move menu to the right',
  onOpen: () => {},
  stretch: false,
}

Tabs.Panel = Panel
export default Tabs
