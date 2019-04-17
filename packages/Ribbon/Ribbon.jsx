import React from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'

import styles from './Ribbon.scss'

/** Ribbon component for focusing attention onto a sale or special feature.
 * @version ./package.json
 */
const Ribbon = ({ ribbonCopy, ...rest }) => {
  return (
    <React.Fragment>
      {
        <div {...safeRest(rest)} className={styles.ribbonStyle}>
          {ribbonCopy}
        </div>
      }
    </React.Fragment>
  )
}

Ribbon.propTypes = {
  ribbonCopy: PropTypes.string,
}

Ribbon.defaultProps = {
  ribbonCopy: '',
}

export default Ribbon
