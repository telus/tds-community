// taken directly from Google developers guide on how to detect browser support for WebP
export default async callback => {
  // basic support. other test forms exist for lossless, alpha, and animation types.
  // check google guide if data strings are needed
  const lossy = 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'

  const img = document.createElement('img')
  img.onload = function onLoad() {
    const result = img.width > 0 && img.height > 0
    callback(result)
  }
  img.onerror = function onError() {
    callback(false)
  }
  img.src = `data:image/webp;base64,${lossy}`
}
