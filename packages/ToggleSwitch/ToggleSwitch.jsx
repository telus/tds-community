import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'
import Text from '@tds/core-text'
import Box from '@tds/core-box'
import Tooltip from '@tds/core-tooltip'
import Spinner from '@tds/core-spinner'
import { StyledLabel, Button, Slider, Switch, InputSwitchWrapper } from './styles'

/**
  * `ToggleSwitch` is an alternative to using a checkbox, and maintains a similar component interface to [@tds/core-checkbox](https://tds.telus.com/components/index.html#checkbox).

   This component will _only_ maintain internal state when an `onClick` handler is _not_ provided.
   When an `onClick` handler is passed, it becomes the app's responsibility to manage this component's state through props.
   This behaviour differs from `@tds/core-checkbox`.
  * @version ./package.json
  */
class ToggleSwitch extends Component {
  componentWillMount() {
    const { checked } = this.props
    this.setState({ checked })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked })
    }
  }

  onClick = event => {
    const { onClick } = this.props
    if (onClick) {
      event.persist()
      onClick(event)
    } else {
      this.setState(({ checked }) => ({ checked: !checked }))
    }
  }

  onFocus = event => {
    const { onFocus } = this.props

    if (onFocus) {
      event.persist()
      onFocus(event)
    }
  }

  onBlur = event => {
    const { onBlur } = this.props

    if (onBlur) {
      event.persist()
      onBlur(event)
    }
  }

  render() {
    const {
      id,
      label,
      name,
      value,
      toolTipText,
      checked,
      onBlur,
      onClick,
      onFocus,
      toolTipCopy,
      isLoading,
      spinnerLabel,
      ...rest
    } = this.props
    const labelledById = `${id}-label`

    return (
      <StyledLabel htmlFor={id}>
        <Box inline between={2}>
          <Text id={labelledById} size="medium">
            {label}
          </Text>
          {toolTipText && <Tooltip copy={toolTipCopy}>{toolTipText}</Tooltip>}
        </Box>
        <InputSwitchWrapper>
          <Spinner tag="span" spinning={isLoading} label={spinnerLabel} size="small" inline>
            <Button
              {...safeRest(rest)}
              id={id}
              role="switch"
              aria-checked={this.state.checked}
              name={name}
              value={value}
              checked={this.state.checked}
              isLoading={isLoading}
              aria-labelledby={labelledById}
              data-testid={`${id}-switch`}
              onClick={!isLoading ? this.onClick : null}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            >
              <Switch
                data-testid={`${id}-switch`}
                aria-checked={this.state.checked}
                switchOn={this.state.checked}
                isLoading={isLoading}
              >
                <Slider switchOn={this.state.checked} />
              </Switch>
            </Button>
          </Spinner>
        </InputSwitchWrapper>
      </StyledLabel>
    )
  }
}

ToggleSwitch.propTypes = {
  /** The unique HTML id for this form input. */
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  /** The label. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,

  /** Associate this checkbox with a group. Set as the HTML name attribute. */
  name: PropTypes.string.isRequired,

  /** The value. Must be unique within the group. */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,

  /** The checked state. */
  checked: PropTypes.bool,

  /** Text written for TDS ToolTip. */
  toolTipText: PropTypes.string,

  /** Language provided to the copy prop in TDS ToolTip (en, fr). */
  toolTipCopy: PropTypes.string,

  /** Spinner will be present when selecting toggle */
  isLoading: PropTypes.bool,

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
  isLoading: false,
  spinnerLabel: null,
}

export default ToggleSwitch
