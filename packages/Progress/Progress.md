The Progress component is a wrapper-container for an number of Progress.Bar components.
The Progress Bar is a visual representation of linear progression. They provide simple but important information at a quick glance.

### Usage Criteria

- Use to indicate progress within a single limit
- Available in 2 sizes: `default` and `mini`
  - Use the `default` size when displaying ProgressBar with supporting content
  - Use the `mini` size when displaying ProgressBar with minimal supporting content in a condensed layout
  - Limit the use of `mini` size for overview views
- Use variants to provide immediate recognition of status:
  - Will display in Positive variant by default
  - Positive variant indicates account in good standing
  - Negative variant indicates account meeting or exceeding limit
  - Disabled variant indicates account is paused, unavailable, or inactive
- Use the `percentage` prop to indicate completion
- Limit the use of stacked bars (displaying multiple progress/limits within a single `ProgressBar`)

### Minimal Usage

```jsx
<Progress>
  <Progress.Bar percentage={25} variant="positive" a11yLabel="Data Usage" />
</Progress>
<Progress>
  <Progress.Bar percentage={50} variant="negative" a11yLabel="Data Usage" />
</Progress>
<Progress>
  <Progress.Bar percentage={100} variant="disabled" a11yLabel="Data Usage" />
</Progress>
<Progress>
  <Progress.Bar percentage={30} variant="positive" a11yLabel="Data Used" />
  <Progress.Bar percentage={75} variant="negative" a11yLabel="Data Unavailable" />
</Progress>
```

### Mini Size

```jsx
<Progress size="mini">
  <Progress.Bar percentage={25} variant="positive" a11yLabel="Data Usage" />
</Progress>
<Progress size="mini">
  <Progress.Bar percentage={50} variant="negative" a11yLabel="Data Usage" />
</Progress>
<Progress size="mini">
  <Progress.Bar percentage={100} variant="disabled" a11yLabel="Data Usage" />
</Progress>
<Progress size="mini">
  <Progress.Bar percentage={30} variant="negative" a11yLabel="Data Used" />
  <Progress.Bar percentage={75} variant="disabled" a11yLabel="Data Unavailable" />
</Progress>
```

### Accessibility

#### Accessibility features

- `a11yLabel` prop is required to add context to assistive technology
  - This prop should be applied on a per `Progress.Bar` basis to provide maximum context for stacked bars
- Patterns provide additional visual difference between states aside from colour alone
- Progress Bars make use of the ‘progressbar’ role and set related attributes to communicate progress to assistive technology. We chose `<div>` elements instead of `<progress>` for visual parity across all target browsers

#### Accessibility guidelines

- Include a label adjacent or in close proximity to the ProgressBar to provide clear context
- Build components in logical reading order
