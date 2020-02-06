Bar present amount of completion for a task as a linear bar. The **percentage** property
accepts a number representing percentage of completion.

By default, `Progress.Bar` will display the positive variant. Use the `variant` prop to change the style between `positive`, `negative`, and `disabled`.

```jsx
<Progress>
  <Progress.Bar percentage={40} a11yLabel="Data Used" />
</Progress>
```

```jsx
<Progress>
  <Progress.Bar percentage={40} variant="negative" a11yLabel="Data Used" />
</Progress>
```
