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
  const firstCTA = useRef(null)
  const closeButton = useRef(null)

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
              <CloseButtonWrapper>
                <IconButton icon={Close} onClick={handleClose} ref={closeButton} a11yText="Close" />
              </CloseButtonWrapper>

              <ModalWrapper>
                <Box inset={5}>
                  <Box between={3}>
                    <div ref={header} tabIndex="-1">
                      <Heading level="h3" tag="div">
                        {heading}
                      </Heading>
                    </div>
                    <Paragraph>{bodyText}</Paragraph>
                  </Box>
                  <PaddingOverride>
                    <Box vertical={5}>
                      <CTAWrapper cancelCTAExists={cancelCTAText}>
                        <Button ref={firstCTA} onClick={onConfirm}>
                          {confirmCTAText}
                        </Button>
                        {cancelCTAText && (
                          <OutlineButton ref={closeButton} onClick={handleClose}>
                            <Button>{cancelCTAText}</Button>
                          </OutlineButton>
                        )}
                      </CTAWrapper>
                    </Box>
                  </PaddingOverride>
                </Box>
              </ModalWrapper>
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
  heading: PropTypes.string.isRequired,
  /**
   *
   * Text that will appear in the middle of the content section.
   */
  bodyText: PropTypes.string.isRequired,
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
   * Use this prop to change the `open` when the customer clicks the cancel button, close button, background, or hits the escape key. Do not use this handler to perform account-related actions for the customer.
   */
  onClose: PropTypes.func.isRequired,
  /**
   *
   * Handler Function used to proceed with modal CTA.
   */
  onConfirm: PropTypes.func.isRequired,
  /**
   *
   * Accepts a React Element's Ref, in order to focus it after modal closes.
   */
  focusElementAfterClose: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any })])
    .isRequired,
}

Modal.defaultProps = {
  cancelCTAText: '',
}

export default Modal
