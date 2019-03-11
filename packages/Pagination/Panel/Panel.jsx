/* eslint-disable react/no-unused-prop-types */

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Page-able content panels for use with `Pagination`
 *
 * _This component can only be accessed as a name-spaced component: `Pagination.Panel` ._
 */
const Panel = ({ children }) => <div>{children}</div>

Panel.propTypes = {
  /**
   * The content. Can be text, any HTML element, or any component.
   */
  children: PropTypes.node.isRequired,
}

export default Panel
