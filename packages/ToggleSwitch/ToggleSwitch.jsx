import React from 'react'
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

const ToggleSwitch = React.forwardRef(
  (
    {
      id,
      label,
      tooltipText,
      checked,
      onClick,
      tooltipCopy,
      spinnerLabel,
      autofocus,
      isLoading,
      ...rest
    },
    ref
  ) => {
    if (tooltipText && !tooltipCopy) {
      warn('@tds/community-toggle-switch', 'You must provide tooltipCopy when using tooltipText')
    }

    const labelledById = `${id}-label`
    const buttonRef = React.useRef()

    /* The purpose of this hook is to allow the parent
    to focus on the ToggleSwitch at will by forwarding
    a ref to parent and exposing ONLY a single `focus` method
  */
    React.useImperativeHandle(ref, () => ({
      focus: () => {
        buttonRef.current.focus()
      },
    }))

    React.useEffect(() => {
      if (autofocus) {
        buttonRef.current.focus()
      }
      /* If either checked or isLoading changes we need
      to focus on buttonRef ONLY when autofocus is set
    */
    }, [checked, isLoading])

    const handleTooltipClick = event => {
      event.preventDefault()
    }

    return (
      <StyledLabel htmlFor={id}>
        <Box inline between={2}>
          <Text id={labelledById} size="medium">
            {label}
          </Text>
          {tooltipText && tooltipCopy && (
            <Tooltip onClick={handleTooltipClick} copy={tooltipCopy}>
              {tooltipText}
            </Tooltip>
          )}
        </Box>
        <InputSwitchWrapper>
          <Spinner tag="span" spinning={isLoading} label={spinnerLabel} size="small" inline>
            <Button
              {...safeRest(rest)}
              id={id}
              role="switch"
              aria-checked={checked}
              aria-labelledby={labelledById}
              data-testid={`${id}-switch`}
              onClick={!isLoading ? onClick : null}
              ref={buttonRef}
            >
              <Slider pressed={checked} />
            </Button>
          </Spinner>
        </InputSwitchWrapper>
      </StyledLabel>
    )
  }
)

ToggleSwitch.displayName = 'ToggleSwitch'

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

  /** Boolean to automatically focus on ToggleSwitch after interacting with it */
  autofocus: PropTypes.bool,

  /** Boolean to show or hide spinner */
  isLoading: PropTypes.bool,
}

ToggleSwitch.defaultProps = {
  checked: false,
  tooltipText: undefined,
  tooltipCopy: undefined,
  autofocus: false,
  isLoading: false,
}

export default ToggleSwitch
