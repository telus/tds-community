import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import Button from '@tds/core-button'
import Paragraph from '@tds/core-paragraph'
import { safeRest } from '@tds/util-helpers'
import { Close } from '@tds/core-interactive-icon'
import Heading from '@tds/core-heading'
import {
  StyledModal,
  CTAWrapper,
  CloseButtonWrapper,
  FullScreenOverlay,
  ModalWrapper,
  PaddingOverride,
  OutlineButton,
} from './styles'

const Modal = ({
  heading,
  confirmCTAText,
  cancelCTAText,
  bodyText,
  modalOpen,
  closeModalHandler,
  proceedModalHandler,
  focusElementAfterClose,
  ...rest
}) => {
  const ModalOverlayRef = useRef(null)
  const modalRef = useRef(null)
  const header = useRef(null)
  const firstCTA = useRef(null)
  const closeButton = useRef(null)

  const tabbingHandling = e => {
    if (document.activeElement === firstCTA.current) {
      e.preventDefault()
      return closeButton.current.focus()
    }
    if (document.activeElement === closeButton.current) {
      e.preventDefault()
      return firstCTA.current.focus()
    }
    return null
  }

  const closingModal = () => {
    if (focusElementAfterClose && focusElementAfterClose.current) {
      focusElementAfterClose.current.focus()
    }
    return closeModalHandler()
  }

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      return closingModal()
    }
    if ((e.shiftKey && e.key === 'Tab') || e.key === 'Tab') {
      return tabbingHandling(e)
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
      closingModal()
    }
  }

  useEffect(() => {
    if (modalOpen) {
      document.body.addEventListener('touchmove', preventScroll, { passive: false })
      document.body.addEventListener('keydown', handleKeyDown, { passive: false })
      document.body.addEventListener('mousedown', handleOutSideClick, { passive: false })
      document.body.style.overflow = 'hidden'
      header.current.focus()
    } else {
      removeEventScrolling()
      document.body.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      removeEventScrolling()
      document.body.removeEventListener('keydown', handleKeyDown)
      document.body.removeEventListener('mousedown', handleOutSideClick)
    }
  })

  return (
    <React.Fragment>
      {modalOpen && (
        <FullScreenOverlay
          data-testid="tds-modal-overlay"
          {...safeRest(rest)}
          modalOpen={modalOpen}
          ref={ModalOverlayRef}
        >
          <StyledModal cancelCTAExists={cancelCTAText}>
            {!cancelCTAText && (
              <CloseButtonWrapper>
                <Close onClick={closingModal} ref={closeButton} a11yText="Close" />
              </CloseButtonWrapper>
            )}

            <ModalWrapper ref={modalRef}>
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
                      <Button ref={firstCTA} onClick={proceedModalHandler}>
                        {confirmCTAText}
                      </Button>
                      {cancelCTAText && (
                        <OutlineButton ref={closeButton} onClick={closingModal}>
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
  modalOpen: PropTypes.bool,
  /**
   *
   * Handler Function used to close modal when cancelCTA is null and the default Icon Close Button is being used.
   */
  closeModalHandler: PropTypes.func,
  /**
   *
   * Handler Function used to proceed with modal CTA.
   */
  proceedModalHandler: PropTypes.func.isRequired,
  /**
   *
   * Accepts a React Element's Ref, in order to focus it after modal closes.
   */
  focusElementAfterClose: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any })]),
}

Modal.defaultProps = {
  cancelCTAText: '',
  modalOpen: false,
  focusElementAfterClose: { current: null },
  closeModalHandler: () => {},
}

export default Modal
