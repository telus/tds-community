OptimizeImage is used to optimize image files based on screen size

### Usage criteria

- Must use a contentful asset url as the component adapts the url to convert the image file
- May customize quality and screen width sizes. Note: increasing quality and width may affect page performance
- Disable Retina can be set so that an increased image size for retina screens is not displayed
- Use Height Prop allows you to switch the image dimension to height (default is width)

```jsx
<OptimizeImage
  contentfulAssetUrl="https://images.ctfassets.net/3cqlnin176yn/1GfIHDOb3n3uO3wVnKjHZ2/3a3c59c5caa91a315da1b3804cdf0b1b/Alpaca-lets-make-the-future-friendly-Hero-Banner-Tile.jpg"
  alt="alpacas"
  lg={500}
/>
```
