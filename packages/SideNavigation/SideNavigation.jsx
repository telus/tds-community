import React, { Component } from 'react'
import PropTypes from 'prop-types'

import safeRest from '@tds/shared-safe-rest'
import joinClassNames from '../../shared/utils/joinClassNames'

import Link from './Link/Link'
import SubMenu from './SubMenu/SubMenu'

import styles from './SideNavigation.scss'

/**
 * The SideNavigation component is used in conjuntion with a large mass of educational / informational content,
 * allowing the user to navigate between options frequently and efficiently.
 * @version ./package.json
 */
class SideNavigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: null,
      variant: 'top',
    }
    this.adjustWidth = this.adjustWidth.bind(this)
    this.removeEventListeners = this.removeEventListeners.bind(this)
  }

  componentDidMount() {
    this.checkOffset()
    window.addEventListener('scroll', this.checkOffset)
    window.addEventListener('click', this.checkOffset)
    this.adjustWidth()
    window.addEventListener('resize', this.adjustWidth)
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  adjustWidth() {
    const parentWidth = this._sideNavContainer.offsetWidth
    const sideNav = this._sideNav
    sideNav.style.width = `${parentWidth}px`
  }

  toggleOpen = id => {
    this.setState({ open: id !== this.state.open ? id : null })
  }

  removeEventListeners() {
    window.removeEventListener('scroll', this.checkOffset)
    window.removeEventListener('click', this.checkOffset)
    window.removeEventListener('resize', this.adjustWidth)
  }

  checkOffset = () => {
    const sideNavRect = this._sideNav.getBoundingClientRect()
    const containerRect = this._sideNavContainer.getBoundingClientRect()
    if (
      (sideNavRect.top >= 0 && containerRect.top >= 0) ||
      sideNavRect.height > containerRect.height
    ) {
      this.setState({ variant: 'top' })
    } else if (
      (sideNavRect.bottom > containerRect.bottom || sideNavRect.bottom <= 0) &&
      sideNavRect.height <= containerRect.height
    ) {
      this.setState({ variant: 'bottom' })
    } else if (
      ((sideNavRect.top < 0 &&
        containerRect.top < 0 &&
        sideNavRect.bottom <= containerRect.bottom &&
        this.state.variant !== 'bottom') ||
        (sideNavRect.top > 0 && containerRect.top <= 0)) &&
      sideNavRect.height < containerRect.height
    ) {
      this.setState({ variant: 'fixed' })
    }
  }

  render() {
    const { children, verticalSpacing, ...rest } = this.props
    const { open, variant } = this.state
    let classes = joinClassNames(
      verticalSpacing ? styles[`verticalPadding-${verticalSpacing}`] : undefined,
      styles.topPosition
    )
    if (variant === 'bottom') {
      classes = styles.bottomPosition
    } else if (variant === 'fixed') {
      classes = styles.fixedPosition
    }

    return (
      <div
        {...safeRest(rest)}
        ref={c => {
          this._sideNavContainer = c
        }}
        className={styles.container}
      >
        <nav
          ref={c => {
            this._sideNav = c
          }}
          className={classes}
        >
          <ul className={styles.spaced}>
            {React.Children.map(children, child => {
              let options = {}
              if (child.type.name === 'SubMenu') {
                options = {
                  onClick: this.toggleOpen,
                  isOpen: child.props.id === open,
                  active: child.props.active,
                }
              }
              return <li className={styles.navLi}>{React.cloneElement(child, options)}</li>
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

SideNavigation.propTypes = {
  /**
   * Specifies the links and sub-menus required in the Side Navigation.
   */
  children: PropTypes.array.isRequired,
  /**
   * Indent content from the container's top edge by applying padding.
   */
  verticalSpacing: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8]),
}

SideNavigation.defaultProps = {
  verticalSpacing: undefined,
}

SideNavigation.Link = Link
SideNavigation.SubMenu = SubMenu

export default SideNavigation
