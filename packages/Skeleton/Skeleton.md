### Basic Usage

By default, `Skeleton` will be set to 100% width with a line height of 18px.

```jsx
<Skeleton />
```

### Controlling Size

The height and width of the `Skeleton` can be customized to match the line height of the text that is being loaded. The `size` prop adjusts the line height, and the `characters` prop will adjust the width in increments of the selected `size`.

| `size` Option | Line Height |
| ------------- | ----------- |
| xs            | 18px        |
| sm            | 24px        |
| md            | 36px        |
| lg            | 48px        |
| xl            | 64px        |

```jsx
<Skeleton characters={10} size="md" />
```
