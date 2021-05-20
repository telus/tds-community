import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ResponsiveImage from '@tds/core-responsive-image'
import { safeRest } from '@tds/util-helpers'
import checkWebpFeature from './checkWebpFeature'

/**
 * @version ./package.json
 */
const OptimizeImage = ({
  contentfulAssetUrl,
  alt,
  quality,
  xs,
  sm,
  md,
  lg,
  xl,
  useHeight,
  disableRetina,
  ...rest
}) => {
  // states used to ensure images are downloaded only once
  const [hasLoaded, setHasLoaded] = useState(false)
  const [imgUrls, setImgUrls] = useState({})
  const dimension = useHeight ? 'h' : 'w'

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

        let xsSrcRetina = ''
        let smSrcRetina = ''
        let mdSrcRetina = ''
        let lgSrcRetina = ''
        let xlSrcRetina = ''

        if (disableRetina === false) {
          xsSrcRetina = `, ${contentfulAssetUrl}?${dimension}=${xs * 2}&q=${quality}&${format} 2x`
          smSrcRetina = `, ${contentfulAssetUrl}?${dimension}=${sm * 2}&q=${quality}&${format} 2x`
          mdSrcRetina = `, ${contentfulAssetUrl}?${dimension}=${md * 2}&q=${quality}&${format} 2x`
          lgSrcRetina = `, ${contentfulAssetUrl}?${dimension}=${lg * 2}&q=${quality}&${format} 2x`
          xlSrcRetina = `, ${contentfulAssetUrl}?${dimension}=${xl * 2}&q=${quality}&${format} 2x`
        }

        setImgUrls({
          xsSrc: `${contentfulAssetUrl}?${dimension}=${xs}&q=${quality}&${format}${xsSrcRetina}`,
          smSrc: `${contentfulAssetUrl}?${dimension}=${sm}&q=${quality}&${format}${smSrcRetina}`,
          mdSrc: `${contentfulAssetUrl}?${dimension}=${md}&q=${quality}&${format}${mdSrcRetina}`,
          lgSrc: `${contentfulAssetUrl}?${dimension}=${lg}&q=${quality}&${format}${lgSrcRetina}`,
          xlSrc: `${contentfulAssetUrl}?${dimension}=${xl}&q=${quality}&${format}${xlSrcRetina}`,
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
  /**
   * Switches size dimension to height, default is false
   */
  useHeight: PropTypes.bool,
  /**
   * Turns off retina display functionality
   */
  disableRetina: PropTypes.bool,
}

OptimizeImage.defaultProps = {
  quality: 80,
  xs: 320,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  useHeight: false,
  disableRetina: false,
}

export default OptimizeImage
