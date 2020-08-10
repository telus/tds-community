The Below component is designed to add additional space at the bottom of a page. The current TDS Box system is based on the idea of equal space at the top and bottom of components, so Below can be used where additional space is required at the bottom of a page to meet design best practices.

### Usage criteria

By default, if no arguments are passed to the below component, it defaults to providing a TDS level 8 (4 rem in mobile and 6 rem in desktop).

```jsx
<p>This is the last component in a page. It needs some extra space beneath it.</p>
<Below />
```

For more customizable amounts of space below components, the TDS level of space (1 - 8) can be provided as the space property. If space levels outside of 1-8 are provided, no space is provided. Properties must match the TDS box space levels. For additional flexibility, responsive properties can be provided, to provide different amounts of space on mobile and desktop views

```jsx
<p>This is theoretically the last component in a page. It needs space beneath it, but not too much.</p>
<Below space={5} />
<p>This is ACTUALLY the last component in a page, to give an example of responsive below props.</p>
<Below space={{xs: 6, md: 7}} />
```
