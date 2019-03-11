import React from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'

// import styles from './ExpandCollapse.modules.scss'

const generateKey = pre => {
  return `${pre}_${new Date().getTime()}`
}

const Panels = ({ children, ...rest }) => (
  <div {...safeRest(rest)}>
    {React.Children.toArray(children)
      .filter(Boolean)
      .map((panel, i) => {
        return (
          <div key={generateKey(i)}>
            <p>This is panels</p>
            {panel}
          </div>
        )
      })}
  </div>
)

Panels.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Panels
