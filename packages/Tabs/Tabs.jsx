import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FlexGrid from '@tds/core-flex-grid'
import { safeRest } from '@tds/util-helpers'
import { ChevronRight, ChevronLeft } from '@tds/core-interactive-icon'
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs'
import HairlineDivider from '@tds/core-hairline-divider'
import DimpleDivider from '@tds/core-dimple-divider'
import {
  TabsContainer,
  TabBorder,
  TabListOuterContainer,
  TabListContainer,
  TabLabel,
  TabArrows,
  ArrowInner,
  TabLabelContainer,
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
  const RIGHT_ARROW = 39
  const LEFT_ARROW = 37

  const tabsRoot = useRef()
  const tabRef = useRef(null)
  const tabNavRef = useRef(null)
  const [tabsContainerWidth, setTabsContainerWidth] = useState()
  const [tabsTranslatePosition, setTabsTranslatePosition] = useState(0)
  const [totalTabsWidth, setTotalTabsWidth] = useState(0)
  const [firstTabWidth, setFirstTabWidth] = useState(0)
  const [lastTabWidth, setLastTabWidth] = useState(0)
  const [resizeTriggered, setResizeTriggered] = useState(false)
  const [isLeftArrowVisible, setLeftArrowVisible] = useState(false)
  const [isRightArrowVisible, setRightArrowVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const [currentFocus, setCurrentFocus] = useState(0)
  const { children, leftArrowLabel, rightArrowLabel, wrapLabels, open, onOpen, ...rest } = props

  useEffect(() => {
    // if open is null or undefined it is uncontrolled
    // empty string may be a valid input to select no tabs (this case is required)
    if (open === null || open === undefined) return
    if (!props.children.length) return
    const tabIndex = props.children.findIndex(child => child.props.id === open)

    if (tabIndex >= 0) {
      setCurrent(tabIndex)
      setCurrentFocus(tabIndex)
      return
    }
    // if tabIndex === null set to -1 to keep tabs contolled, but select no tab
    setCurrent(-1)
  }, [open])

  const handleBlur = () => {
    // on blur in controlled mode, we set the index back to prop value
    if (open === null || open === undefined) return
    const tabIndex = props.children.findIndex(child => child.props.id === open)
    if (tabIndex !== current) {
      setCurrent(tabIndex)
      setCurrentFocus(tabIndex)
    }
  }

  const handleClick = (e, index) => {
    e.preventDefault()
    if (!open) {
      setCurrent(index) // set internally if not-controlled
      setCurrentFocus(index)
      return
    }
    // raise to controlling component to set on click if controlled
    onOpen(props.children[index].props.id)
  }

  const handleSelect = (index, previousIndex) => {
    // this is for setting the focus in controlled mode
    // we need to temporarily set the index (f will undo)
    // only if both the newTab and previous are the same, was the tab actually clicked
    // and we can raise up the event.

    setCurrent(index)
    setCurrentFocus(index)
    const newTab = props.children[index]
    const previousTab = props.children[previousIndex]
    if (newTab === previousTab) {
      // this is on a tab switch
      onOpen(newTab.props.id)
    }
  }

  const getTabsWidth = () => {
    let tabsWidthValue = 0
    const tabsArray =
      tabRef.current &&
      tabRef.current.children[0] &&
      Array.from(tabRef.current.children[0].childNodes)
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

  const handleTabsKeyUp = e => {
    if (e.keyCode === RIGHT_ARROW && currentFocus < props.children.length - 1) {
      setCurrentFocus(currentFocus + 1)
      tabNavRef.current.node.parentNode.children[currentFocus + 1].children[0].focus()
    }
    if (e.keyCode === LEFT_ARROW && currentFocus > 0) {
      setCurrentFocus(currentFocus - 1)
      tabNavRef.current.node.parentNode.children[currentFocus - 1].children[0].focus()
    }
    if (e.keyCode === SPACE_BAR_KEY) {
      e.target.click()
    }
    if (e.target.offsetLeft <= MARGIN_BUFFER) {
      // eslint-disable-next-line consistent-return
      return setTabsTranslatePosition(0)
    }
    setTabsTranslatePosition(-e.target.offsetLeft + MARGIN_BUFFER)
    // eslint-disable-next-line consistent-return
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
            aria-label={tab.props.heading}
            onBlur={handleBlur}
            tabIndex="-1"
            key={hash(i)}
            onClick={e => {
              handleClick(e, i)
            }}
            onKeyUp={e => handleTabsKeyUp(e)}
            ref={tabNavRef}
          >
            <TabLabelContainer>
              <TabLabel tabIndex="-1" wrapLabel={wrapLabels}>
                {tab.props.heading}
              </TabLabel>
            </TabLabelContainer>
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
                <FlexGrid.Col xs={12} tabIndex="0">
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
    <TabsContainer {...safeRest(rest)} wrapLabels={wrapLabels} ref={tabsRoot}>
      <FlexGrid gutter={false}>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12}>
            <ReactTabs
              selectedIndex={open ? current : undefined}
              onSelect={onOpen ? handleSelect : undefined}
            >
              <TabBorder>
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
                <TabListOuterContainer>
                  <TabListContainer
                    ref={tabRef}
                    positionToMove={tabsTranslatePosition}
                    wrapLabels={wrapLabels}
                  >
                    <TabList style={{ width: tabsContainerWidth }}>{mapTabs()}</TabList>
                  </TabListContainer>
                </TabListOuterContainer>
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
              </TabBorder>
              <HairlineDivider />
              <DimpleDivider />
              {mapTabContent()}
            </ReactTabs>
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
  /**
   * Allow tab labels to wrap to multiple lines
   */
  wrapLabels: PropTypes.bool,
  /**
   * Set the selected tab by id
   */
  open: PropTypes.string,
  /**
   * Event raised on tab click
   */
  onOpen: PropTypes.func,
}

Tabs.defaultProps = {
  leftArrowLabel: 'Move menu to the left',
  rightArrowLabel: 'Move menu to the right',
  wrapLabels: false,
  open: null,
  onOpen: null,
}

Tabs.Panel = Panel
export default Tabs
