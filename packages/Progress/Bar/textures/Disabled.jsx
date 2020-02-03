import React from 'react'
import { uniqueId } from '@tds/util-helpers'

const Disabled = () => {
  const svgId = uniqueId('DisabledProgress')
  return (
    <svg width="100%" height="24">
      <defs>
        <pattern id={svgId} patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#D8D8D8" />
          <circle cx="4" cy="4" r="2" fill="#71757B" stroke="#71757B" strokeWidth="0" />
          <circle cx="0" cy="0" r="2" fill="#71757B" stroke="#71757B" strokeWidth="0" />
          <circle cx="0" cy="8" r="2" fill="#71757B" stroke="#71757B" strokeWidth="0" />
          <circle cx="8" cy="0" r="2" fill="#71757B" stroke="#71757B" strokeWidth="0" />
          <circle cx="8" cy="8" r="2" fill="#71757B" stroke="#71757B" strokeWidth="0" />
        </pattern>
      </defs>
      <path d="M 0 0 L 0 140 L 2000 2000 L 2000 0 Z" style={{ fill: `url("#${svgId}")` }} />
    </svg>
  )
}

export default Disabled
