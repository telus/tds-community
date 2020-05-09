import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest } from '@tds/util-helpers'

/**
 * @version ./package.json
 */
const $COMPONENT$ = ({ prop1, prop2, ...rest }) => <div {...safeRest(rest)} />

$COMPONENT$.propTypes = {
  /**
   * Use JSDoc to add documentation for every prop.
   *
   * Learn more at https://react-styleguidist.js.org/docs/documenting.html#using-jsdoc-tags
   */
  prop1: PropTypes.string.isRequired,
  /**
   * Use @ignore to hide a prop this component's prop table on Styleguidist
   * And to denote a prop as 'unsupported'.
   *
   * Removal or props or changing default prop behaviour counts as a 'breaking change'.
   */
  prop2: PropTypes.func.isRequired,
}

$COMPONENT$.defaultProps = {}

export default $COMPONENT$
