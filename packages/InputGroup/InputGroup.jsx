import React, { useState, useEffect, useMemo, createRef } from 'react'
import PropTypes from 'prop-types'
import DecorativeIcon from '@tds/core-decorative-icon'
import { Close } from '@tds/core-interactive-icon'
import A11yContent from '@tds/core-a11y-content'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import Strong from '@tds/core-strong'
import { uniqueId } from '@tds/util-helpers'
import { InputGroupStyle, LabelStyle } from './style'

/**
 * @version ./package.json
 */
const InputGroup = ({
  id,
  className,
  placeholder,
  defaultValue,
  buttonText,
  label,
  hint,
  onChange,
  onKeyDown,
  onButtonClick,
  onClearButtonClick,
}) => {
  const inputRef = createRef()
  const [inputValue, setInputValue] = useState('')
  const inputId = useMemo(() => (label ? uniqueId(label) : id), [label, id])

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <Box className={className} between={1}>
      {label && (
        <LabelStyle htmlFor={inputId}>
          <Text>
            <Strong>{label}</Strong>
          </Text>
          <Text>{hint}</Text>
        </LabelStyle>
      )}
      <InputGroupStyle hasValue={!!inputValue}>
        <input
          id={inputId}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          onChange={e => {
            setInputValue(e.target.value)
            if (onChange) onChange(e)
          }}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />
        {!!inputValue && (
          <Close
            a11yText="Close"
            onClick={e => {
              setInputValue('')
              inputRef.current.focus()
              if (onClearButtonClick) onClearButtonClick(e)
            }}
          />
        )}
        <button type="button" onClick={onButtonClick}>
          <A11yContent>{buttonText}</A11yContent>
          <DecorativeIcon symbol="spyglass" variant="secondary" />
        </button>
      </InputGroupStyle>
    </Box>
  )
}

InputGroup.propTypes = {
  /**
   * The unique identifier
   */
  id: PropTypes.string,
  /**
   * The class name
   */
  className: PropTypes.string,
  /**
   * The textbox placeholder
   */
  placeholder: PropTypes.string,
  /**
   * The textbox default value
   */
  defaultValue: PropTypes.string,
  /**
   * The button text for accessibility
   */
  buttonText: PropTypes.string,
  /**
   * The label displayed above the textbox
   */
  label: PropTypes.string,
  /**
   * The hint displayed below the label
   */
  hint: PropTypes.string,
  /**
   * The event triggered every time when making changes to the textbox
   */
  onChange: PropTypes.func,
  /**
   * The event triggered every time when pressing any keyboard key
   */
  onKeyDown: PropTypes.func,
  /**
   * The event triggered every time a user click the button
   */
  onButtonClick: PropTypes.func,
  /**
   * The event triggered every time a user click the clear/cross button
   */
  onClearButtonClick: PropTypes.func,
}

InputGroup.defaultProps = {
  id: '',
  className: '',
  placeholder: '',
  defaultValue: '',
  buttonText: '',
  label: '',
  hint: '',
  onChange: undefined,
  onKeyDown: undefined,
  onButtonClick: undefined,
  onClearButtonClick: undefined,
}

export default InputGroup
