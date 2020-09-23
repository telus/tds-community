import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Heading from '@tds/core-heading'
import Box from '@tds/core-box'
import {
  colorWhiteLilac,
  colorPanache,
  colorTelusPurple,
  colorGreyGainsboro,
  colorWhite,
  colorGreyShuttle,
  colorAccessibleGreen,
} from '@tds/core-colours'

import { borders } from '@tds/shared-styles'
import { safeRest } from '@tds/util-helpers'
import generateId from '../../shared/utils/generateId/generateId'

const getVariant = ({ variant }) => {
  const colour = variant === 'standard' ? colorAccessibleGreen : colorTelusPurple
  const backgroundColour = variant === 'standard' ? colorPanache : colorWhiteLilac
  return {
    '&:hover': {
      border: `0.0625rem solid ${colour} !important`,
      boxShadow: `0 0 0 0.0625rem ${colour}  !important`,
    },
    '&:active': {
      border: `0.0625rem solid ${colour}`,
      boxShadow: `0 0 0 0.0625rem ${colour},0 0 0 0.125rem #FFFFFF inset, 0 0 0 0.1875rem ${colour} inset !important`,
      background: backgroundColour,
    },
  }
}

const getStates = ({ variant }) => {
  const colour = variant === 'standard' ? colorAccessibleGreen : colorTelusPurple
  return {
    '&:focus ~ label': {
      boxShadow: `0 0 0 0.0625rem ${colour},0 0 0 0.125rem #FFFFFF inset, 0 0 0 0.1875rem ${colour} inset !important`,
      border: `0.0625rem solid ${colour} !important`,
    },
    '&:checked ~ label': {
      border: `0.0625rem solid ${colour}`,
      boxShadow: `0 0 0 0.0625rem ${colour}`,
    },
  }
}

const FakeRadio = styled.span({
  height: '1.25rem',
  width: '1.25rem',
  minHeight: '1.25rem',
  minWidth: '1.25rem',

  outline: 0,
  lineHeight: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',

  marginTop: '0.3rem',

  transition: 'border-color 0.1s linear, background-color 0.1s linear',
  borderRadius: '50%',
  ...borders.thin,

  borderColor: colorGreyShuttle,
  backgroundColor: colorWhite,
  '& > i': {
    display: 'none',
  },
})
const HiddenInput = styled.input(getStates, {
  position: 'absolute',
  width: '1.2rem',
  height: '1.2rem',
  margin: '2px 1px',
  opacity: '0',
  pointerEvents: 'none',
  '&:focus ~ label': {
    outline: 'none !important',
  },
})

const StyledLabel = styled.label(
  getVariant,
  borders.none,
  borders.rounded,
  ({ width, height }) => ({
    display: 'flex',
    cursor: 'pointer',
    height: `${height}px`,
    width: `${width}px`,
    border: `0.0625rem solid ${colorGreyGainsboro}`,
    boxShadow: '0 0 1rem 0 rgba(0, 0, 0, 0.1)',
    backgroundColor: colorWhite,
    transition: 'transform 0.2s ease-in-out, background 0.2s, color 0.2s, border 0.2s ease',
    '&:hover': {
      transform: 'scale(1.025)',
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'none !important',
    },
    [`${HiddenInput}:focus ~ & > div > div > ${FakeRadio}`]: {
      boxShadow: `0 0 4px 1px ${colorGreyShuttle}`,
      borderColor: colorWhite,
    },
    [`${HiddenInput}:checked ~ & > div > div > ${FakeRadio}`]: {
      '& > span': {
        display: 'block',
      },
      borderColor: colorGreyShuttle,
    },
  })
)

const InnerChecked = styled.span({
  width: '0.75rem',
  height: '0.75rem',
  borderRadius: '50%',
  backgroundColor: colorAccessibleGreen,
  display: 'none',
})

const labelBox = {
  width: '100%',
  marginRight: '0.5rem',
  '@media (min-width: 768px)': {
    marginRight: '1rem',
  },
}
const getGeneratedId = (name, value) => {
  return generateId(name).postfix(value)
}

const StyledLabelBox = styled(Box)(labelBox)
const StyledChildrenBox = styled(Box)({ marginLeft: '2.25rem' })

/**
 * @version ./package.json
 * @visibleName RadioCard (beta)
 */
const RadioCard = React.forwardRef(
  ({ id, name, value, label, width, height, variant, children, ...rest }, ref) => (
    <div>
      <HiddenInput
        type="radio"
        id={id || getGeneratedId(name, value)}
        name={name}
        value={value}
        data-testid="hidden-input"
        variant={variant}
        ref={ref}
        {...safeRest(rest)}
      />

      <StyledLabel
        htmlFor={id || getGeneratedId(name, value)}
        width={width}
        height={height}
        variant={variant}
        data-testid="checkbox-label"
      >
        <StyledLabelBox vertical={4} horizontal={3}>
          <Box between={3} inline>
            <FakeRadio data-testid="fake-input">
              <InnerChecked />
            </FakeRadio>
            <Heading level="h3">{label}</Heading>
          </Box>
          {children && <StyledChildrenBox>{children}</StyledChildrenBox>}
        </StyledLabelBox>
      </StyledLabel>
    </div>
  )
)

RadioCard.propTypes = {
  /**
   * The style.
   */
  variant: PropTypes.oneOf(['standard', 'brand']),
  /**
   * The label.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * Associate this radio card with a group. Set as the HTML name attribute.
   */
  name: PropTypes.string.isRequired,
  /**
   * The value. Must be unique within the group.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  /**
   * Use `checked` for controlled radio.
   */
  checked: PropTypes.bool,
  /**
   * The id. Must be unique within the group. If no id is provided, one will be generated in the following format: `name_value`
   */
  id: PropTypes.string,
  /**
   * Width of the radio card (in pixels).
   */
  width: PropTypes.number.isRequired,
  /**
   * Height of the radio card (in pixels).
   */
  height: PropTypes.number.isRequired,
  /**
   * Additional details regarding the selection to present on the radio card.
   */
  children: PropTypes.node,
}

RadioCard.defaultProps = {
  checked: undefined,
  variant: 'standard',
  id: undefined,
  children: null,
}

RadioCard.displayName = 'RadioCard'

export default RadioCard
