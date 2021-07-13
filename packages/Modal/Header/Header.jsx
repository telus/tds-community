import React from 'react'
import PropTypes from 'prop-types'
import Heading from '@tds/core-heading'
import Box from '@tds/core-box'
import Text from '@tds/core-text'

import { HEADER_LEVELS, TEXT_SIZES } from '../configs'

const Header = ({ heading, headingLevel, subHeading, subHeadingSize }) => {
  return (
    <Box between={3} tabIndex={0}>
      <Box between={3}>
        <Heading level={headingLevel}>{heading}</Heading>
        {subHeading && <Text size={subHeadingSize}>{subHeading}</Text>}
      </Box>
    </Box>
  )
}

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOf(Object.values(HEADER_LEVELS)),
  subHeading: PropTypes.string,
  subHeadingSize: PropTypes.oneOf(Object.values(TEXT_SIZES)),
}

Header.defaultProps = {
  headingLevel: HEADER_LEVELS.H3,
  subHeading: '',
  subHeadingSize: TEXT_SIZES.MEDIUM,
}

export default Header
