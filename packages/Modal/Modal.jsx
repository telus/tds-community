import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import Button from '@tds/core-button'
import Paragraph from '@tds/core-paragraph'
import { safeRest, getCopy } from '@tds/util-helpers'
import { Close } from '@tds/core-interactive-icon'
import copyDictionary from './modalText'
import {
  StyledModal,
  CTAWrapper,
  CloseButtonWrapper,
  FullScreenOverlay,
  Header,
  ModalWrapper,
} from './styles'

const recursiveMap = (children, customFunction) =>
  React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }
    if (child.props.children) {
      return customFunction(
        React.cloneElement(child, {
          children: recursiveMap(child.props.children, customFunction),
        })
      )
    }
    return customFunction(child)
  })

const Modal = ({
  heading,
  copy,
  bodyText,
  modalOpen,
  closeModalHandler,
  proceedModalHandler,
  focusElement,
  children,
  ...rest
}) => {
  const ModalOverlayRef = useRef(null)
  const header = useRef(null)
  const firstCTA = useRef(null)
  const closeButton = useRef(null)

  const cta = getCopy(copyDictionary, copy).confirm
  const cancelCTA = getCopy(copyDictionary, copy).cancel

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
    if (focusElement) focusElement.focus()
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

  useEffect(() => {
    if (modalOpen) {
      document.body.addEventListener('touchmove', preventScroll, { passive: false })
      document.body.addEventListener('keydown', handleKeyDown, { passive: false })
      document.body.style.overflow = 'hidden'
      header.current.focus()
    } else {
      removeEventScrolling()
      document.body.removeEventListener('keydown', handleKeyDown)
    }
    return () => {
      removeEventScrolling()
      document.body.removeEventListener('keydown', handleKeyDown)
    }
  })

  if (children && !modalOpen) {
    const customFunction = element => {
      if (element) {
        return React.cloneElement(element)
      }
      return undefined
    }
    return <React.Fragment>{recursiveMap(children, customFunction)}</React.Fragment>
  }
  return (
    <FullScreenOverlay modalOpen={modalOpen} ref={ModalOverlayRef} {...safeRest(rest)}>
      <StyledModal cancelCTAExists={cancelCTA}>
        {!cancelCTA && (
          <CloseButtonWrapper>
            <Close onClick={closingModal} ref={closeButton} a11yText="Close" />
          </CloseButtonWrapper>
        )}
        <ModalWrapper>
          <Box between={3}>
            <Header ref={header} tabIndex="-1">
              {heading}
            </Header>
            <Paragraph>{bodyText}</Paragraph>
          </Box>
          <CTAWrapper cancelCTAExists={cancelCTA}>
            <Button ref={firstCTA} onClick={proceedModalHandler}>
              {cta}
            </Button>
            {cancelCTA && (
              <Button ref={closeButton} onClick={closingModal}>
                {cancelCTA}
              </Button>
            )}
          </CTAWrapper>
        </ModalWrapper>
      </StyledModal>
    </FullScreenOverlay>
  )
}

const copyShape = PropTypes.shape({
  confirm: PropTypes.string.isRequired,
  cancel: PropTypes.string.isRequired,
})

Modal.propTypes = {
  /**
   * Text that will appear at the top of the content section.
   */
  heading: PropTypes.string,
  /**
   *
   * Text that will appear in the middle of the content section.
   */
  bodyText: PropTypes.string,
  /**
   * Use the `copy` prop to either select provided English or French copy by passing 'en' or 'fr' respectively.
   *
   * To provide your own, pass a JSON object with the keys `confirm` and `cancel`.
   */
  copy: PropTypes.oneOfType([PropTypes.oneOf(['en', 'fr']), copyShape]).isRequired,
  /**
   *
   * Content to be overlaid while the spinner is active. Can be text, any HTML element, or any component.
   */
  children: PropTypes.node,
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
  /** HTML element to which focus is returned when the modal is closed. */
  focusElement: PropTypes.object,
  /**
   *
   * Handler Function used to proceed with modal CTA.
   */
  proceedModalHandler: PropTypes.func.isRequired,
}

Modal.defaultProps = {
  heading: '',
  bodyText: '',
  children: undefined,
  modalOpen: false,
  focusElement: undefined,
  closeModalHandler: () => {},
}

export default Modal
