import React from 'react'
import PropTypes from 'prop-types'

import Heading from '@tds/core-heading'
import FlexGrid from '@tds/core-flex-grid'
import Box from '@tds/core-box'

import styles from './SectionHeadingRenderer.modules.scss'

const SectionHeadingRenderer = ({ id, depth, toolbar, children }) => {
  const level = Math.min(depth, 4)

  return (
    <Box below={3}>
      <Heading level={`h${level}`} id={id}>
        <FlexGrid gutter={false}>
          <FlexGrid.Row>
            <FlexGrid.Col>
              {children}
            </FlexGrid.Col>
            <FlexGrid.Col xs={1}>
              <div className={styles.toolbar}>{toolbar}</div>
            </FlexGrid.Col>
          </FlexGrid.Row>
        </FlexGrid>
      </Heading>
    </Box>
  )
}

SectionHeadingRenderer.propTypes = {
  children: PropTypes.node.isRequired,
  toolbar: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
}

export default SectionHeadingRenderer
