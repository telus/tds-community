import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'
import Text from '@tds/core-text'
import Box from '@tds/core-box'
import Tooltip from '@tds/core-tooltip'
import Spinner from '@tds/core-spinner'
import { StyledLabel, Button, Slider, InputSwitchWrapper } from './styles'

/**
  * `ToggleSwitch` is an alternative to using a checkbox, and maintains a similar component interface to [@tds/core-checkbox](https://tds.telus.com/components/index.html#checkbox).

   This component will _only_ maintain internal state when an `onClick` handler is _not_ provided.
   When an `onClick` handler is passed, it becomes the app's responsibility to manage this component's state through props.
   This behaviour differs from `@tds/core-checkbox`.
  * @version ./package.json
  */
const ToggleSwitch = ({
  id,
  label,
  toolTipText,
  checked,
  onBlur,
  onClick,
  onFocus,
  toolTipCopy,
  spinnerLabel,
  ...rest
}) => {
  const [isPressed, setIsPressed] = useState(checked)
  const [isSpinning, setIsSpinning] = useState(false)

  React.useEffect(() => {
    setIsSpinning(false)
  }, [checked])

  const labelledById = `${id}-label`

  const handleClick = event => {
    setIsPressed(!isPressed)
    setTimeout(() => {
      setIsSpinning(true)
    }, 250)
    onClick(event)
  }

  const handleFocus = event => {
    if (onFocus) {
      event.persist()
      onFocus(event)
    }
  }

  const handleBlur = event => {
    if (onBlur) {
      event.persist()
      onBlur(event)
    }
  }

  return (
    <StyledLabel htmlFor={id}>
      <Box inline between={2}>
        <Text id={labelledById} size="medium">
          {label}
        </Text>
        {toolTipText && <Tooltip copy={toolTipCopy}>{toolTipText}</Tooltip>}
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
            onClick={!isSpinning ? handleClick : null}
            onFocus={handleFocus}
            onBlur={handleBlur}
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

  /** The checked state. */
  checked: PropTypes.bool,

  /** Text written for TDS ToolTip. */
  toolTipText: PropTypes.string,

  /** Language provided to the copy prop in TDS ToolTip (en, fr). */
  toolTipCopy: PropTypes.string,

  /** Communicates a message to assistive technology while spinner is visible. */
  spinnerLabel: PropTypes.string,

  /** A callback function to be invoked when the checkbox loses focus.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onBlur: PropTypes.func,

  /** A callback function to be invoked when the checkbox is checked or unchecked.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onClick: PropTypes.func,

  /** A callback function to be invoked when the checkbox receives focus.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onFocus: PropTypes.func,
}

ToggleSwitch.defaultProps = {
  checked: false,
  onBlur: null,
  onClick: null,
  onFocus: null,
  toolTipText: '',
  toolTipCopy: 'en',
  spinnerLabel: null,
}

export default ToggleSwitch
