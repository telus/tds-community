import React from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'
import Panel from './Panel/Panel'

/**
 * @version ./package.json
 */
const Tabs = ({ ...rest }) => <div {...safeRest(rest)} />

Tabs.propTypes = {}

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
