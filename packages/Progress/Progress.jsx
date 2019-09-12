import React from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'

import styles from './Progress.scss'

import Bar from './Bar/Bar'

/**
 * @version ./package.json
 */

const Progress = ({ children, ...rest }) => (
  <div {...safeRest(rest)} className={styles.progressBarContainer}>
    {children}
  </div>
)

Progress.propTypes = {
  children: PropTypes.element.isRequired,
}

Progress.Bar = Bar
export default Progress
