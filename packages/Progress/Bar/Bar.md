Bar present amount of completion for a task as a linear bar. The **percentage** property
accepts a number representing percentage of completion.

By default, Progress.Bar will be displayed in the **primary** variant. Use primary for the main task or usage data in the view.

```jsx
<Progress>
  <Progress.Bar percentage={40} />
</Progress>
```

Specify a **variant** to create a progress bar for non-primary data

```jsx
<Progress>
  <Progress.Bar percentage={40} variant="secondary" />
</Progress>
```

You can use the **error** variant to indicate a level of failure or warning

```jsx
<Progress>
  <Progress.Bar percentage={40} variant="error" />
</Progress>
```
