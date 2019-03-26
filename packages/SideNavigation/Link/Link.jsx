import React from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import Text from '@tds/core-text'
import safeRest from '@tds/shared-safe-rest'

import ColoredTextProvider from '../../../shared/components/ColoredTextProvider/ColoredTextProvider'
import warn from '../../../shared/utils/warn'
import joinClassNames from '../../../shared/utils/joinClassNames'

import styles from './Link.scss'

/**
 * _This component can only be accessed as a name-spaced component: `SideNavigation.Link`._
 */
const Link = ({ reactRouterLinkComponent, children, active, subMenuLink, ...rest }) => {
  if ((reactRouterLinkComponent || rest.to) && !(reactRouterLinkComponent && rest.to)) {
    warn('Link', 'The props `reactRouterLinkComponent` and `to` must be used together.')
  }

  const boxClasses = joinClassNames(styles.box, active && styles.active)

  const innerLink = (
    <Box vertical={subMenuLink ? 2 : 3} horizontal={3} dangerouslyAddClassName={boxClasses}>
      <ColoredTextProvider colorClassName={active ? styles.activeText : styles.hover}>
        <Text size={subMenuLink ? 'small' : 'medium'} bold={active}>
          {children}
        </Text>
      </ColoredTextProvider>
    </Box>
  )

  return React.createElement(
    reactRouterLinkComponent || 'a',
    {
      ...safeRest(rest),
      className: styles.link,
    },
    innerLink
  )
}

Link.propTypes = {
  /**
   * Text of the Link.
   */
  children: PropTypes.string.isRequired,
  /**
   * Target URL.
   */
  href: PropTypes.string,
  /**
   * Active state for the link (if you are on the current URL of the link).
   */
  active: PropTypes.bool,
  /**
   * Describes whether the link is used as a SubMenu header or not.
   *
   * @ignore
   */
  subMenuLink: PropTypes.bool,
  /**
   * 	React Router Link component.
   */
  reactRouterLinkComponent: PropTypes.func,
  /**
   * Target URL (if using 'reactRouterLinkComponent').
   */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Link.defaultProps = {
  href: undefined,
  active: false,
  subMenuLink: false,
  reactRouterLinkComponent: null,
  to: null,
}

export default Link
