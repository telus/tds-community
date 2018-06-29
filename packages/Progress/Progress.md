The Progress component is a wrapper-container for an number of Progress.Bar components.

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
