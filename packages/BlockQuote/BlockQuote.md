The `BlockQuote` component wraps content in an HTML `<blockquote>` and `<span>` element and renders it as an `@tds/core-heading <h2>` component.

### Usage Criteria

- Use to highlight text to the user
- If using as a quote, always attribute a name to your quote
- Always include the correct quotation marks for EN (“”) and FR («»)
- If you’re quoting from an external source, include the source as a hyperlink
- If using a link within `BlockQuote`, use `Link` from `@tds/core-link`
- Indicate cuts to quotes with ellipses (...) and edits with square brackets `[`...`]`

```jsx
<BlockQuote>
  “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
  labore et dolore magna aliqua” - <TdsLink href="https://tds.telus.com/">Name</TdsLink>
</BlockQuote>
```
