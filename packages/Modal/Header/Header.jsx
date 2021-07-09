import React from 'react'
import PropTypes from 'prop-types'
import Heading from '@tds/core-heading'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import Notification from '@tds/core-notification'

import { HEADER_LEVELS, NOTIFICATION_COPY, NOTIFICATION_VARIANTS, TEXT_SIZES } from '../configs'

const Header = ({
  heading,
  headingLevel,
  subHeading,
  subHeadingSize,
  notification,
  notificationTextSize,
  notificationVariant,
  notificationCopy,
}) => {
  return (
    <Box between={3} tabIndex="0">
      <Box between={3}>
        <Heading level={headingLevel}>{heading}</Heading>
        {notification && (
          <Notification variant={notificationVariant}>
            <Text size={notificationTextSize} copy={notificationCopy}>
              {notification}
            </Text>
          </Notification>
        )}
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
  notification: PropTypes.string,
  notificationTextSize: PropTypes.oneOf(Object.values(TEXT_SIZES)),
  notificationVariant: PropTypes.oneOf(Object.values(NOTIFICATION_VARIANTS)),
  notificationCopy: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(NOTIFICATION_COPY)),
    PropTypes.shape({
      feedback: PropTypes.string.isRequired,
      close: PropTypes.string.isRequired,
    }),
  ]),
}

Header.defaultProps = {
  headingLevel: HEADER_LEVELS.H3,
  subHeading: '',
  subHeadingSize: TEXT_SIZES.MEDIUM,
  notification: '',
  notificationTextSize: TEXT_SIZES.MEDIUM,
  notificationVariant: NOTIFICATION_VARIANTS.INSTRUCTIONAL,
  notificationCopy: NOTIFICATION_COPY.EN,
}

export default Header
