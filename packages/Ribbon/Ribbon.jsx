import React from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'

import RibbonWrapper from './styles'

/** Ribbon component for focusing attention onto a sale or special feature.
 * @version ./package.json
 */
const Ribbon = ({ ribbonCopy, ...rest }) => {
  return (
    <React.Fragment>
      <RibbonWrapper {...safeRest(rest)}>{ribbonCopy}</RibbonWrapper>
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
