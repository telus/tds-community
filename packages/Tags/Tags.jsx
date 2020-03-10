import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest, getCopy, uniqueId } from '@tds/util-helpers'
import A11yContent from '@tds/core-a11y-content'
import Box from '@tds/core-box'

import TagItem from './TagItem/TagItem'

import warn from '../../shared/utils/warn'
import copyDictionary from './tagsText'

const StyledTagsContainer = styled(Box)({
  flexWrap: 'wrap',
  marginTop: '-1rem', // add negative vertical spacing when TagItems wrap
})

/**
 * @version ./package.json
 */
const Tags = ({ children, tags, copy, onClick, ...rest }) => {
  let items
  if (children === undefined && tags === undefined) {
    warn('Tags', 'At least one of `children` or `tags` props are required')
    return undefined
  }

  const handleClick = name => {
    onClick(name)
  }

  const descriptionBoxId = uniqueId('tags')

  const requiredProps = tag => ({
    'aria-describedby': descriptionBoxId,
    'aria-label': getCopy(copyDictionary, copy).a11yLabel.replace('%{tag}', tag.children),
  })

  if (children) {
    items = React.Children.map(children, child => (
      <child.type
        {...child.props}
        onClick={child.props.onClick || handleClick}
        {...requiredProps(child.props)}
      />
    ))
  } else {
    items = tags.map(tag => (
      <TagItem key={tag.children} onClick={handleClick} {...tag} {...requiredProps(tag)} />
    ))
  }

  const selectedTags = items.filter(tag => tag.props.isSelected).map(tag => tag.props.children)

  return (
    <div {...safeRest(rest)}>
      <A11yContent aria-live="assertive" id={descriptionBoxId}>
        {selectedTags.length > 0
          ? getCopy(copyDictionary, copy).a11yDescriptionSet.replace(
              '%{tags}',
              selectedTags.join(', ')
            )
          : getCopy(copyDictionary, copy).a11yDescriptionUnset}
      </A11yContent>
      <StyledTagsContainer between={3} inline>
        {items}
      </StyledTagsContainer>
    </div>
  )
}

Tags.propTypes = {
  children: PropTypes.node,
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(['en', 'fr']),
    PropTypes.shape({
      a11yLabel: PropTypes.string.isRequired,
      a11yDescriptionSet: PropTypes.string.isRequired,
      a11yDescriptionUnset: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.string.isRequired,
      isSelected: PropTypes.bool,
      isLoading: PropTypes.bool,
      ref: PropTypes.node,
    })
  ),
  onClick: PropTypes.func.isRequired,
}

Tags.defaultProps = {
  children: undefined,
  tags: undefined,
}

Tags.Item = TagItem

export default Tags
