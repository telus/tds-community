import React from 'react'
import PropTypes from 'prop-types'

import DecorativeIcon from '@tds/core-decorative-icon'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import { componentWithName } from '@tds/util-prop-types'

import ColoredTextProvider from '../../../shared/components/ColoredTextProvider/ColoredTextProvider'

import styles from './SubMenu.scss'

/**
 * Expandable content areas for use with the `SideNavigation`
 *
 * _This component can only be accessed as a name-spaced component: `SideNavigation.SubMenu`._
 */
const SubMenu = ({ children, label, onClick, id, isOpen, active }) => {
  const options = {
    subMenuLink: true,
  }

  return (
    <div className={styles.mainDiv}>
      <button
        onClick={() => {
          onClick(id)
        }}
        className={active ? styles.active : styles.buttonDefault}
      >
        <Box vertical={3} inline horizontal={2} dangerouslyAddClassName={styles.space}>
          <ColoredTextProvider>
            <Text size="medium" bold={active}>
              {label}
            </Text>
          </ColoredTextProvider>
          <DecorativeIcon symbol={isOpen ? 'caretUp' : 'caretDown'} variant="secondary" size={16} />
        </Box>
      </button>
      {isOpen && (
        <ul className={styles.boxShadow}>
          {React.Children.map(children, child => (
            <li>{React.cloneElement(child, options)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

SubMenu.propTypes = {
  /**
   * An array of `SideNavigation.Link`.
   */
  children: componentWithName('Link'),
  /**
   * Label of the SubMenu.
   */
  label: PropTypes.string.isRequired,
  /**
   * Behaviour when clicking the SubMenu. Passed from <SideNavigation> to toggle open or close the SubMenu.
   *
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * ID of the SubMenu, must be unique when using multiple SubMenus within the same SideNavigation component.
   * @ignore
   */
  id: PropTypes.string,
  /**
   * Describes whether this SubMenu is open or not. Used in conjunction with ID so that only one SubMenu is open at a time.
   *
   * @ignore
   */
  isOpen: PropTypes.bool,
  /**
   * State of whether user is in one of the links in the SubMenu.
   */
  active: PropTypes.bool,
}

SubMenu.defaultProps = {
  onClick: undefined,
  isOpen: false,
  active: false,
  children: undefined,
  id: undefined,
}

export default SubMenu
