import React from 'react'
import PropTypes from 'prop-types'
import Image from '@tds/core-image'
import styled from 'styled-components'
import { safeRest } from '@tds/util-helpers'
import { colorGainsboro, colorAthensGrey } from '@tds/core-colours'

import withSkeleton from '../withSkeleton'

const keyframes = require('styled-components').keyframes

const skeletonTextShimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -100% 0;
  }
`

// Not using object notation as styled-components does not currently support animations in objects
const getWidthHeight = ({ ...rest }) => `
  width: ${rest.width * 0.8}px;
  height: ${rest.height * 0.8}px;
`

const StyledImageSkeleton = styled.div`
  ${getWidthHeight}
  display: inline-block;
  overflow: hidden;
  max-width: 100%;
  border-radius: 50%;

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

const ImageSkeleton = ({ skeleton, ...rest }) => {
  if (!skeleton) {
    return <Image {...rest} />
  }

  return <StyledImageSkeleton {...safeRest(rest)} />
}

ImageSkeleton.propTypes = {
  skeleton: PropTypes.bool,
}

ImageSkeleton.defaultProps = {
  skeleton: false,
}

export default withSkeleton(ImageSkeleton)(Image)
