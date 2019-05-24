import React from 'react'
import PropTypes from 'prop-types'

class ColoredTextProvider extends React.Component {
  getChildContext() {
    return {
      inheritColor: true,
    }
  }

  render() {
    const { className, children } = this.props
    if (className === null) {
      return <div>{children}</div>
    }
    return <div className={className}>{children}</div>
  }
}

ColoredTextProvider.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ColoredTextProvider.defaultProps = {
  className: null,
}

ColoredTextProvider.childContextTypes = {
  inheritColor: PropTypes.bool,
}

export default ColoredTextProvider
