import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ResponsiveImage from '@tds/core-responsive-image'
import { breakpoints } from '@tds/core-responsive'
import { safeRest } from '@tds/util-helpers'
import checkWebpFeature from './checkWebpFeature'

/**
 * @version ./package.json
 */
const OptimizeImage = ({ contentfulAssetUrl, alt, quality, ...rest }) => {
  // states used to ensure images are downloaded only once
  const [hasLoaded, setHasLoaded] = useState(false)
  const [imgUrls, setImgUrls] = useState({})

  useEffect(() => {
    if (contentfulAssetUrl && !contentfulAssetUrl.match(/.svg/g)) {
      // Currently not all browsers support webP
      checkWebpFeature(result => {
        let format = ''
        if (result) {
          format = 'fm=webp'
        } else if (contentfulAssetUrl.match(/.jpeg/g)) {
          format = 'fm=jpg&fl=progressive'
        }

        setImgUrls({
          xsSrc: `${contentfulAssetUrl}?w=320&q=${quality}&${format}`,
          smSrc: `${contentfulAssetUrl}?w=${breakpoints.sm}&q=${quality}&${format}`,
          mdSrc: `${contentfulAssetUrl}?w=${breakpoints.md}&q=${quality}&${format}`,
          lgSrc: `${contentfulAssetUrl}?w=${breakpoints.lg}&q=${quality}&${format}`,
          xlSrc: `${contentfulAssetUrl}?w=${breakpoints.xl}&q=${quality}&${format}`,
          fallbackSrc: `${contentfulAssetUrl}?w=${breakpoints.xl}&q=${quality}`,
        })
        setHasLoaded(true)
      })
    }
  }, [])

  if (!hasLoaded) return null
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
   * The source to load the image.
   */
  contentfulAssetUrl: PropTypes.string.isRequired,
  /**
   * Alternative text to display if image cannot be loaded or a screen reader is used.
   */
  alt: PropTypes.string.isRequired,
  /**
   * Customize quality as a percentage between 1 and 100.
   */
  quality: PropTypes.number,
}

OptimizeImage.defaultProps = {
  quality: 80,
}

export default OptimizeImage
