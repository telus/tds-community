import React from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'
import hash from './hash'

const Panels = ({ children, ...rest }) => (
  <div {...safeRest(rest)}>
    {React.Children.toArray(children)
      .filter(Boolean)
      .map((panel, i) => {
        return <div key={hash(`${i}-contentpanel`)}>{panel}</div>
      })}
  </div>
)

Panels.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Panels
