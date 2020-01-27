import React from 'react'

const Negative = () => (
  <svg width="100%" height="24">
    <defs>
      <pattern id="sasmd" patternUnits="userSpaceOnUse" width="8" height="8">
        <rect width="8" height="8" fill="#C12335" />
        <path
          d="M 0,8 l 8,-8 M -2,2 l 4,-4 M 6,10 l 4,-4"
          strokeWidth="2"
          shapeRendering="auto"
          stroke="#e7adb4"
          strokeLinecap="square"
        />
      </pattern>
    </defs>
    <path d="M 0 0 L 0 140 L 2000 2000 L 2000 0 Z" style={{ fill: 'url("#sasmd")' }} />
  </svg>
)

export default Negative
