import React from 'react'
import PropTypes from 'prop-types'

class ColoredTextProvider extends React.Component {
  getChildContext() {
    return {
      inheritColor: true,
    }
  }

  render() {
    const { colorClassName, children } = this.props
    if (colorClassName === null) {
      return <div>{children}</div>
    }
    return <div className={colorClassName}>{children}</div>
  }
}

ColoredTextProvider.propTypes = {
  colorClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ColoredTextProvider.defaultProps = {
  colorClassName: null,
}

ColoredTextProvider.childContextTypes = {
  inheritColor: PropTypes.bool,
}

export default ColoredTextProvider
