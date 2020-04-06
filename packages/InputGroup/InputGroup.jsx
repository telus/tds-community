import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import DecorativeIcon from '@tds/core-decorative-icon'
import { IconButton, Close } from '@tds/core-interactive-icon'
import A11yContent from '@tds/core-a11y-content'
import Box from '@tds/core-box'
import Text from '@tds/core-text'
import Strong from '@tds/core-strong'
import { safeRest } from '@tds/util-helpers'
import { InputGroupStyle, LabelStyle } from './style'

/**
 * @version ./package.json
 */
const InputGroup = ({
  id,
  closeA11yText,
  defaultValue,
  buttonText,
  label,
  hint,
  onChange,
  onButtonClick,
  onClearButtonClick,
  ...rest
}) => {
  const inputRef = createRef()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (defaultValue) {
      setInputValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <Box between={1}>
      {label && (
        <LabelStyle htmlFor={id}>
          <Text>
            <Strong>{label}</Strong>
          </Text>
          <Text>{hint}</Text>
        </LabelStyle>
      )}
      <InputGroupStyle hasValue={!!inputValue}>
        <input
          {...safeRest(rest)}
          id={id}
          value={inputValue}
          onChange={e => {
            setInputValue(e.target.value)
            if (onChange) onChange(e)
          }}
          ref={inputRef}
        />
        {!!inputValue && (
          <IconButton
            icon={Close}
            a11yText={closeA11yText}
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
  id: PropTypes.string.isRequired,
  /**
   * The close a11y test
   */
  closeA11yText: PropTypes.string,
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
   * The event triggered every time a user click the button
   */
  onButtonClick: PropTypes.func,
  /**
   * The event triggered every time a user click the clear/cross button
   */
  onClearButtonClick: PropTypes.func,
}

InputGroup.defaultProps = {
  closeA11yText: 'Close',
  defaultValue: '',
  buttonText: '',
  label: '',
  hint: '',
  onChange: undefined,
  onButtonClick: undefined,
  onClearButtonClick: undefined,
}

export default InputGroup
