import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { safeRest, getCopy, uniqueId } from '@tds/util-helpers'
import A11yContent from '@tds/core-a11y-content'
import Box from '@tds/core-box'
import { componentWithName } from '@tds/util-prop-types'

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

  const descriptionBoxId = uniqueId('tags')

  const requiredProps = tag => ({
    'aria-describedby': descriptionBoxId,
    'aria-label': getCopy(copyDictionary, copy).a11yLabel.replace('%{tag}', tag.children),
  })

  if (children) {
    items = React.Children.map(children, child => (
      <child.type
        {...child.props}
        onClick={child.props.onClick || onClick}
        {...requiredProps(child.props)}
      />
    ))
  } else {
    items = tags.map(tag => (
      <TagItem
        key={tag.children}
        {...tag}
        onClick={tag.onClick || onClick}
        {...requiredProps(tag)}
      />
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
  /**
   * The `Tags.Item`, can be used as an alternative to the `tags` prop.
   */
  children: componentWithName('TagItem', true),
  /**
   * Use the copy prop to either select provided English or French copy by passing `'en'` or `'fr'` respectively.
   *
   * To provide your own copy, pass an object with the keys `a11yLabel`, `a11yDescriptionSet`, `a11yDescriptionUnset`.
   *
   * See documentation for more details.
   */
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(['en', 'fr']),
    PropTypes.shape({
      a11yLabel: PropTypes.string.isRequired,
      a11yDescriptionSet: PropTypes.string.isRequired,
      a11yDescriptionUnset: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  /**
   * The tags, can be used as an alternative to the `children` prop.
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.string.isRequired,
      isSelected: PropTypes.bool,
      isLoading: PropTypes.bool,
      ref: PropTypes.node,
    })
  ),
  /**
   * @param {node} name The `children` prop of the `Tags.Item`.
   */
  onClick: PropTypes.func.isRequired,
}

Tags.defaultProps = {
  children: undefined,
  tags: undefined,
}

Tags.Item = TagItem

export default Tags
