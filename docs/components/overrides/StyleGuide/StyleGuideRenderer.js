import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'rsg-components/Styled'
import cx from 'classnames'
import Logo from 'rsg-components/Logo'
import Markdown from 'rsg-components/Markdown'
import { createGlobalStyle } from 'styled-components'
import { colorSecondary } from '@tds/core-colours'

import CSSReset from '@tds/core-css-reset'
import FlexGrid from '@tds/core-flex-grid'

export const GlobalStyleGuide = createGlobalStyle({
  '[class*=\'rsg--\'].docs_purple-block, .docs_purple-block': {
    backgroundColor: colorSecondary,
  },
  // Full width container with limited with parent: https://css-tricks.com/full-width-containers-limited-width-parents/
  // Only activate with there is no sidebar
  '.rsg--root-1:not(*[class*=\'rsg--hasSidebar\']) .docs_full-width-playground': {
    width: '100vw',
    position: 'relative',
    left: '50%',
    right: '50%',
    marginLeft: '-50vw',
    marginRight: '-50vw',
  }
})

const styles = ({ color, fontFamily, fontSize, sidebarWidth, mq, space, maxWidth }) => ({
  root: {
    backgroundColor: color.baseBackground,
  },
  hasSidebar: {
    paddingLeft: sidebarWidth,
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    maxWidth,
    padding: [[space[2], space[4]]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: space[2],
    },
    display: 'block',
  },
  sidebar: {
    backgroundColor: color.sidebarBackground,
    border: [[color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: sidebarWidth,
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
  },
  logo: {
    padding: space[2],
    borderBottom: [[1, color.border, 'solid']],
  },
  footer: {
    display: 'block',
    color: '#2A2C2E',
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
  },
})

const TdsGrid = ({ children }) => (
  <FlexGrid limitWidth>
    <FlexGrid.Row>
      <FlexGrid.Col xs={12}>
        {children}
      </FlexGrid.Col>
    </FlexGrid.Row>
  </FlexGrid>
)

const TDSSunsetWarning = () => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', padding: '1rem', backgroundColor: 'rgb(255, 248, 230)', marginBottom: '1rem', border: '1px solid rgb(230, 167, 0)', borderRadius: '6px' }}>
    <div style={{ marginRight: '1rem', height: '100%' }}>
      <svg style={{ display: 'inline-block', verticalAlign: 'middle' }} width="20" height="20">
        <path fill="#8C5415" fillRule="evenodd" d="M10.878 1.61l8.315 15.244a1 1 0 0 1-.878 1.48H1.685a1 1 0 0 1-.878-1.48L9.122 1.61a1 1 0 0 1 1.756 0zM10 16.794c.46 0 .833-.402.833-.898 0-.495-.373-.897-.833-.897-.46 0-.833.402-.833.897 0 .496.373.898.833.898zm-.022-2.885c.347 0 .63-.297.64-.67l.179-6.698c.01-.388-.28-.709-.64-.709h-.35c-.361 0-.65.32-.64.708l.171 6.699c.01.373.294.67.64.67z" />
      </svg>
    </div>
    <div>
      <p><strong>TDS Core and TDS Community have NOT been supported for nearly 2 years.</strong></p>
      <p style={{ marginBottom: '0' }}>It is highly recommended that all teams seek support to transition their application to the <a href="https://www.telus.com/universal-design-system/">Universal Design System (UDS) components</a>. This transition will faciliate easier update, such as font changes, and ensure that your applications better reflect the latest vision of the TELUS brand. For more information on how to get support in using UDS, please <a href="https://www.telus.com/universal-design-system/help">contact us</a>. And join our <a href="https://telusdigital.slack.com/archives/C02B9MXKXNH">TELUS Slack channel</a> for the latest updates.</p>
    </div>
  </div>
)

export function StyleGuideRenderer({ classes, title, homepageUrl, children, toc, hasSidebar }) {
  const main = (
    <main className={cx(hasSidebar && classes.content)}>
      <TDSSunsetWarning />
      {children}
      <footer className={classes.footer}>
        <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
      </footer>
    </main>
  )

  return (
    <>
      <CSSReset />
      <GlobalStyleGuide />
      <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
        <a id="styleguidist-top">&nbsp;</a>

        {hasSidebar ? main : <TdsGrid>{main}</TdsGrid>}

        {hasSidebar && (
          <div className={classes.sidebar}>
            <div className={classes.logo}>
              <Logo>{title}</Logo>
            </div>
            {toc}
          </div>
        )}
      </div>
    </>
  )
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
}

StyleGuideRenderer.defaultProps = {
  hasSidebar: undefined,
}

export default Styled(styles)(StyleGuideRenderer)
