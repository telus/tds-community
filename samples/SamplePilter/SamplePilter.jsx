import React from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import Text from '@tds/core-text'

import safeRest from '../../shared/safe-rest/safeRest'

import styles from './SamplePilter.scss'

/**
 * Pilter example
 * @version ./package.json
 */

const SamplePilter = ({ children, a11yText, ...rest }) => (
  <button
    {...safeRest(rest)}
    className={styles.base}
    type="button"
    aria-label={`${a11yText} ${children}`}
  >
    <Box vertical={2} horizontal={3}>
      <Text invert>{children}</Text>
    </Box>
  </button>
)

SamplePilter.propTypes = {
  /**
   * Label to be read by screen readers
   */
  a11yText: PropTypes.string,
  /**
   * The label
   */
  children: PropTypes.string.isRequired,
}

SamplePilter.defaultProps = {
  a11yText: 'Filter by',
}

export default SamplePilter
