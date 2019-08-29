import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colorGainsboro, colorAthensGrey } from '@tds/core-colours'
import safeRest from '@tds/shared-safe-rest'

const keyframes = require('styled-components').keyframes

export const SIZES = { xs: 18, sm: 24, md: 36, lg: 48, xl: 64 }

const skeletonTextShimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
`
// Not using object notation as styled-components does not currently support animations in objects
const StyledSkeleton = styled.span`
${({ safeSize }) => `
  height: ${safeSize}px;
  min-width: ${safeSize}px;
  border-radius: ${safeSize / 2}px;`}

  width: ${({ isFixedCharacterWidth, characters, safeSize }) =>
    `${isFixedCharacterWidth ? `${characters * safeSize}px` : '100%'}`};

  max-width: 100%;
  display: inline-block;
  overflow: hidden;

  background-color: ${colorGainsboro};
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 200% 100%;
  background-image: linear-gradient(
    to right,
    ${colorGainsboro},
    ${colorAthensGrey},
    ${colorGainsboro}
  );

  animation-name: ${skeletonTextShimmer};
  animation-duration: 2s;
  animation-delay: 2s;
  animation-iteration-count: infinite;
`
/**
 * Skeleton component for mocking content while it is loading.
 *
 * @version ./package.json
 */
const Skeleton = ({ characters, size, ...rest }) => {
  const parsedCharacters = parseInt(characters, 10)
  const safeCharacters = parsedCharacters || 0
  const safeSize = SIZES[size] || SIZES.xs

  const isFixedCharacterWidth = safeCharacters > 0

  return (
    <StyledSkeleton
      {...safeRest(rest)}
      characters={characters}
      safeSize={safeSize}
      isFixedCharacterWidth={isFixedCharacterWidth}
      aria-busy="true"
    />
  )
}

Skeleton.propTypes = {
  /** Number of "M" characters to emulate (full width & height per size) <br />
   <em>NOTE: default and overflow states both assume to 100% width instead</em> */
  characters: PropTypes.number,

  /** Size of text to emulate (line height in pixels) */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
}

Skeleton.defaultProps = {
  characters: 0,
  size: 'xs',
}

export default Skeleton
