Quiet buttons are used sparingly and for an optional action. Mainly used in internal applications like My TELUS (web and app) or Casa; it only comes in one variant and size.

### Usage criteria

- Use for interactions that are not necessarily mandatory
- Use for enhanced experience where if the button does not exist, the customer can still do what they need to
- Keep the text short and precise, recommendation is text that describes an action (Ie. Copy, Edit, Print)
- Make use of the A11yContent core component to provide more written context for assistive technology users for when they navigate a page using only button landmarks
- Buttons should not be disabled

```jsx
<QuietButton>Text</QuietButton>
```

#### QuietButton with Icons

- Only dependent icons can be added into buttons, they can be on the left or right of the label
- The colour of the text and icon have to be the same

```jsx
<QuietButton>
  <Edit />
  Left Icon
</QuietButton>
```

```jsx
<QuietButton>
  Right Icon
  <Print />
</QuietButton>
```

#### Using A11yContent

Use the `A11yContent` component to create invisible text that is read out loud by screen readers.

```jsx
<QuietButton>
  <A11yContent>testing</A11yContent>
  With A11y Content
</QuietButton>
```

#### Adding Functionality

Provide a function as the onClick prop to perform an action when clicked.

```jsx
<QuietButton onClick={() => alert('You clicked the button!')}>Click me!</QuietButton>
```
