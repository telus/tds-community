import React from 'react'
import PropTypes from 'prop-types'
import { safeRest } from '@tds/util-helpers'
import TabsWrapper from './TabsWrapper'

/**
 * @version ./package.json
 * @visibleName Tabs (beta)
 */
const Tabs = ({ dataLayerEventName, tabsEntries, tabIndex, ...rest }) => {
  return (
    <TabsWrapper
      {...safeRest(rest)}
      dataLayerEventName
      tabsEntries={tabsEntries}
      tabIndex={tabIndex}
    />
  )
}

Tabs.propTypes = {
  /**
   * tabsEntries is array data set for use list of Tab name and tab data.
   */
  tabsEntries: PropTypes.array,
  /**
   * You can use tabIndex="0" to set first tab is active.
   */
  tabIndex: PropTypes.number,
  /**
   * dataLayerEventName.
   */
  dataLayerEventName: PropTypes.string,
}

Tabs.defaultProps = {
  tabsEntries: [],
  tabIndex: 0,
  dataLayerEventName: '',
}

export default Tabs
