const warn = (componentName, message) => {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  console.warn(`[TDS] ${componentName}: ${message}`) // eslint-disable-line no-console
}

export default warn
