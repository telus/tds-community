import React from 'react'
import PropTypes from 'prop-types'
import ResponsiveImage from '@tds/core-responsive-image'
import { breakpoints } from '@tds/core-responsive'
import { safeRest } from '@tds/util-helpers'
import checkWebpFeature from './checkWebpFeature'

/**
 * @version ./package.json
 */
const OptimizeImage = ({ contentfulAssetUrl, alt, ...rest }) => {
  const imgUrls = {
    xsSrc: `${contentfulAssetUrl}?w=320`,
    smSrc: `${contentfulAssetUrl}?w=${breakpoints.sm}`,
    mdSrc: `${contentfulAssetUrl}?w=${breakpoints.md}`,
    lgSrc: `${contentfulAssetUrl}?w=${breakpoints.lg}`,
    xlSrc: `${contentfulAssetUrl}?w=${breakpoints.xl}`,
    fallbackSrc: contentfulAssetUrl,
  }

  if (contentfulAssetUrl && !contentfulAssetUrl.match(/.svg/g)) {
    // Currently not all browsers support
    checkWebpFeature(result => {
      let format = ''
      if (result) {
        format = 'fm=webp'
      } else if (contentfulAssetUrl.match(/.jpeg/g)) {
        format = 'fm=jpg&fl=progressive'
      }

      Object.keys(imgUrls).forEach(key => {
        imgUrls[key] = imgUrls[key].concat('&', format)
      })
    })
  }

  return (
    <ResponsiveImage
      xsSrc={imgUrls.xsSrc}
      smSrc={imgUrls.smSrc}
      mdSrc={imgUrls.mdSrc}
      lgSrc={imgUrls.lgSrc}
      xlSrc={imgUrls.xlSrc}
      fallbackSrc={imgUrls.fallbackSrc}
      alt={alt}
      {...safeRest(rest)}
    />
  )
}

OptimizeImage.propTypes = {
  /**
   * Alternative text to display if image cannot be loaded or a screen reader is used.
   */
  alt: PropTypes.string.isRequired,
  /**
   * The source to load the image.
   */
  contentfulAssetUrl: PropTypes.string.isRequired,
}

OptimizeImage.defaultProps = {}

export default OptimizeImage
