import React, { Component } from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'
import DecorativeIcon from '@tds/core-decorative-icon'
import Panel from './Panel/Panel'
import styles from './Pagination.scss'
import hash from './hash'

/**
 * @version ./package.json
 */
class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
      panels: this.props.children.length,
      showPrevious: false,
      showNext: true,
    }
  }

  componentDidMount() {
    this.handleButtonState()
  }

  checkForRegularTabs = index => {
    const { current, panels } = this.state
    // Check if there are less than 7 panels,
    // if the index is at the first panel
    // if the index is next to the first panel
    // if current is less than three and index is less than five
    // and the inverse if current within two of total and index is greater than minus 4 of total
    return (
      panels < 7 ||
      index === 1 ||
      index === panels ||
      index === current + 1 ||
      index === current - 1 ||
      (current < 3 && index < 5) ||
      (current > panels - 2 && index > panels - 4)
    )
  }

  checkForEllipsis = index => {
    const { current, panels } = this.state
    // Check if we should render an ellipsis
    // if index is less than two or greater than two of current
    // if current is less than three and index is five
    // and the inverse if current is within two of total and index is total minus 5
    return (
      index === current - 2 ||
      index === current + 2 ||
      (current < 3 && index === 5) ||
      (current > panels - 2 && index === panels - 5)
    )
  }

  mapTabs = () => {
    const goToText = this.props.language === 'French' ? 'Aller au panneau n°' : 'Go to panel number'
    let { current } = this.state
    current = parseInt(current, 10) || 0
    return this.props.children.map((item, i) => {
      const index = i + 1
      if (current === index) {
        return (
          <li key={hash(`${i}-1`)} className={styles.current}>
            {index}
          </li>
        )
      }
      if (this.checkForRegularTabs(index)) {
        return (
          <li key={hash(`${i}-3`)} className={styles.regular}>
            <button
              value={index}
              onClick={e => this.handleClick(e)}
              aria-label={`${goToText} ${index}`}
            >
              {index}
            </button>
          </li>
        )
      }
      if (this.checkForEllipsis(index)) {
        return (
          <li key={hash(`${i}-4`)} className={styles.ellipsis}>
            ...
          </li>
        )
      }

      return null
    })
  }

  handleClick = e => {
    e.preventDefault()
    const value = parseInt(e.currentTarget.value, 10) || 0
    if (value > this.state.panels || value < 1) {
      return null
    }
    return this.setState({ current: value }, this.handleButtonState)
  }

  handleButtonState = () => {
    if (this.state.current !== 1) {
      this.setState({ showPrevious: true })
    } else {
      this.setState({ showPrevious: false })
    }
    if (this.state.current !== this.state.panels) {
      this.setState({ showNext: true })
    } else {
      this.setState({ showNext: false })
    }
  }

  render() {
    const { children, language, ...rest } = this.props
    const { current } = this.state
    const increaseNumber = parseInt(current + 1, 10)
    const decreaseNumber = parseInt(current - 1, 10)
    const previousText = language !== 'French' ? 'Previous' : 'Précédent'
    const nextText = language !== 'French' ? 'Next' : 'Suivant'
    const previousLabel =
      language !== 'French' ? 'Go to previous panel' : 'Aller au panneau précédent'
    const NextLabel = language !== 'French' ? 'Go to next panel' : 'Aller au prochain panneau'
    return (
      <div {...safeRest(rest)} className={styles.container}>
        <Panel {...rest}>{children[current - 1]}</Panel>
        <div className={styles.controls}>
          <p className={this.state.showPrevious ? styles.previous : styles.previousHidden}>
            <button
              value={decreaseNumber}
              onClick={e => this.handleClick(e)}
              aria-label={previousLabel}
            >
              <DecorativeIcon symbol="leftChevron" size={16} />{' '}
              <span className={styles.buttonLabel}>{previousText}</span>
            </button>
          </p>
          <ul className={styles.pagination}>{this.mapTabs()}</ul>
          <p className={this.state.showNext ? styles.next : styles.nextHidden}>
            <button
              value={increaseNumber}
              onClick={e => this.handleClick(e)}
              aria-label={NextLabel}
            >
              <span className={styles.buttonLabel}>{nextText}</span>{' '}
              <DecorativeIcon symbol="chevron" size={16} />
            </button>
          </p>
        </div>
      </div>
    )
  }
}

Pagination.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string,
}

Pagination.defaultProps = {
  language: 'English',
}

Pagination.Panel = Panel

export default Pagination
