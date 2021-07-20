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
  StyledIconBox,
  StyledImageContainer,
  StyledImage,
} from './style'

const StoryCard = ({ storyType, date, title, description, imgUrl, href }) => {
  const selectIcon = type => {
    if (type !== undefined) {
      const normalizedType = type.toLowerCase()
      if (normalizedType === 'article') {
        return <News size={20} />
      } else if (normalizedType === 'podcast') {
        return <Headset size={20} />
      } else if (normalizedType === 'video') {
        return <Play size={20} />
      } else if (normalizedType === 'case study') {
        return <Clipboard size={20} />
      }
    }
    return <News size={20} />
  }

  return (
    <StyledCard href={href} title={title}>
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
        <StyledImage src={imgUrl} alt={description} />
      </StyledImageContainer>
    </StyledCard>
  )
}

StoryCard.propTypes = {
  /**
   * The title of the story
   */
  title: PropTypes.string.isRequired,
  /**
   * The description of the story
   */
  description: PropTypes.string.isRequired,
  /**
   * The URL for the image to be displayed
   */
  imgUrl: PropTypes.string.isRequired,
  /**
   * The href for the story
   */
  href: PropTypes.string.isRequired,
  /**
   * The type of story, one of Article, Podcast or Video. Default is Article
   */
  storyType: PropTypes.string,
  /**
   * The date of when the story was published
   */
  date: PropTypes.string,
}

StoryCard.defaultProps = {
  storyType: 'Article',
  date: undefined,
}

export default StoryCard
