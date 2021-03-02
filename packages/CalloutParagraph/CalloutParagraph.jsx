import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest } from '@tds/util-helpers'
import { componentWithName } from '@tds/util-prop-types'

import Paragraph from '@tds/core-paragraph'
import { colorTelusPurple } from '@tds/core-colours'

const marginValue = {
  mobile: {
    default: '-1.5rem',
    intermediate: '-1.5rem',
    narrow: '-1rem',
    compact: '-1rem',
  },
  desktop: {
    default: '-2rem',
    intermediate: '-2rem',
    narrow: '-1rem',
    compact: '-1rem',
  },
}
const paddingValue = {
  mobile: {
    default: '1.5rem',
    intermediate: '1.5rem',
    narrow: '1rem',
    compact: '1rem',
  },
  desktop: {
    default: '2rem',
    intermediate: '2rem',
    narrow: '1rem',
    compact: '1rem',
  },
}

const TextWrapper = styled.div`
  margin-left: ${props => (props.roundedCorners ? 'auto' : marginValue.desktop[props.spacing])};
  margin-right: ${props => (props.roundedCorners ? 'auto' : marginValue.desktop[props.spacing])};
  @media (max-width: 576px) {
    margin-left: ${props => (props.roundedCorners ? 'auto' : marginValue.mobile[props.spacing])};
    margin-right: ${props => (props.roundedCorners ? 'auto' : marginValue.mobile[props.spacing])};
  }
  width: ${props => (props.roundedCorners ? '100%' : undefined)};
  p {
    position: relative;
    text-align: ${props => props.textAlign};
    font-size: ${props => (props.compact ? '14px' : '1rem')};
    line-height: ${props => (props.compact ? '20px' : undefined)};
    border-radius: ${props => (props.roundedCorners ? '5px' : undefined)};
    color: ${colorTelusPurple};
    background: #f2eff4;
    padding-top: ${props => (props.compact ? '2px' : '0.5rem')};
    padding-bottom: ${props => (props.compact ? '2px' : '0.5rem')};
    padding-left: ${props => paddingValue.desktop[props.spacing]};
    padding-right: ${props => paddingValue.desktop[props.spacing]};
    @media (max-width: 576px) {
      padding-left: ${props => paddingValue.mobile[props.spacing]};
      padding-right: ${props => paddingValue.mobile[props.spacing]};
    }
    > i {
      margin-right: 1rem;
      position: absolute;
      left: 10px;
    }
    > span {
      display: inline-block;
      margin-left: ${props => props.margin};
    }
  }
`

const iconMargin = (spacingLevel, hasIcon) => {
  if (hasIcon) {
    if (spacingLevel === 'compact') {
      return '1.75rem'
    }
    return '0.75rem'
  }
  return undefined
}

// Format text align to be backwards compatible.
const formatTextAlign = (textAlignProp, hasRoundedCorners) => {
  if (textAlignProp) {
    return textAlignProp
  } else if (hasRoundedCorners) {
    return 'center'
  }
  return 'left'
}

/**
 * @version ./package.json
 * @visibleName CalloutParagraph (beta)
 */
const CalloutParagraph = ({
  children,
  spacing,
  roundedCorners,
  compact,
  icon: Icon,
  textAlign,
  ...rest
}) => {
  return (
    <TextWrapper
      spacing={spacing}
      roundedCorners={roundedCorners}
      compact={compact}
      margin={iconMargin(spacing, Icon)}
      textAlign={formatTextAlign(textAlign, roundedCorners)}
    >
      <Paragraph {...safeRest(rest)}>
        {Icon && <Icon />}
        <span>{children}</span>
      </Paragraph>
    </TextWrapper>
  )
}

CalloutParagraph.propTypes = {
  /**
   *
   */
  spacing: PropTypes.oneOf(['default', 'narrow', 'compact', 'intermediate']),

  /**
   * The content. Can be text, other components, or HTML elements.
   */
  children: PropTypes.node.isRequired,
  /**
   * Corners will be slightly rounded, and text will be center-aligned when passed.
   */
  roundedCorners: PropTypes.bool,
  /**
   * Font size and padding around text will be smaller.
   */
  compact: PropTypes.bool,
  /**
   * Provide an icon from the Dependent icon group in `@tds/core-interactive-icon`.
   */
  icon: componentWithName('Decorative', true),
  /**
   * Set explicit text-align property. If not set, default text-align is 'center' for
   * `roundedCorners` and 'left' otherwise.
   */
  textAlign: PropTypes.oneOf(['center', 'left', 'right']),
}

CalloutParagraph.defaultProps = {
  spacing: 'default',
  roundedCorners: false,
  compact: false,
  icon: undefined,
  textAlign: undefined,
}

export default CalloutParagraph
