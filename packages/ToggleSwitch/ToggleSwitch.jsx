import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'
import Text from '@tds/core-text'
import Box from '@tds/core-box'
import Tooltip from '@tds/core-tooltip'
import Spinner from '@tds/core-spinner'

import { StyledLabel, Button, Slider, InputSwitchWrapper } from './styles'
import warn from '../../shared/utils/warn'

/**
 * @version ./package.json
 */

const ToggleSwitch = ({
  id,
  label,
  tooltipText,
  checked,
  onClick,
  tooltipCopy,
  spinnerLabel,
  ...rest
}) => {
  if (tooltipText && !tooltipCopy) {
    warn('@tds/community-toggle-switch', 'You must provide tooltipCopy when using tooltipText')
  }

  const labelledById = `${id}-label`

  const [isPressed, setIsPressed] = useState(checked)
  const [isLoading, setIsLoading] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)

  React.useEffect(() => {
    setIsSpinning(false)
    setIsLoading(false)
  }, [checked])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsSpinning(true)
      } else {
        setIsSpinning(false)
      }
    }, 250) // time needed for a slider to move
    return () => clearTimeout(timer)
  }, [isLoading])

  const handleClick = event => {
    setIsPressed(!isPressed)
    setIsLoading(true)
    onClick(event)
  }

  return (
    <StyledLabel htmlFor={id}>
      <Box inline between={2}>
        <Text id={labelledById} size="medium">
          {label}
        </Text>
        {tooltipText && tooltipCopy && <Tooltip copy={tooltipCopy}>{tooltipText}</Tooltip>}
      </Box>
      <InputSwitchWrapper>
        <Spinner tag="span" spinning={isSpinning} label={spinnerLabel} size="small" inline>
          <Button
            {...safeRest(rest)}
            id={id}
            role="switch"
            aria-checked={checked}
            aria-labelledby={labelledById}
            data-testid={`${id}-switch`}
            onClick={!isLoading ? handleClick : null}
          >
            <Slider pressed={isPressed} />
          </Button>
        </Spinner>
      </InputSwitchWrapper>
    </StyledLabel>
  )
}

ToggleSwitch.propTypes = {
  /** The unique HTML id for this form input. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /** The label. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /** The aria-checked state of a button. */
  checked: PropTypes.bool,

  /** Text written for TDS Tooltip. */
  tooltipText: PropTypes.string,

  /** Language provided to the copy prop in TDS Tooltip (en, fr). */
  tooltipCopy: PropTypes.string,

  /** Communicates a message to assistive technology while spinner is visible. */
  spinnerLabel: PropTypes.string.isRequired,

  /** A callback function to be invoked when the ToggleSwitch button is clicked on.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onClick: PropTypes.func.isRequired,
}

ToggleSwitch.defaultProps = {
  checked: false,
  tooltipText: undefined,
  tooltipCopy: undefined,
}

export default ToggleSwitch
