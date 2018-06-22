import React from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'

import styles from './Progress.scss'

/**
 * @version ./package.json
 */

const percentString = (value, max) => {
  if ( value >= 0 && max > 0 )
    return `${(value / max) * 100}%`
  else {
    return '0%'
  }
}

const Progress = ({value, max, ...rest }) => (
  <div {...safeRest(rest)} className={styles.container} >
    <div className = {styles.progress} style={{width: percentString(value,max)}} />
  </div>
)

Progress.propTypes = {
  /**
   * Specifies how much of the task has been completed
   */
  value: PropTypes.number,
  /**
   * Specifies how much of the task requires in total
   */
  max: PropTypes.number
}

Progress.defaultProps = {
  value: 0,
  max: 0
}

export default Progress
