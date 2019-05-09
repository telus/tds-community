import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Heading from '@tds/core-heading'
import Box from '@tds/core-box'
import safeRest from '@tds/shared-safe-rest'
import { media } from '@tds/core-responsive'
import ColoredTextProvider from '../../shared/components/ColoredTextProvider/ColoredTextProvider'

const Wrapper = styled.blockquote({
  borderLeft: '4px solid purple',
  ...media.until('md').css({
    paddingLeft: '32px',
  }),
  ...media.from('md').css({
    paddingLeft: '48px',
  }),
})

/**
 * The BlockQuote component is used to highlight text as a `blockquote` html tag.
 *
 * @version ./package.json
 */
const BlockQuote = ({ children, ...rest }) => (
  <Wrapper {...safeRest(rest)}>
    <Box vertical={4}>
      <Heading level="h2" tag="span">
        <ColoredTextProvider>{children}</ColoredTextProvider>
      </Heading>
    </Box>
  </Wrapper>
)

BlockQuote.propTypes = {
  /**
   * Specifies the text to be displayed within BlockQuote.
   */
  children: PropTypes.node.isRequired,
}

export default BlockQuote
