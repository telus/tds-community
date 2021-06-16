import React from 'react'
import PropTypes from 'prop-types'
import { News, Headset, Play, Clipboard } from '@tds/core-decorative-icon'
import {
  StyledCard,
  StyledTextBox,
  StyledInfoBox,
  StyledType,
  StyledDate,
  StyledHeadingBox,
  StyledHeading,
  StyledDescription,
  StyledIconTypeBox,
  StyledLink,
  StyledIconBox,
  StyledImageContainer,
  StyledImage,
} from './style'

const StoryCard = ({ storyType, date, title, description, imgUrl, slug }) => {
  const selectIcon = type => {
    const normalizedType = type.toLowerCase()
    if (normalizedType === 'article') {
      return <News size="20" />
    } else if (normalizedType === 'podcast') {
      return <Headset size="20" />
    } else if (normalizedType === 'video') {
      return <Play size="20" />
    } else if (normalizedType === 'case study') {
      return <Clipboard size="20" />
    }
    return undefined
  }

  return (
    <StyledLink href={slug}>
      <StyledCard>
        <StyledTextBox>
          <StyledInfoBox>
            <StyledIconTypeBox>
              {selectIcon(storyType) !== undefined && (
                <StyledIconBox>{selectIcon(storyType)}</StyledIconBox>
              )}
              <StyledType>{storyType}</StyledType>
            </StyledIconTypeBox>
            <StyledDate>{date}</StyledDate>
          </StyledInfoBox>
          <StyledHeadingBox>
            <StyledHeading>{title}</StyledHeading>
          </StyledHeadingBox>
          <StyledDescription>{description}</StyledDescription>
        </StyledTextBox>
        <StyledImageContainer>
          <StyledImage src={imgUrl} alt={description} width="100%" />
        </StyledImageContainer>
      </StyledCard>
    </StyledLink>
  )
}

StoryCard.propTypes = {
  /**
   * The title of the story
   */
  title: PropTypes.string,
  /**
   * The description of the story
   */
  description: PropTypes.string,
  /**
   * The URL for the image to be displayed
   */
  imgUrl: PropTypes.string,
  /**
   * The slug for the story
   */
  slug: PropTypes.string,
  /**
   * The type of story, if it is one of Article, Podcast or Video, an icon will render beside it. If it is something else, there will be no icon.
   */
  storyType: PropTypes.string,
  /**
   * The date of when the story was published
   */
  date: PropTypes.string,
}

StoryCard.defaultProps = {
  title: undefined,
  description: undefined,
  imgUrl: undefined,
  slug: undefined,
  storyType: undefined,
  date: undefined,
}

export default StoryCard
