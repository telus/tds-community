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
  const MARGIN_BUFFER = 24 // scroll arrow width
  const ENTER_KEY = 13
  const SPACE_BAR_KEY = 32
  const RIGHT_ARROW = 39
  const LEFT_ARROW = 37
  const TAB = 9

  const currentFocus = useRef(0)
  const tabsRoot = useRef()
  const tabRef = useRef(null)
  const tabNavRef = useRef(null)
  const tabScrollIntervals = useRef([])
  const tabScrollPosition = useRef(0) // 0,1,2... to keep track of the scroll page
  const tabArrowKeyIntervals = useRef([]) // list of tab indices where scrolling should happen
  const tabIsFocused = useRef(false) // checks if any of the tabs are in focus
  // helper to handle edge case for when only one tab is on the last scroll page
  // it prevents scrolling back to the left to accomodate accessibility needs
  const wasTabbedPastTabs = useRef(false)
  const [tabsTranslatePosition, setTabsTranslatePosition] = useState(0)
  const [resizeTriggered, setResizeTriggered] = useState(false)
  const [isLeftArrowVisible, setLeftArrowVisible] = useState(false)
  const [isRightArrowVisible, setRightArrowVisible] = useState(false)
  const [current, setCurrent] = useState(0)
  const { children, leftArrowLabel, rightArrowLabel, wrapLabels, open, onOpen, ...rest } = props

  useEffect(() => {
    // if open is null or undefined it is uncontrolled
    // empty string may be a valid input to select no tabs (this case is required)
    if (open === null || open === undefined) return
    if (!props.children.length) return
    const tabIndex = props.children.findIndex(child => child.props.id === open)
    if (tabIndex >= 0) {
      setCurrent(tabIndex)
      currentFocus.current = tabIndex
      return
    }
    // if tabIndex === null set to -1 to keep tabs contolled, but select no tab
    setCurrent(-1)
  }, [open])

  const initializeScrollIncrements = () => {
    const tabContainerWidth = tabRef.current.parentElement.clientWidth
    if (!tabScrollIntervals.current.length) {
      let tabMargin = null
      const tabsArray =
        tabRef.current &&
        tabRef.current.children[0] &&
        Array.from(tabRef.current.children[0].childNodes)

      // populates tabScrollIntervals and tabArrowKeyIntervals
      let currentTabsLength = 0
      tabsArray.forEach((value, index) => {
        if (!tabMargin) {
          tabMargin = value.offsetLeft * 2
        }
        const increment = value.offsetWidth + tabMargin
        if (
          increment > tabContainerWidth - MARGIN_BUFFER &&
          tabScrollIntervals.current.length === 0
        ) {
          tabScrollIntervals.current.push(increment - MARGIN_BUFFER)
          tabArrowKeyIntervals.current.push(index)
          currentTabsLength = 0
        } else if (
          increment > tabContainerWidth - MARGIN_BUFFER &&
          tabScrollIntervals.current.length !== 0
        ) {
          tabScrollIntervals.current.push(increment)
          tabArrowKeyIntervals.current.push(index)
          currentTabsLength = 0
        } else if (
          currentTabsLength + increment > tabContainerWidth - MARGIN_BUFFER &&
          tabScrollIntervals.current.length === 0
        ) {
          tabScrollIntervals.current.push(currentTabsLength - MARGIN_BUFFER)
          tabArrowKeyIntervals.current.push(index)
          currentTabsLength = increment
        } else if (
          currentTabsLength + increment > tabContainerWidth - MARGIN_BUFFER * 2 &&
          tabScrollIntervals.current.length !== 0
        ) {
          tabScrollIntervals.current.push(currentTabsLength)
          tabArrowKeyIntervals.current.push(index)
          currentTabsLength = increment
        } else {
          currentTabsLength += increment
        }
      })
    }
  }

  // activates whenever resize occurs
  // calculates incremental sum of tabScrollIntervals to adjust the tabs translation and autoscrolls
  // scrolling snaps to the closest value from the incremental sum of tabScrollIntervals and the previous translate position
  const setResizeScrollIntervals = () => {
    tabScrollIntervals.current = []
    tabArrowKeyIntervals.current = []
    initializeScrollIncrements()
    currentFocus.current = 0
    if (tabsTranslatePosition !== 0) {
      let tempTabSum = 0

      // eslint-disable-next-line no-return-assign
      const tabSumArr = tabScrollIntervals.current.map(val => (tempTabSum += val))
      tabSumArr.unshift(0)
      const diffArr = tabSumArr.map(val => Math.abs(val - Math.abs(tabsTranslatePosition)))
      const minNumber = Math.min(...diffArr)
      const index = diffArr.findIndex(val => val === minNumber)
      if (-tabSumArr[index] === 0) {
        setTabsTranslatePosition(0)
      } else {
        setTabsTranslatePosition(-tabSumArr[index])
      }
      tabScrollPosition.current = index
    }
  }

  const handleBlur = () => {
    // on blur in controlled mode, we set the index back to prop value
    if (open === null || open === undefined) return
    const tabIndex = props.children.findIndex(child => child.props.id === open)
    if (tabIndex !== current) {
      setCurrent(tabIndex)
      currentFocus.current = tabIndex
    }
  }

  const scrollTabs = direction => {
    let currentPosition = tabsTranslatePosition
    if (direction === 'right') {
      if (isRightArrowVisible && !isLeftArrowVisible) {
        currentPosition -= tabScrollIntervals.current[tabScrollPosition.current]
      } else {
        currentPosition -= tabScrollIntervals.current[tabScrollPosition.current]
      }
      tabScrollPosition.current += 1
    }
    if (direction === 'left') {
      if (tabScrollPosition.current === 1) {
        currentPosition = 0
      } else {
        currentPosition += tabScrollIntervals.current[tabScrollPosition.current - 1]
      }
      tabScrollPosition.current -= 1
    }
    setTabsTranslatePosition(currentPosition)
  }

  const handleTabClick = (e, index) => {
    e.preventDefault()

    // scrolls tabs to the right if tab clicked isn't fully visible
    if (tabArrowKeyIntervals.current[tabScrollPosition.current] === index) {
      scrollTabs('right')
    }

    if (!open) {
      setCurrent(index) // set internally if not-controlled
      currentFocus.current = index
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
    currentFocus.current = index
    const newTab = props.children[index]
    const previousTab = props.children[previousIndex]
    if (newTab === previousTab) {
      // this is on a tab switch
      onOpen(newTab.props.id)
    }
  }

  const handleTabsKeyUp = e => {
    const numTabs = tabNavRef.current.node.parentNode.children.length

    if (
      (e.keyCode === RIGHT_ARROW || (!e.shiftKey && e.keyCode === TAB)) &&
      currentFocus.current < props.children.length - 1
    ) {
      tabArrowKeyIntervals.current.forEach(num => {
        if (currentFocus.current + 1 === num) {
          scrollTabs('right')
        }
      })
      if (
        e.keyCode === RIGHT_ARROW ||
        document.activeElement !== tabNavRef.current.node.parentNode.children[0].children[0]
      ) {
        currentFocus.current += 1
        tabNavRef.current.node.parentNode.children[currentFocus.current].children[0].focus()
      }
    }
    if (
      (e.keyCode === LEFT_ARROW || (e.shiftKey && e.keyCode === TAB)) &&
      currentFocus.current > 0
    ) {
      tabArrowKeyIntervals.current
        .slice()
        .reverse()
        .forEach(num => {
          if (
            (e.keyCode === LEFT_ARROW && currentFocus.current === num) ||
            (!wasTabbedPastTabs.current &&
              e.shiftKey &&
              e.keyCode === TAB &&
              currentFocus.current === num)
          ) {
            scrollTabs('left')
          }
        })

      if (wasTabbedPastTabs.current) {
        wasTabbedPastTabs.current = !wasTabbedPastTabs.current
      }

      if (
        e.keyCode === LEFT_ARROW ||
        document.activeElement !==
          tabNavRef.current.node.parentNode.children[numTabs - 1].children[0]
      ) {
        currentFocus.current -= 1
        tabNavRef.current.node.parentNode.children[currentFocus.current].children[0].focus()
      }
    }
    if (e.keyCode === SPACE_BAR_KEY || e.keyCode === ENTER_KEY) {
      e.target.click()
    }

    return 0
  }

  // handles arrow visibility
  useEffect(() => {
    initializeScrollIncrements()
    if (tabScrollPosition.current === 0 && tabScrollIntervals.current.length > 0) {
      setRightArrowVisible(true)
      setLeftArrowVisible(false)
    } else if (tabScrollPosition.current === 0 && tabScrollIntervals.current.length === 0) {
      setRightArrowVisible(false)
      setLeftArrowVisible(false)
    } else if (
      tabScrollPosition.current === tabScrollIntervals.current.length &&
      tabsTranslatePosition !== 0
    ) {
      setRightArrowVisible(false)
      setLeftArrowVisible(true)
    } else {
      setRightArrowVisible(true)
      setLeftArrowVisible(true)
    }

    setResizeTriggered(false)
  }, [tabsTranslatePosition, resizeTriggered])

  useEffect(() => {
    const handleResize = () => {
      currentFocus.current = 0
      setResizeScrollIntervals()
      setResizeTriggered(true)
    }

    const handleGlobalTabUpEvent = e => {
      const numTabs = tabNavRef.current.node.parentNode.children.length
      tabIsFocused.current = false
      // checks that a tab is focused if the tab key is pressed
      if (e.keyCode === TAB) {
        for (let i = 0; i < numTabs; i += 1) {
          if (
            document.activeElement === tabNavRef.current.node.parentNode.children[i].children[0]
          ) {
            tabIsFocused.current = true
          }
        }

        if (!tabIsFocused.current && currentFocus.current) {
          wasTabbedPastTabs.current = true
        }
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('keyup', handleGlobalTabUpEvent)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keyup', handleGlobalTabUpEvent)
    }
  }, [resizeTriggered])

  const handleArrowKeyUp = (e, value) => {
    if (e.keyCode === ENTER_KEY || e.keyCode === SPACE_BAR_KEY) {
      scrollTabs(value)
    }
  }

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
              handleTabClick(e, i)
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
                    <TabList>{mapTabs()}</TabList>
                  </TabListContainer>
                </TabListOuterContainer>
                {isRightArrowVisible && (
                  <TabArrows
                    tabIndex="0"
                    direction="right"
                    aria-label={rightArrowLabel}
                    onKeyUp={e => handleArrowKeyUp(e, 'right')}
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
