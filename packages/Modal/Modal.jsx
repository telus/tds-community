import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import Button from '@tds/core-button'
import Paragraph from '@tds/core-paragraph'
import { safeRest } from '@tds/util-helpers'
import { Close, IconButton } from '@tds/core-interactive-icon'
import Heading from '@tds/core-heading'
import { withFocusTrap } from '@tds/shared-hocs'

import {
  StyledModal,
  CTAWrapper,
  CloseButtonWrapper,
  FullScreenOverlay,
  ModalWrapper,
  PaddingOverride,
  OutlineButton,
} from './styles'

const FocusTrap = withFocusTrap('div')

/**
 * @version ./package.json
 */
const Modal = ({
  heading,
  confirmCTAText,
  cancelCTAText,
  bodyText,
  isOpen,
  onClose,
  onConfirm,
  focusElementAfterClose,
  ...rest
}) => {
  const ModalOverlayRef = useRef(null)
  const modalRef = useRef(null)
  const header = useRef(null)

  const handleClose = () => {
    if (focusElementAfterClose && focusElementAfterClose.current) {
      focusElementAfterClose.current.focus()
    }
    return onClose()
  }

  const handleKeyDown = e => {
    const key = e.keyCode || e.key
    if (key === 'Escape' || key === 27) {
      return handleClose()
    }
    return null
  }

  const preventScroll = e => {
    if (ModalOverlayRef.current.contains(e.targetTouches[0].target)) {
      e.preventDefault()
    }
  }

  const removeEventScrolling = () => {
    document.body.removeEventListener('touchmove', preventScroll)
    document.body.style.overflow = 'visible'
  }

  const handleOutSideClick = e => {
    if (!modalRef.current.contains(e.target)) {
      handleClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('touchmove', preventScroll, { passive: false })
      document.body.addEventListener('keydown', handleKeyDown, { passive: false })
      document.body.addEventListener('mousedown', handleOutSideClick, { passive: false })
      document.body.style.overflow = 'hidden'
      header.current.focus()
    } else {
      removeEventScrolling()
      document.body.removeEventListener('keydown', handleKeyDown)
      document.body.removeEventListener('mousedown', handleOutSideClick)
    }
    return () => {
      removeEventScrolling()
      document.body.removeEventListener('keydown', handleKeyDown)
      document.body.removeEventListener('mousedown', handleOutSideClick)
    }
  }, [isOpen])

  const modalHeading =
    typeof bodyText === 'string' ? (
      <Heading level="h3" tag="div">
        {heading}
      </Heading>
    ) : (
      heading
    )
  const description = typeof bodyText === 'string' ? <Paragraph>{bodyText}</Paragraph> : bodyText
  return (
    <React.Fragment>
      {isOpen && (
        <FocusTrap>
          <FullScreenOverlay
            data-testid="tds-modal-overlay"
            {...safeRest(rest)}
            isOpen={isOpen}
            ref={ModalOverlayRef}
          >
            <StyledModal ref={modalRef}>
              <ModalWrapper>
                <Box inset={5}>
                  <Box between={3}>
                    <div ref={header} tabIndex="-1">
                      {modalHeading}
                    </div>
                    {description}
                  </Box>
                  <PaddingOverride>
                    <Box vertical={5}>
                      <CTAWrapper cancelCTAExists={cancelCTAText}>
                        <Button onClick={onConfirm}>{confirmCTAText}</Button>
                        {cancelCTAText && (
                          <OutlineButton onClick={handleClose}>{cancelCTAText}</OutlineButton>
                        )}
                      </CTAWrapper>
                    </Box>
                  </PaddingOverride>
                </Box>
              </ModalWrapper>
              <CloseButtonWrapper>
                <IconButton icon={Close} onClick={handleClose} a11yText="Close" />
              </CloseButtonWrapper>
            </StyledModal>
          </FullScreenOverlay>
        </FocusTrap>
      )}
    </React.Fragment>
  )
}

Modal.propTypes = {
  /**
   * Text that will appear at the top of the content section.
   */
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   *
   * Text that will appear in the middle of the content section.
   */
  bodyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   *
   * Text that represents confirm CTA.
   */
  confirmCTAText: PropTypes.string.isRequired,
  /**
   *
   * Text that represents cancel CTA or closing modal action.
   */
  cancelCTAText: PropTypes.string,
  /**
   *
   * Boolean variable that controls open and closed state of modal.
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   *
   * Use this prop to change the value of `isOpen` when the customer clicks the cancel button, close button, background, or hits the escape key.
   * Modal will also call the ref passed to `focusElementAfterClose` to set focus to it, as `ref.current.focus()`.
   *
   * Do not use this handler to perform account-related actions for the customer.
   */
  onClose: PropTypes.func.isRequired,
  /**
   *
   * Handler Function used to proceed with modal CTA.
   */
  onConfirm: PropTypes.func.isRequired,
  /**
   *
   * Accepts a React Element's Ref, in order to focus on it after modal closes. Modal will call your ref as `ref.current.focus()`
   * when the Modal closes.
   *
   * We recommend passing the Ref of the button that was used to open the Modal.
   */
  focusElementAfterClose: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any })])
    .isRequired,
}

Modal.defaultProps = {
  cancelCTAText: '',
}

export default Modal
