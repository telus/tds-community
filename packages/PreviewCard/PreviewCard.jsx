import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import safeRest from '@tds/shared-safe-rest'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import { componentWithName } from '@tds/util-prop-types'
import { colorTelusPurple, colorWhiteLilac } from '@tds/core-colours'

const Anchor = styled.a`
  text-decoration: none;
  cursor: pointer;
`

const BoxContainer = styled.div`
  opacity: 1;
  border: 1px solid ${colorWhiteLilac};
  border-radius: 4px;
  width: ${props => (props.header || props.footer ? '100%' : '269px')};
  max-width: 346px;
  height: ${props => (props.header || props.footer ? '465px' : '305px')};
  @media (max-width: 576px) {
    height: auto;
    width: 100%;
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
  width: ${props => (props.header || props.footer ? '100%' : '268px')};
  overflow: hidden;
  line-height: 0px;
  max-height: 250px;
  @media (max-width: 992px) {
    height: auto;
    width: 100%;
  }
  & > img {
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.03);
    }
  }
`

const P = styled.p`
  color: ${colorTelusPurple};
`

/**
 * The PreviewCard component creates the appearance of a page snippet, and can be used in a list format.
 * @version ./package.json
 */
const PreviewCard = ({ category, other, image, body, footer, ...rest }) => {
  let newBody = body
  if (body.length > 70) {
    newBody = `${body.substr(0, 70)}...`
  }

  let header = category || other
  if (category && other) {
    header = `${category} \u00B7 ${other}`
  }

  return (
    <Anchor {...safeRest(rest)}>
      <BoxContainer header={header} footer={footer}>
        {image && (
          <ImageContainer header={header} footer={footer}>
            {image}
          </ImageContainer>
        )}
        <Box horizontal={header || footer ? 4 : 3} vertical={header || footer ? 5 : 3}>
          <ContentContainer header={header} footer={footer} data-testid="contentContainer">
            {header && (
              <Box>
                <Text size="small" bold>
                  {header}
                </Text>
              </Box>
            )}
            <Box vertical={header || footer ? 3 : undefined}>
              <P alt={body}>{newBody}</P>
            </Box>
            {footer && (
              <Box>
                <Text size="small">{footer}</Text>
              </Box>
            )}
          </ContentContainer>
        </Box>
      </BoxContainer>
    </Anchor>
  )
}

PreviewCard.propTypes = {
  /**
   * Image component that will appear at the top of the card, above the content section.  Recommended dimensions is 369x269px.
   */
  image: componentWithName('Image').isRequired,
  /**
   * Text that will appear at the top of the content section.  Recommended to be only one or two words.
   */
  category: PropTypes.string,
  /**
   *  Text that will appear at the top of the content section, next to category seperated by a dot. Recommended to be 3 or less words.
   */
  other: PropTypes.string,
  /**
   * Purple text that will appear in the middle of the content section.  Recommended amount of characters is 70 or less.
   */
  body: PropTypes.string.isRequired,
  /**
   * Text that will appear at the bottom of the content section.  Recommended to be 3 or less words.
   */
  footer: PropTypes.string,
  /**
   * Target URL.
   */
  href: PropTypes.string.isRequired,
}

PreviewCard.defaultProps = {
  category: undefined,
  other: undefined,
  footer: undefined,
}

export default PreviewCard
