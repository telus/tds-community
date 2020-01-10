import stringHash from 'string-hash'

const JSONSafeStringify = input => {
  let cache = []
  const result = JSON.stringify(input, (key, value) => {
    if (typeof value !== 'object' || value === null) {
      return value
    }
    if (cache.includes(value)) {
      // Circular reference found, discard key
      return undefined
    }
    // Store value in our collection
    cache.push(value)
    return value
  })
  cache = null // Enable garbage collection
  return result
}

const hash = obj => {
  if (!obj) return 0
  return typeof obj !== 'string' ? stringHash(JSONSafeStringify(obj)) : stringHash(obj)
}

export default hash
