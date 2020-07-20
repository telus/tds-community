import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest } from '@tds/util-helpers'

import Paragraph from '@tds/core-paragraph'

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
  margin-left: ${props => marginValue.desktop[props.spacing]};
  margin-right: ${props => marginValue.desktop[props.spacing]};
  @media (max-width: 576px) {
    margin-left: ${props => marginValue.mobile[props.spacing]};
    margin-right: ${props => marginValue.mobile[props.spacing]};
  }
  p {
    color: #371e47;
    background: #f2eff4;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
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
const CalloutParagraph = ({ children, spacing, ...rest }) => {
  return (
    <TextWrapper spacing={spacing}>
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
}

CalloutParagraph.defaultProps = {
  spacing: 'default',
}

export default CalloutParagraph
