import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import Paragraph from '@tds/core-paragraph'
import Heading from '@tds/core-heading'
import safeRest from '@tds/shared-safe-rest'
import { componentWithName } from '@tds/util-prop-types'
import { media } from '@tds/core-responsive'
import styled from 'styled-components'

const StyledImageAndQuote = styled.div({
  display: 'flex',
  flexDirection: 'column',

  ...media.from('sm').css({
    flexDirection: 'row',
    alignItems: 'center',
  }),
})

const StyledImage = styled.div({
  fontSize: 0,
  marginBottom: '1rem',
  maxWidth: '60px',
  maxHeight: '60px',

  ...media.from('sm').css({
    display: 'flex',
    alignItems: 'center',
    maxHeight: '60px',
    maxWidth: '60px',
    marginRight: '1rem',
    marginBottom: 0,
  }),
})

/**
 * Testimonial component for displaying testimonial in a standalone, pre-styled component.
 * @version ./package.json
 */
const Testimonial = ({ testimonialStyle, testimonial, image, title, additionalInfo, ...rest }) => {
  return (
    <Box {...safeRest(rest)} between={3}>
      {testimonialStyle === 'heading2' ? (
        <Paragraph>
          <Heading level="h2" tag="span">
            {testimonial}
          </Heading>
        </Paragraph>
      ) : (
        <Paragraph size="large">{testimonial}</Paragraph>
      )}
      <StyledImageAndQuote>
        {image && <StyledImage>{image}</StyledImage>}
        <div>
          <Paragraph bold>{title}</Paragraph>
          <Paragraph>{additionalInfo}</Paragraph>
        </div>
      </StyledImageAndQuote>
    </Box>
  )
}

Testimonial.propTypes = {
  /**
   * Renders the testimonial text in the specified style, as a semantic paragraph.
   *
   * @since 2.1.0
   */
  testimonialStyle: PropTypes.oneOf(['largeText', 'heading2']),
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
  testimonialStyle: 'largeText',
  image: undefined,
}

export default Testimonial
