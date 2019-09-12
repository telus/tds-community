import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Heading from '@tds/core-heading'
import Box from '@tds/core-box'
import { safeRest } from '@tds/util-helpers'
import { media } from '@tds/core-responsive'
import ColoredTextProvider from '../../shared/components/ColoredTextProvider/ColoredTextProvider'

const Wrapper = styled.blockquote({
  borderLeft: '4px solid purple',
  ...media.until('md').css({
    paddingLeft: '2rem',
  }),
  ...media.from('md').css({
    paddingLeft: '3rem',
  }),
})

/**
 * The Blockquote component is used to highlight text as a `blockquote` html tag.
 *
 * @version ./package.json
 */
const Blockquote = ({ children, ...rest }) => (
  <Wrapper {...safeRest(rest)}>
    <Box vertical={4}>
      <Heading level="h2" tag="span">
        <ColoredTextProvider>{children}</ColoredTextProvider>
      </Heading>
    </Box>
  </Wrapper>
)

Blockquote.propTypes = {
  /**
   * Specifies the text to be displayed within Blockquote.
   */
  children: PropTypes.node.isRequired,
}

export default Blockquote
