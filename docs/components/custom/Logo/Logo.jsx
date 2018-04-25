import React from 'react'

import logo from './Logo.svg'

import Box from '@tds/core-box'
import ChevronLink from '@tds/core-chevron-link'

const Logo = () => (
  <div>
    <a href="#styleguidist-top" title="TELUS Design System">
      <img src={logo} alt="TELUS Logo" />
    </a>

    <Box horizontal={1} vertical={2}>
      <ChevronLink href="../" variant="secondary" direction="left">
        TDS guidelines
      </ChevronLink>
    </Box>
  </div>
)

export default Logo
