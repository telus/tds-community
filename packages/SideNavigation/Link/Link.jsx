import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '@tds/core-box'
import Text from '@tds/core-text'
import safeRest from '@tds/shared-safe-rest'
import { colorWhiteLilac, colorTelusPurple, colorShuttleGrey } from '@tds/core-colours'

import ColoredTextProvider from '../../../shared/components/ColoredTextProvider/ColoredTextProvider'
import warn from '../../../shared/utils/warn'

const activeContainer = {
  borderLeft: `4px solid ${colorTelusPurple}`,
  color: `${colorTelusPurple}`,
}

const activeText = {
  fontWeight: 'bold',
  color: `${colorTelusPurple}`,
}

const hover = {
  color: `${colorShuttleGrey}`,
  '&:hover': {
    color: `${colorTelusPurple}`,
  },
}

const BoxContainer = styled(Box)(props => ({
  '&:hover': {
    backgroundColor: `${colorWhiteLilac}`,
  },
  ...(props.active ? activeContainer : undefined),
}))

const StyledTextProvider = styled(ColoredTextProvider)(props => ({
  ...(props.active ? activeText : hover),
}))

const StyledAnchor = styled.a({
  textDecoration: 'none',
})

/**
 * _This component can only be accessed as a name-spaced component: `SideNavigation.Link`._
 */
const Link = ({ reactRouterLinkComponent, children, active, subMenuLink, ...rest }) => {
  if ((reactRouterLinkComponent || rest.to) && !(reactRouterLinkComponent && rest.to)) {
    warn('Link', 'The props `reactRouterLinkComponent` and `to` must be used together.')
  }

  const innerLink = (
    <BoxContainer vertical={subMenuLink ? 2 : 3} horizontal={3} active={active ? 1 : 0}>
      <StyledTextProvider active={active}>
        <Text size={subMenuLink ? 'small' : 'medium'} bold={active}>
          {children}
        </Text>
      </StyledTextProvider>
    </BoxContainer>
  )

  return React.createElement(
    reactRouterLinkComponent || StyledAnchor,
    {
      ...safeRest(rest),
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
