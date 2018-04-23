import React from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import Paragraph from '@tds/core-paragraph'

const MarkdownParagraph = ({ children }) => (
  <Box below={3}>
    <Paragraph size="medium">{children}</Paragraph>
  </Box>
)

MarkdownParagraph.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MarkdownParagraph
