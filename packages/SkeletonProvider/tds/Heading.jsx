import React from 'react'
import PropTypes from 'prop-types'
import Heading from '@tds/core-heading'
import Skeleton from '../../Skeleton/Skeleton'
import withSkeleton from '../withSkeleton'

const HeadingSkeleton = ({ skeleton, ...rest }) => {
  if (!skeleton) {
    return <Heading {...rest} />
  }

  const { level } = rest

  const levels = {
    h1: 'lg',
    h2: 'md',
    h3: 'sm',
    h4: 'xs',
  }

  let { characters } = skeleton

  if (skeleton === true) {
    characters = undefined
  }

  return (
    <div style={{ maxWidth: '100%', display: 'inline-block', overflow: 'hidden' }}>
      <Skeleton characters={characters} size={level ? levels[level] : 'md'} />
    </div>
  )
}

HeadingSkeleton.propTypes = {
  skeleton: PropTypes.oneOfType([
    PropTypes.shape({
      characters: PropTypes.number,
    }),
    PropTypes.bool,
  ]),
}

HeadingSkeleton.defaultProps = {
  skeleton: undefined,
}

export default withSkeleton(HeadingSkeleton)(Heading)
