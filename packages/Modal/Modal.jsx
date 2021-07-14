/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@tds/core-box'
import HairlineDivider from '@tds/core-hairline-divider'
import DimpleDivider from '@tds/core-dimple-divider'
import Paragraph from '@tds/core-paragraph'
import { safeRest } from '@tds/util-helpers'
import { Close, IconButton } from '@tds/core-interactive-icon'
import { withFocusTrap } from '@tds/shared-hocs'

import { TEXT_SIZES, HEADER_LEVELS, CANCELLATION_BUTTON_TYPES, BUTTON_VARIANTS } from './configs'
import Footer from './Footer/Footer'
import Header from './Header/Header'

import {
  StyledModal,
  CloseButtonWrapper,
  FullScreenOverlay,
  ModalWrapper,
  HeaderWrapper,
  FooterWrapper,
  HairlineDividerWrapper,
  ContentWrapper,
} from './styles'

const FocusTrap = withFocusTrap('div')

/**
 * @version ./package.json
 */
const Modal = ({
  heading,
  headingLevel,
  subHeading,
  subHeadingSize,
  confirmButtonVariant,
  confirmCTAText,
  cancelButtonType,
  cancelCTAText,
  bodyText,
  isOpen,
  onClose,
  onConfirm,
  focusElementAfterClose,
  width,
  showHeaderHairlineDivider,
  showHeaderDimpleDivider,
  showFooterHairlineDivider,
  ...rest
}) => {
  const [offsetHeight, setOffsetHeight] = useState(0)

  const ModalOverlayRef = useRef(null)
  const modalRef = useRef(null)
  const header = useRef(null)

  const handleClose = e => {
    if (focusElementAfterClose && focusElementAfterClose.current) {
      focusElementAfterClose.current.focus()
    }
    return onClose(e)
  }

  const handleKeyDown = e => {
    const key = e.keyCode || e.key
    if (key === 'Escape' || key === 27) {
      return handleClose(e)
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
      handleClose(e)
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

  useEffect(() => {
    const headerHeight = document.querySelector('#header-wrapper')
      ? document.querySelector('#header-wrapper').offsetHeight
      : 0
    const footerHeight = document.querySelector('#footer-wrapper')
      ? document.querySelector('#footer-wrapper').offsetHeight
      : 0
    setOffsetHeight(headerHeight + footerHeight)
  }, [isOpen])

  const modalHeading =
    typeof heading === 'string' ? (
      <Header
        heading={heading}
        headingLevel={headingLevel}
        subHeading={subHeading}
        subHeadingSize={subHeadingSize}
      />
    ) : (
      heading
    )

  const showHeaderDivider = showHeaderHairlineDivider || showHeaderDimpleDivider
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
            <StyledModal ref={modalRef} width={width}>
              <ModalWrapper>
                <Box inset={4} between={4}>
                  <div ref={header} tabIndex="0">
                    <HeaderWrapper id="header-wrapper">
                      <Box between={3}>
                        {modalHeading}
                        {showHeaderHairlineDivider && <HairlineDivider />}
                        {showHeaderDimpleDivider && <DimpleDivider />}
                      </Box>
                    </HeaderWrapper>
                  </div>
                  <ContentWrapper
                    offsetHeight={offsetHeight}
                    showHeaderDivider={showHeaderDivider}
                    showFooter={Boolean(confirmCTAText)}
                    tabIndex="0"
                  >
                    {description}
                  </ContentWrapper>
                  {confirmCTAText && (
                    <FooterWrapper id="footer-wrapper">
                      <Box between={3}>
                        <HairlineDividerWrapper decreaseMargin={showFooterHairlineDivider}>
                          {showFooterHairlineDivider && <HairlineDivider />}
                        </HairlineDividerWrapper>
                        <Footer
                          cancelButtonText={cancelCTAText}
                          cancelButtonType={cancelButtonType}
                          confirmButtonText={confirmCTAText}
                          confirmButtonVariant={confirmButtonVariant}
                          handleClose={handleClose}
                          handleConfirm={onConfirm}
                        />
                      </Box>
                    </FooterWrapper>
                  )}
                </Box>
                <CloseButtonWrapper>
                  <IconButton icon={Close} onClick={handleClose} a11yText="Close" tabIndex="0" />
                </CloseButtonWrapper>
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
  heading: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The visual level of the heading.
   */
  headingLevel: PropTypes.oneOf(Object.values(HEADER_LEVELS)),
  /**
   * Text that will appear underneath the heading.
   */
  subHeading: PropTypes.string,
  /**
   * Size of the subheading text.
   */
  subHeadingSize: PropTypes.oneOf(Object.values(TEXT_SIZES)),
  /**
   *
   * Text that will appear in the middle of the content section.
   */
  bodyText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   *
   * Set the variant of the confirm button
   */
  confirmButtonVariant: PropTypes.oneOf(Object.values(BUTTON_VARIANTS)),
  /**
   *
   * Text that represents confirm CTA.
   */
  confirmCTAText: PropTypes.string,
  /**
   *
   * Text that represents cancel CTA or closing modal action.
   */
  cancelButtonType: PropTypes.oneOf(Object.values(CANCELLATION_BUTTON_TYPES)),
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
  onConfirm: PropTypes.func,
  /**
   *
   * Accepts a React Element's Ref, in order to focus on it after modal closes. Modal will call your ref as `ref.current.focus()`
   * when the Modal closes.
   *
   * We recommend passing the Ref of the button that was used to open the Modal.
   */
  focusElementAfterClose: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any })])
    .isRequired,

  /**
   * Set the width of `Modal`.
   * Accepts a numeric value that lies in the range between minWidth(570) - maxWidth(736).
   */
  width: PropTypes.number,
  /**
   *
   * Show the hairline divider underneath the heading.
   */
  showHeaderHairlineDivider: PropTypes.bool,
  /**
   *
   * Show the hairline divider underneath the heading.
   */
  showHeaderDimpleDivider: PropTypes.bool,
  /**
   *
   * Show the hairline divider above the footer.
   */
  showFooterHairlineDivider: PropTypes.bool,
}

Modal.defaultProps = {
  headingLevel: HEADER_LEVELS.H3,
  subHeading: '',
  subHeadingSize: TEXT_SIZES.MEDIUM,
  confirmButtonVariant: BUTTON_VARIANTS.STANDARD,
  confirmCTAText: '',
  cancelButtonType: CANCELLATION_BUTTON_TYPES.LINK_WITHOUT_ICON,
  cancelCTAText: '',
  width: 570,
  onConfirm: null,
  showHeaderHairlineDivider: true,
  showHeaderDimpleDivider: false,
  showFooterHairlineDivider: true,
}

export default Modal
