import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '@tds/core-box'
import Text from '@tds/core-text'
import { safeRest } from '@tds/util-helpers'
import { colorWhiteLilac, colorTelusPurple, colorShuttleGrey } from '@tds/core-colours'

import ColoredTextProvider from '../../../shared/components/ColoredTextProvider/ColoredTextProvider'
import warn from '../../../shared/utils/warn'

const activeContainer = {
  borderLeft: `4px solid ${colorTelusPurple}`,
  color: `${colorTelusPurple}`,
  backgroundColor: `${colorWhiteLilac}`,
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
  marginLeft: props.submenulink ? '1rem' : '0',
  borderLeft: props.submenulink ? `4px solid ${colorWhiteLilac}` : 'none',
  ...(props.active && !props.submenulink ? activeContainer : undefined),
}))

const BoxWrapper = styled(Box)(props => ({
  backgroundColor: props.active ? `${colorWhiteLilac}` : 'none',
}))

const BoxActive = styled(Box)(props => ({
  borderLeft: props.active && props.submenulink ? `4px solid ${colorTelusPurple}` : 'none',
  marginLeft: props.submenulink ? '-0.25rem' : '0px',
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
    <BoxWrapper active={active ? 1 : 0}>
      <BoxContainer vertical={3} submenulink={subMenuLink ? 1 : 0} active={active ? 1 : 0}>
        <BoxActive active={active ? 1 : 0} horizontal={3} submenulink={subMenuLink ? 1 : 0}>
          <StyledTextProvider active={active}>
            <Text size={subMenuLink ? 'small' : 'medium'} bold={active}>
              {children}
            </Text>
          </StyledTextProvider>
        </BoxActive>
      </BoxContainer>
    </BoxWrapper>
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
