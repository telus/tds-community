Bar present amount of completion for a task as a linear bar. The **percentage** property
accepts a number representing percentage of completion.

By default, Progress.Bar will be displayed in the **primary** variant. Use primary for the main task or usage data in the view.

```
<Progress>
  <Progress.Bar percentage={40} />
</Progress>
```

Specify a **variant** to create a progress bar for non-primary data

```
<Progress>
  <Progress.Bar percentage={40} variant="secondary"/>
</Progress>
```

You can use the **error** variant to indicate a level of failure or warning

```
<Progress>
  <Progress.Bar percentage={40} variant="error"/>
</Progress>
```

A Progress component can contain any number of progress bars, which will be
stacked where shorter bars appears in front of longer bars.

```
<Progress>
  <Progress.Bar percentage={50} variant="primary" />
  <Progress.Bar percentage={70} variant="secondary" />
  <Progress.Bar percentage={20} variant="error" />
  <Progress.Bar percentage={100} variant="disabled" />
</Progress>
```
