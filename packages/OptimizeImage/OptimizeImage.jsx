import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ResponsiveImage from '@tds/core-responsive-image'
import { safeRest } from '@tds/util-helpers'
import checkWebpFeature from './checkWebpFeature'

/**
 * @version ./package.json
 */
const OptimizeImage = ({ contentfulAssetUrl, alt, quality, xs, sm, md, lg, xl, ...rest }) => {
  // states used to ensure images are downloaded only once
  const [hasLoaded, setHasLoaded] = useState(false)
  const [imgUrls, setImgUrls] = useState({})

  useEffect(() => {
    if (!contentfulAssetUrl.match(/.svg/g)) {
      // Currently not all browsers support webP
      checkWebpFeature(result => {
        let format = ''
        if (result) {
          format = 'fm=webp'
        } else if (contentfulAssetUrl.match(/.jpeg/g)) {
          format = 'fm=jpg&fl=progressive'
        }

        setImgUrls({
          xsSrc: `${contentfulAssetUrl}?w=${xs}&q=${quality}&${format}`,
          smSrc: `${contentfulAssetUrl}?w=${sm}&q=${quality}&${format}`,
          mdSrc: `${contentfulAssetUrl}?w=${md}&q=${quality}&${format}`,
          lgSrc: `${contentfulAssetUrl}?w=${lg}&q=${quality}&${format}`,
          xlSrc: `${contentfulAssetUrl}?w=${xl}&q=${quality}&${format}`,
          fallbackSrc: `${contentfulAssetUrl}?w=${xl}&q=${quality}`,
        })
        setHasLoaded(true)
      })
    } else {
      setImgUrls({
        xsSrc: contentfulAssetUrl,
        smSrc: contentfulAssetUrl,
        mdSrc: contentfulAssetUrl,
        lgSrc: contentfulAssetUrl,
        xlSrc: contentfulAssetUrl,
        fallbackSrc: contentfulAssetUrl,
      })
      setHasLoaded(true)
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
  /**
   * Customize width for xs screen size in px, this may affect the quality of the image.
   */
  xs: PropTypes.number,
  /**
   * Customize width for sm screen size in px, this may affect the quality of the image.
   */
  sm: PropTypes.number,
  /**
   * Customize width for md screen size in px, this may affect the quality of the image.
   */
  md: PropTypes.number,
  /**
   * Customize width for lg screen size in px, this may affect the quality of the image.
   */
  lg: PropTypes.number,
  /**
   * Customize width for xl screen size in px, this may affect the quality of the image.
   */
  xl: PropTypes.number,
}

OptimizeImage.defaultProps = {
  quality: 80,
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
}

export default OptimizeImage
