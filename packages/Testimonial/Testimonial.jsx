import React from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import Paragraph from '@tds/core-paragraph'
import safeRest from '@tds/shared-safe-rest'
import { componentWithName } from '@tds/util-prop-types'

import styles from './Testimonial.scss'

/**
 * Testimonial component for displaying testimonial in a standalone, pre-styled component.
 * @version ./package.json
 */
const Testimonial = ({ testimonial, image, title, additionalInfo, ...rest }) => {
  return (
    <Box {...safeRest(rest)} between={3}>
      <Paragraph size="large">{testimonial}</Paragraph>
      <div className={styles.imageAndQuote}>
        {image && <div className={styles.image}>{image}</div>}
        <div>
          <Paragraph bold>{title}</Paragraph>
          <Paragraph>{additionalInfo}</Paragraph>
        </div>
      </div>
    </Box>
  )
}

Testimonial.propTypes = {
  /** Testimonial main text */
  testimonial: PropTypes.string.isRequired,
  /** Image Component - suggested & max size is 60x60px. */
  image: componentWithName('Image'),
  /** Image alt text - needed for accessibility */
  title: PropTypes.string.isRequired,
  /** Testimonial author credentials - more info - normal weight */
  additionalInfo: PropTypes.string.isRequired,
}

Testimonial.defaultProps = {
  image: undefined,
}

export default Testimonial
