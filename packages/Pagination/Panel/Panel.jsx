/* eslint-disable react/no-unused-prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import safeRest from '@tds/shared-safe-rest'
import { PanelContainer } from '../styles'

/**
 * Page-able content panels for use with `Pagination`
 *
 * _This component can only be accessed as a name-spaced component: `Pagination.Panel` ._
 */
const Panel = ({ children, ...rest }) => (
  <PanelContainer {...safeRest(rest)}>{children}</PanelContainer>
)

Panel.propTypes = {
  /**
   * The content. Can be text, any HTML element, or any component.
   */
  children: PropTypes.node.isRequired,
}

export default Panel
