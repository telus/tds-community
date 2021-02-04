import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Box from '@tds/core-box'
import Text from '@tds/core-text'
import { colorTelusPurple, colorWhiteLilac } from '@tds/core-colours'
import { safeRest } from '@tds/util-helpers'

import warn from '../../shared/utils/warn'

const Anchor = styled.a`
  text-decoration: none;
  cursor: pointer;
`

const getCardHeight = isLarge => (isLarge ? '485px' : '350px')

const BoxContainer = styled.div`
  background-color: white;
  width: 100%;
  opacity: 1;
  border: 1px solid ${colorWhiteLilac};
  border-radius: 4px;
  height: ${props => getCardHeight(props.isLarge)};
  @media (max-width: 767px) {
    height: ${props => (props.isVideo && !props.isLarge ? '485px' : getCardHeight(props.isLarge))};
  }
  @media (max-width: 576px) {
    height: auto;
  }
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 16px 0 rgba(213, 213, 213, 0.5);
  }
  display: inline-block;
`

const ContentContainer = styled.div`
  line-height: ${props => (props.header && props.footer ? '21px' : undefined)};
`

const ImageContainer = styled.div`
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  line-height: 0px;
  max-height: ${props => (props.isLarge ? '250px' : '215px')};
  @media (max-width: 992px) {
    height: auto;
  }
  img {
    transition: all 0.3s ease-in-out !important;
  }
  &:hover img {
    transform: scale(1.03);
  }
`

const VideoContainer = styled.div`
  border-radius: 4px 4px 0 0;
  display: block;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 767px) {
    max-width: 430px;
  }
  @media (max-width: 575px) {
    height: auto;
  }
`

const P = styled.p`
  color: ${colorTelusPurple};
`

/**
 * The PreviewCard component creates the appearance of a page snippet, and can be used in a list format.
 * @version ./package.json
 */
const PreviewCard = ({ header, image, media, body, footer, href, linkComponent, ...rest }) => {
  if (rest.to && !(linkComponent && rest.to)) {
    warn('Link', 'The props `linkComponent` and `to` must be used together.')
  }

  let newBody = body
  if (body.length > 70) {
    newBody = `${body.substr(0, 70)}...`
  }

  const hasHeaderOrFooter = body && (header || footer)
  const isVideo = media && media.type === 'video'
  const isImage = media && media.type === 'image'

  const createClickableElement = element => {
    return React.createElement(
      linkComponent || Anchor,
      {
        ...safeRest(rest),
        href,
      },
      element
    )
  }

  const renderImage = img => {
    const imageContainer = <ImageContainer isLarge={hasHeaderOrFooter}>{img}</ImageContainer>
    const clickableImage = createClickableElement(imageContainer)
    return clickableImage
  }

  const renderVideo = video => <VideoContainer isLarge={hasHeaderOrFooter}>{video}</VideoContainer>

  const innerCard = (
    <Box horizontal={hasHeaderOrFooter ? 4 : 3} vertical={hasHeaderOrFooter ? 5 : 3}>
      <ContentContainer header={header} footer={footer} data-testid="contentContainer">
        {header && (
          <Box>
            <Text size="small" bold>
              {header}
            </Text>
          </Box>
        )}
        <Box vertical={hasHeaderOrFooter ? 3 : undefined}>
          <P alt={body}>{newBody}</P>
        </Box>
        {footer && (
          <Box>
            <Text size="small">{footer}</Text>
          </Box>
        )}
      </ContentContainer>
    </Box>
  )
  const clickableCard = createClickableElement(innerCard)

  return (
    <BoxContainer isLarge={hasHeaderOrFooter} isVideo={isVideo}>
      {isVideo && renderVideo(media.content)}
      {isImage && renderImage(media.content)}
      {image && !media && <ImageContainer isLarge={hasHeaderOrFooter}>{image}</ImageContainer>}
      {clickableCard}
    </BoxContainer>
  )
}

PreviewCard.propTypes = {
  /**
   * Deprecated prop, use media instead.
   * Image component that will appear at the top of the card, above the content section.  Recommended dimensions is 369x269px.
   */
  image: PropTypes.node,
  /**
   * It is strongly suggested to provide this prop.
   * Media component that will appear at the top of the card, above the content section. Video type only supports WebVideo component.
   */
  media: PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video']),
    content: PropTypes.node,
  }),
  /**
   * Text that will appear at the top of the content section.  Recommended to be only 5 words or less.
   */
  header: PropTypes.string,
  /**
   * It is strongly suggested to provide this prop.
   * Purple text that will appear in the middle of the content section.  Recommended amount of characters is 70 or less.
   */
  body: PropTypes.string,
  /**
   * Text that will appear at the bottom of the content section.  Recommended to be 3 or less words.
   */
  footer: PropTypes.string,
  /**
   * Target URL.
   */
  href: PropTypes.string,
  /**
   * Link component.
   */
  linkComponent: PropTypes.func,
  /**
   * Target URL (if using 'Link from 'react-router').
   */
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

PreviewCard.defaultProps = {
  header: undefined,
  footer: undefined,
  href: undefined,
  linkComponent: undefined,
  to: undefined,
  image: undefined,
  media: undefined,
  body: '',
}

export default PreviewCard
