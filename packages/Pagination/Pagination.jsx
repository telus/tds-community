import React, { Component } from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'
import DecorativeIcon from '@tds/core-decorative-icon'
import Panels from './Panels'
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
    this.mapNumeric = this.mapNumeric.bind(this)
    this.handleButtonState = this.handleButtonState.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.handleButtonState()
  }

  mapNumeric = () => {
    return this.props.children.map((item, i) => {
      const index = i + 1
      let { current } = this.state
      const { panels } = this.state
      current = parseInt(current, 10) || 0
      if (current === index) {
        return (
          <li key={hash(`${i}-1`)} className={styles.current}>
            {index}
          </li>
        )
      }

      if (panels < 7 || index === 1 || index === panels) {
        return (
          <li key={hash(`${i}-2`)} className={styles.regular}>
            <button value={index} onClick={e => this.handleClick(e)}>
              {index}
            </button>
          </li>
        )
      }
      if (
        index === current ||
        index === current + 1 ||
        index === current - 1 ||
        (current < 3 && index < 5) ||
        (current > panels - 2 && index > panels - 4)
      ) {
        return (
          <li key={hash(`${i}-3`)} className={styles.regular}>
            <button
              value={index}
              onClick={e => this.handleClick(e)}
              aria-label={`Go to panel number ${index}`}
            >
              {index}
            </button>
          </li>
        )
      }
      if (
        index === current - 2 ||
        index === current + 2 ||
        (current < 3 && index === 5) ||
        (current > panels - 2 && index === panels - 5)
      ) {
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
    const PreviousText = language !== 'french' ? 'Previous' : 'Précédent'
    const NextText = language !== 'french' ? 'Next' : 'Suivant'
    const PreviousLabel =
      language !== 'french' ? 'Go to previous panel' : 'Aller au panneau précédent'
    const NextLabel = language !== 'french' ? 'Go to next panel' : 'Aller au prochain panneau'
    return (
      <div {...safeRest(rest)} className={styles.container}>
        <Panels {...rest}>{children[current - 1] && children[current - 1]}</Panels>
        <div className={styles.controls}>
          {this.state.showPrevious && (
            <p className={styles.previous}>
              <button
                value={decreaseNumber}
                onClick={e => this.handleClick(e)}
                aria-label={PreviousLabel}
              >
                <DecorativeIcon symbol="leftChevron" size={16} />{' '}
                <span className={styles.buttonLabel}>{PreviousText}</span>
              </button>
            </p>
          )}
          <ul className={styles.pagination}>{this.mapNumeric()}</ul>
          {this.state.showNext && (
            <p className={styles.next}>
              <button
                value={increaseNumber}
                onClick={e => this.handleClick(e)}
                aria-label={NextLabel}
              >
                <span className={styles.buttonLabel}>{NextText}</span>{' '}
                <DecorativeIcon symbol="chevron" size={16} />
              </button>
            </p>
          )}
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
  language: 'english',
}

Pagination.Panel = Panel

export default Pagination
