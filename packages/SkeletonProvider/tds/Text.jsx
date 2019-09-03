import React from 'react'
import PropTypes from 'prop-types'
import Text from '@tds/core-text'
import uuid from 'uuid/v1'
import styled from 'styled-components'
import Skeleton from '../../Skeleton/Skeleton'
import withSkeleton from '../withSkeleton'

const StyledTextSkeleton = styled.div({
  width: '100%',
  display: 'inline-block',
  overflow: 'hidden',
})

const TextSkeleton = ({ skeleton, ...rest }) => {
  if (!skeleton) {
    return <Text {...rest} />
  }

  const skSizes = {
    large: 'md',
    base: 'xs',
    small: 'xs',
    medium: 'sm',
  }

  const { size } = skeleton

  let { lines, characters } = skeleton

  const skSize = skSizes[size] || 'xs'
  if (skeleton === true) {
    lines = 1
    characters = undefined
  }

  if (!lines || lines < 1) {
    lines = 1
  }

  if (lines === 1) {
    return <Skeleton size={skSize} characters={characters} />
  }

  return (
    <StyledTextSkeleton>
      {[...Array(lines)].map(() => (
        <div key={uuid()}>
          <Skeleton size={skSize} characters={characters} />
        </div>
      ))}
    </StyledTextSkeleton>
  )
}

TextSkeleton.propTypes = {
  skeleton: PropTypes.oneOfType([
    PropTypes.shape({
      characters: PropTypes.number,
      lines: PropTypes.number,
    }),
    PropTypes.bool,
  ]),
}

TextSkeleton.defaultProps = {
  skeleton: undefined,
}

export default withSkeleton(TextSkeleton)(Text)
