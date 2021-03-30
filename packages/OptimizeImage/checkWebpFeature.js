// taken directly from Google developers guide on how to detect browser support for WebP
export default callback => {
  // basic support
  const lossy = 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA'
  // other test forms
  // var kTestImages = {
  //   lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
  //   lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
  //   alpha: "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
  //   animation: "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
  // };
  const img = new Image()
  img.onload = function onLoad() {
    const result = img.width > 0 && img.height > 0
    callback(result)
  }
  img.onerror = function onError() {
    callback(false)
  }
  img.src = `data:image/webp;base64,${lossy}`
}
