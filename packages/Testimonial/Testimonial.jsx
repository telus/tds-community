import React from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import Card from '@tds/core-card'
import Image from '@tds/core-image'
import Paragraph from '@tds/core-paragraph'
import safeRest from '@tds/shared-safe-rest'

import styles from './Testimonial.scss'

/**
 * @version ./package.json
 */
/** Testimonial component for displaying testimonial in a standalone, pre-styled component so all testimonials look consistent across the website */
const Testimonial = ({ testimonial, imgSrc, imgAlt, title, additionalInfo, ...rest }) => {
  return (
    <Card {...safeRest(rest)}>
      <Box between={3}>
        <Paragraph>&quot;{testimonial}&quot;</Paragraph>
        <Box inline={3} dangerouslyAddClassName={styles['testimonial-author']}>
          {imgSrc && <Image src={imgSrc} alt={imgAlt} width={60} height={60} rounded="circle" />}
          <Box horizontal={imgSrc ? 3 : 0}>
            <Paragraph bold>{title}</Paragraph>
            <Paragraph>{additionalInfo}</Paragraph>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

Testimonial.propTypes = {
  /** Testimonial main text */
  testimonial: PropTypes.string.isRequired,
  /** Image URL - suggested size is 60x60px */
  imgSrc: PropTypes.string,
  /** Image alt text - needed for accessibility */
  imgAlt: PropTypes.string,
  /** Testimonial author credentials - in bold */
  title: PropTypes.string.isRequired,
  /** Testimonial author credentials - more info - normal weight */
  additionalInfo: PropTypes.string.isRequired,
}

export default Testimonial
