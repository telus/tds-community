import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest } from '@tds/util-helpers'

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
    margin-left: ${props => marginValue.mobile[props.spacing]};
    margin-right: ${props => marginValue.mobile[props.spacing]};
  }
  width: ${props => (props.roundedCorners ? '100%' : undefined)};
  p {
    text-align: ${props => (props.roundedCorners ? 'center' : undefined)};
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
  }
`

/**
 * @version ./package.json
 * @visibleName CalloutParagraph (beta)
 */
const CalloutParagraph = ({ children, spacing, roundedCorners, compact, ...rest }) => {
  return (
    <TextWrapper spacing={spacing} roundedCorners={roundedCorners} compact={compact}>
      <Paragraph {...safeRest(rest)}>{children}</Paragraph>
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
}

CalloutParagraph.defaultProps = {
  spacing: 'default',
  roundedCorners: false,
  compact: false,
}

export default CalloutParagraph
