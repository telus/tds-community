const createIconSizeProp = size => {
  if (typeof size === 'object' && size !== null) {
    const iconSize = {}
    Object.keys(size).map(breakpoint => {
      if (size[breakpoint] === 'small') {
        iconSize[breakpoint] = 20
      } else {
        iconSize[breakpoint] = 24
      }
      return breakpoint
    })
    return iconSize
  }
  return size === 'small' ? 20 : 24
}

export default createIconSizeProp
