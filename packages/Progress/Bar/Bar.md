Bar present amount of completion for a task as a linear bar. The **percentage** property
accepts a number representing percentage of completion.

By default, Progress.Bar will be displayed in the **primary** variant. Use primary for the main task or usage data in the view.

```jsx
<Progress>
  <Progress.Bar percentage={40} a11yLabel="Data Used" />
</Progress>
```

You can use the **negative** variant to indicate a level of failure or warning

```jsx
<Progress>
  <Progress.Bar percentage={40} variant="negative" a11yLabel="Data Used" />
</Progress>
```
