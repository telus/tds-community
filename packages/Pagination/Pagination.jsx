import React, { Component } from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'
import DecorativeIcon from '@tds/core-decorative-icon'
import Panels from './Panels'
import Panel from './Panel/Panel'
import styles from './Pagination.scss'

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

  generateKey = pre => {
    return `${pre}_${new Date().getTime()}`
  }

  mapNumeric = () => {
    return this.props.children.map((item, i) => {
      const index = i + 1
      let { current } = this.state
      const { panels } = this.state
      current = parseInt(current, 10) || 0
      if (current === index) {
        return (
          <li key={this.generateKey(i)} className={styles.current}>
            {index}
          </li>
        )
      }

      if (panels < 7 || index === 1 || index === panels) {
        return (
          <li key={this.generateKey(i)} className={styles.regular}>
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
          <li key={this.generateKey(i)} className={styles.regular}>
            <button value={index} onClick={e => this.handleClick(e)}>
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
          <li key={this.generateKey(i)} className={styles.ellipsis}>
            ...
          </li>
        )
      }

      return null
    })
  }

  handleClick = e => {
    e.preventDefault()
    const value = parseInt(e.target.value, 10) || 0
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
    const { children, ...rest } = this.props
    const { current } = this.state
    const increaseNumber = parseInt(current + 1, 10)
    const decreaseNumber = parseInt(current - 1, 10)
    return (
      <div {...safeRest(rest)} className={styles.container}>
        <Panels {...rest} key={this.generateKey(current)}>
          {children[current - 1] && children[current - 1]}
        </Panels>
        <div className={styles.controls}>
          {this.state.showPrevious && (
            <p className={styles.previous}>
              <button value={decreaseNumber} onClick={e => this.handleClick(e)}>
                <DecorativeIcon symbol="leftChevron" /> Previous
              </button>
            </p>
          )}
          <ul className={styles.pagination}>{this.mapNumeric()}</ul>
          {this.state.showNext && (
            <p className={styles.next}>
              <button value={increaseNumber} onClick={e => this.handleClick(e)}>
                Next <DecorativeIcon symbol="chevron" />
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
}

Pagination.Panel = Panel

export default Pagination
