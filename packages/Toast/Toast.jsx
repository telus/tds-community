import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'
import { safeRest } from '@tds/util-helpers'
import Text from '@tds/core-text'
import Strong from '@tds/core-strong'
import ChevronLink from '@tds/core-chevron-link'
import {
  colorAccessibleGreen,
  colorWhiteLilac,
  colorWhite,
  colorShark,
  colorGreyAthens,
} from '@tds/core-colours'

const STYLE_VARIANTS = {
  DEFAULT: 'default',
  TOAST: 'toast',
  LIGHT: 'light',
}

const transform = property => (from, to) => keyframes`
  from {
    ${property}: ${from};
  }
  to {
    ${property}: ${to};
  }
`

const { DEFAULT, TOAST, LIGHT } = STYLE_VARIANTS

const CONTAINER_MIN_HEIGHT = 60

const Container = styled.div(
  ({ variant }) => ({
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: '1rem',
    overflow: 'hidden',
    height: 0,
    minHeight: 0,
    background: colorAccessibleGreen,
    ...(variant !== TOAST && {
      height: 'auto',
      minHeight: CONTAINER_MIN_HEIGHT,
      background: variant === DEFAULT ? colorWhiteLilac : colorGreyAthens,
    }),
  }),
  ({ variant }) =>
    variant !== TOAST
      ? null
      : css`
          animation: ${transform('height')('0px', 'auto')} 1s ease-in-out 2s forwards,
            ${transform('min-height')('0px', `${CONTAINER_MIN_HEIGHT}px`)} 1s ease-in-out 2s
              forwards,
            ${transform('background')(colorAccessibleGreen, colorGreyAthens)} 1s ease-in-out 3.2s
              forwards;
        `
)

export const StyledParagraphWrapper = styled.div(
  ({ variant }) => ({
    padding: '1rem',
    'a span': {
      paddingLeft: '0.2rem',
    },
    'a > span': {
      display: 'inline-flex',
    },
    strong: {
      paddingRight: '0.2rem',
    },
    ...(variant !== TOAST && {
      span: {
        color: colorShark,
      },
      'a span': {
        color: colorAccessibleGreen,
        paddingLeft: '0.2rem',
      },
      'a > span': {
        display: 'inline-flex',
      },
    }),
  }),
  ({ variant }) =>
    variant !== TOAST
      ? null
      : css`
          span {
            color: ${colorWhite};
            animation: ${transform('color')(colorWhite, colorShark)} 1s ease-in-out 3s forwards;
          }
          ,
          a span {
            color: ${colorWhite};
            animation: ${transform('color')(colorWhite, colorAccessibleGreen)} 0.6s ease-in-out 3s
              forwards;
          }
        `
)

/**
 * @version ./package.json
 * @visibleName Toast (beta)
 */
const Toast = ({ headline, copy, link, dataId, variant, ...rest }) => (
  <Container data-id={`block-toast${dataId && -dataId}`} variant={variant} {...safeRest(rest)}>
    <StyledParagraphWrapper variant={variant}>
      <Text>
        {headline && <Strong>{`${headline} `}</Strong>}
        {copy}
        {link && (
          <ChevronLink data-id={`block-toast-link${dataId && -dataId}`} href={link.href}>
            {` ${link.text}`}
          </ChevronLink>
        )}
      </Text>
    </StyledParagraphWrapper>
  </Container>
)

Toast.propTypes = {
  /**
   * Required text that will appear in the component.
   */
  copy: PropTypes.string.isRequired,
  /**
   * Optional bolded copy that will appear before the copy.
   */
  headline: PropTypes.string,
  /**
   * Optional data attribute needed for E2E test target
   */
  dataId: PropTypes.string,
  /**
   * Optional link details taht will appear after the copy.
   */
  link: PropTypes.shape({
    href: PropTypes.string,
    text: PropTypes.string,
  }),
  /**
   * Optional variant to decide what kind of compoennt will be loaded.
   */
  variant: PropTypes.oneOf([TOAST, DEFAULT, LIGHT]),
}

Toast.defaultProps = {
  headline: '',
  link: undefined,
  dataId: '',
  variant: DEFAULT,
}

export default Toast
