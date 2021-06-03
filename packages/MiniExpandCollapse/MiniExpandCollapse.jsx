import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FadeAndReveal } from '@tds/shared-animation'
import { responsiveProps } from '@tds/util-prop-types'

import Link from './Link/Link'

/**
 * A hyperlink to expand target content currently not in view.
 * @version ./package.json
 * @visibleName MiniExpandCollapse (beta)
 */
const MiniExpandCollapse = ({
  children,
  expandTitle,
  collapseTitle,
  onToggle,
  size,
  invert,
  a11yLabel,
}) => {
  const contentRef = useRef(null)
  const [isPanelOpen, setPanel] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const togglePanel = () => {
    setPanel(!isPanelOpen)
    onToggle(isPanelOpen)
  }
  useEffect(() => {
    if (contentRef.current.offsetHeight !== contentHeight) {
      setContentHeight(contentRef.current.offsetHeight)
    }
  }, [contentHeight])

  return (
    <div>
      <Link
        expandTitle={expandTitle}
        collapseTitle={collapseTitle}
        isPanelOpen={isPanelOpen}
        togglePanel={togglePanel}
        size={size}
        invert={invert}
        a11yLabel={a11yLabel}
      />
      <FadeAndReveal delay={0} timeout={500} in={isPanelOpen} height={contentHeight} duration={500}>
        {() => <div ref={contentRef}>{children}</div>}
      </FadeAndReveal>
    </div>
  )
}

MiniExpandCollapse.propTypes = {
  /**
   * Link text when content is collapsed/hidden.
   */
  collapseTitle: PropTypes.string.isRequired,
  /**
   * Link text when target content is expanded. Defaults to collapse title.
   */
  expandTitle: PropTypes.string,
  /**
   * Function to add any extra logic required for onToggle event. Pass isPanelOpen prop if function needs it for logic.
   */
  onToggle: PropTypes.func,
  /**
   * Required. Size of link text and icon. One of `small, medium, large` as a [**responsive prop**](#responsiveProps).
   */
  size: responsiveProps(PropTypes.oneOf(['small', 'medium', 'large'])).isRequired,
  /**
   * Invert the style to appear light on dark backgrounds.
   */
  invert: PropTypes.bool,
  /**
   * Additional title text to provide more context for users using screen readers.
   */
  a11yLabel: PropTypes.string,
  /**
   * Target content to expand downward. Can be text, any HTML element, or any component.
   */
  children: PropTypes.node.isRequired,
}

MiniExpandCollapse.defaultProps = {
  expandTitle: null,
  onToggle: () => {},
  invert: false,
  a11yLabel: undefined,
}

export default MiniExpandCollapse
