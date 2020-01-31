import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { getCopy, safeRest } from '@tds/util-helpers'
import A11yContent from '@tds/core-a11y-content'
import Panel from './Panel/Panel'
import hash from './hash'
import copyDictionary from './tabsText'

import {
  TabsContainer,
  Controls,
  TabsList,
  TabsListMobile,
  TabCurrent,
  TabNotCurrent,
  TabBeforeCurrent,
  TabAfterCurrent,
  GeneralTabsButton,
  SpaceBeforeAfterTabs,
  SpaceBeforeCurrentTab,
  SpaceAfterCurrentTab,
} from './styles'

/**
 * @version ./package.json
 */
const Tabs = ({ children, copy, ...rest }) => {
  const panels = children.length
  const [current, setCurrent] = useState(1)

  const checkForRegularTabs = (index, isMobile) => {
    // Check if there are less than 7 panels,
    // if the index is at the first panel
    // if the index is next to the first panel
    // if current is less than three and index is less than five
    // and the inverse if current within two of total and index is greater than minus 4 of total
    if (isMobile) {
      return (
        panels < 5 ||
        index === 1 ||
        index === panels ||
        (current < 2 && index < 3) ||
        (current > panels - 1 && index > panels - 2)
      )
    }

    return (
      panels < 7 ||
      index === 1 ||
      index === panels ||
      index === current + 1 ||
      index === current - 1 ||
      (current < 3 && index < 5) ||
      (current > panels - 2 && index > panels - 4)
    )
  }

  const handleClick = e => {
    e.preventDefault()
    const value = parseInt(e.currentTarget.value, 10) || 0
    if (value > panels || value < 1) {
      return null
    }
    return setCurrent(value)
  }

  const mapTabs = isMobile => {
    // new set of rules, under mobile view , right before Tablet,
    // only show first, current, last, else, in between show ellipsis, only apply these rules under mobile view
    return children.map((item, i) => {
      const index = i + 1
      const label = item && item.props && item.props.tab
      // const leftSeparator = (index > 1 && index > current + 1) || (index > 1 && index < current)
      const separator = index !== current - 1 && index !== panels
      const beforeCurrent = index === current - 1
      const afterCurrent = index === current + 1
      if (current === index) {
        return (
          <TabCurrent key={hash(`${i}-1`)}>
            {label}
            <A11yContent>{getCopy(copyDictionary, copy).currentText}</A11yContent>
          </TabCurrent>
        )
      }
      if (beforeCurrent) {
        return (
          <TabBeforeCurrent key={hash(`${i}-3`)}>
            <GeneralTabsButton
              value={index}
              onClick={e => handleClick(e)}
              aria-label={`${getCopy(copyDictionary, copy).goToText} ${index}`}
            >
              {label}
            </GeneralTabsButton>
          </TabBeforeCurrent>
        )
      }
      if (afterCurrent) {
        return (
          <TabAfterCurrent key={hash(`${i}-3`)}>
            <GeneralTabsButton
              value={index}
              onClick={e => handleClick(e)}
              aria-label={`${getCopy(copyDictionary, copy).goToText} ${index}`}
            >
              {label}
            </GeneralTabsButton>
          </TabAfterCurrent>
        )
      }
      if (!beforeCurrent && !afterCurrent && checkForRegularTabs(index, isMobile)) {
        return (
          <TabNotCurrent key={hash(`${i}-3`)} separator={separator}>
            <GeneralTabsButton
              value={index}
              onClick={e => handleClick(e)}
              aria-label={`${getCopy(copyDictionary, copy).goToText} ${index}`}
            >
              {label}
            </GeneralTabsButton>
          </TabNotCurrent>
        )
      }
      return null
    })
  }
  return (
    <TabsContainer {...safeRest(rest)}>
      <Controls>
        <TabsList>
          {current !== 1 && <SpaceBeforeAfterTabs />}
          {current === 1 && <SpaceBeforeCurrentTab />}
          {mapTabs(false)}
          {current !== panels && <SpaceBeforeAfterTabs />}
          {current === panels && <SpaceAfterCurrentTab />}
        </TabsList>
        <TabsListMobile>{mapTabs(true)}</TabsListMobile>
      </Controls>
      <Panel {...rest}>{children[current - 1]}</Panel>
    </TabsContainer>
  )
}

Tabs.defaultProps = {}

Tabs.propTypes = {
  /**
   * The pagination panels. Must be at least one `<Pagination.Panel />`.
   */
  children: PropTypes.node.isRequired,
  /**
   * The default copy to be used.
   */
  copy: PropTypes.oneOf(['en', 'fr']).isRequired,
}

Tabs.Panel = Panel

export default Tabs
