import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { safeRest } from '@tds/util-helpers'
import Text from '@tds/core-text'
import Box from '@tds/core-box'
import Tooltip from '@tds/core-tooltip'
import Spinner from '@tds/core-spinner'
import FlexGrid from '@tds/core-flex-grid'
import {
  HiddenInput,
  Slider,
  Switch,
  InputSwitchWrapper,
  SwitchWrapper,
  SpinnerWrapper,
} from './styles'

/**
  * ToggleSwitch is an alternative to using a checkbox, and maintains a similar component interface to [@tds/core-checkbox](https://tds.telus.com/components/index.html#checkbox).

   This component will _only_ maintain internal state when an `onChange` handler is _not_ provided.
   When an `onChange` handler is passed, it becomes the app's responsibility to manage this component's state through props.
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

  onChange = event => {
    const { onChange } = this.props

    if (onChange) {
      event.persist()
      onChange(event)
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
      onChange,
      onFocus,
      toolTipCopy,
      isLoading,
      ...rest
    } = this.props
    const labelledById = `${id}-label`
    const disabled = !!rest && !!rest.disabled

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <label htmlFor={id}>
        <FlexGrid>
          <FlexGrid.Row>
            <FlexGrid.Col xs={7}>
              <Box inline between={2}>
                <Text id={labelledById} size="medium">
                  {label}
                </Text>
                {toolTipText && <Tooltip copy={toolTipCopy}>{toolTipText}</Tooltip>}
              </Box>
            </FlexGrid.Col>
            <FlexGrid.Col xs={1} xsOffset={2} mdOffset={3} lgOffset={3} xlOffset={4}>
              <InputSwitchWrapper>
                <HiddenInput
                  {...safeRest(rest)}
                  id={id}
                  type="checkbox"
                  name={name}
                  value={value}
                  checked={this.state.checked}
                  disabled={disabled}
                  aria-labelledby={labelledById}
                  onChange={this.onChange}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur}
                />
                <SwitchWrapper>
                  <Switch
                    data-testid={`${id}-switch`}
                    aria-checked={this.state.checked}
                    switchDisabled={disabled}
                    switchOn={this.state.checked}
                    isLoading={isLoading}
                  >
                    <Slider switchOn={this.state.checked} />
                  </Switch>
                  <SpinnerWrapper switchOn={this.state.checked && isLoading}>
                    <Spinner tag="span" spinning size="small" />
                  </SpinnerWrapper>
                </SwitchWrapper>
              </InputSwitchWrapper>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </label>
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

  /** A callback function to be invoked when the checkbox loses focus.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onBlur: PropTypes.func,

  /** A callback function to be invoked when the checkbox is checked or unchecked.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onChange: PropTypes.func,

  /** A callback function to be invoked when the checkbox receives focus.
   @param {SyntheticEvent} event The React `SyntheticEvent` */
  onFocus: PropTypes.func,
}

ToggleSwitch.defaultProps = {
  checked: false,
  onBlur: undefined,
  onChange: undefined,
  onFocus: undefined,
  toolTipText: '',
  toolTipCopy: 'en',
  isLoading: false,
}

export default ToggleSwitch
