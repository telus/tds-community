import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest } from '@tds/util-helpers'

import Paragraph from '@tds/core-paragraph'

const TextWrapper = styled.div`
  p {
    color: ${props => (props.bgColor ? '#371E47' : undefined)};
    background: ${props => (props.textColor ? '#F2EFF4' : undefined)};
  }
`

/**
 * @version ./package.json
 * @visibleName CalloutParagraph (beta)
 */
const CalloutParagraph = ({ children, bgColor, textColor, ...rest }) => {
  return (
    <TextWrapper bgColor={bgColor} textColor={textColor}>
      <Paragraph {...safeRest(rest)}>{children}</Paragraph>
    </TextWrapper>
  )
}

CalloutParagraph.propTypes = {
  /**
   * Background color.
   */
  bgColor: PropTypes.bool,
  /**
  /**
   * Text color.
   */
  textColor: PropTypes.bool,
  /**
  /**
  * The content. Can be text, other components, or HTML elements.
  */
  children: PropTypes.node.isRequired,
}

CalloutParagraph.defaultProps = {
  bgColor: false,
  textColor: false,
}

export default CalloutParagraph
