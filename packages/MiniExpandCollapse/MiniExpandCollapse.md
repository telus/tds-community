Similar to ExpandCollapse. Clicking on the hyperlink triggers target content to display in a panel directly below CTA.

### Usage criteria

- Mainly used to answer a question potentially posed by a user regarding information they could interpret as unclear
- Should provide more details than a Tooltip
- Expand/collapse titles should be kept short and if possible, sentence case should be used
- Titles should be lead by a strong action word
- Note: unlike `ExpandCollapse`, the panel housing the target content has no inherent spacing

```jsx
<MiniExpandCollapse
  collapseTitle="Why do I see a $5 one-time credit?"
  size={{ xs: 'small', md: 'medium' }}
>
  <Box vertical={4}>
    <Paragraph size="medium">
      As a TELUS customer, you pay one month in advance for your upcoming services. Because you
      changed your services mid-way through your billing cycle, we will:
    </Paragraph>
    <br />
    <UnorderedList size="medium">
      <UnorderedList.Item>
        Credit you for XX days you already paid for with you previous plan, but didn't use
      </UnorderedList.Item>
      <UnorderedList.Item>
        Charge you for the remaining XX days of your billing cycle based on the new plan and add-ons
        you just activated.
      </UnorderedList.Item>
    </UnorderedList>
    <br />
    <Paragraph size="medium">
      The difference between these amount is what forms the one-time credit you'll see on your next
      bill only.
    </Paragraph>
  </Box>
</MiniExpandCollapse>
```

```jsx
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={4}>
      <MiniExpandCollapse
        expandTitle="Hide details"
        collapseTitle="Show details"
        size={{ xs: 'medium', md: 'small' }}
        a11yLabel="Details regarding charges"
      >
        <Box vertical={3}>
          <HairlineDivider />
          <Box between={2}>
            <Box between="space-between" inline>
              <Paragraph size="medium">Buries Drop Wire</Paragraph>
              <Paragraph size="medium">$2.00</Paragraph>
            </Box>
            <Box between="space-between" inline>
              <Paragraph size="medium">Jacks/Outlet</Paragraph>
              <Paragraph size="medium">$75.00</Paragraph>
            </Box>
            <Box between="space-between" inline>
              <Paragraph size="medium">UPS Battery</Paragraph>
              <Paragraph size="medium">$30.00</Paragraph>
            </Box>
          </Box>
        </Box>
      </MiniExpandCollapse>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```

```jsx { "props": { "className": "docs_purple-block" } }
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={4}>
      <MiniExpandCollapse
        expandTitle="Hide details"
        collapseTitle="Show details"
        size={{ xs: 'medium', md: 'small' }}
        invert
      >
        <Box vertical={3}>
          <HairlineDivider />
          <Box between={2}>
            <Box between="space-between" inline>
              <Paragraph size="medium" invert>
                Buries Drop Wire
              </Paragraph>
              <Paragraph size="medium" invert>
                $2.00
              </Paragraph>
            </Box>
            <Box between="space-between" inline>
              <Paragraph size="medium" invert>
                Jacks/Outlet
              </Paragraph>
              <Paragraph size="medium" invert>
                $75.00
              </Paragraph>
            </Box>
            <Box between="space-between" inline>
              <Paragraph size="medium" invert>
                UPS Battery
              </Paragraph>
              <Paragraph size="medium" invert>
                $30.00
              </Paragraph>
            </Box>
          </Box>
        </Box>
      </MiniExpandCollapse>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```

```jsx { "props": { "className": "docs_purple-block" } }
<FlexGrid>
  <FlexGrid.Row>
    <FlexGrid.Col xs={12} md={4}>
      <MiniExpandCollapse
        expandTitle="Hide details"
        collapseTitle="Show details"
        size={{ xs: 'medium', md: 'small' }}
        onToggle={isPanelOpen => {
          return isPanelOpen ? 'open' : 'closed'
        }}
      >
        <Box vertical={3}>
          <HairlineDivider />
          <Box between={2}>
            <Box between="space-between" inline>
              <Paragraph size="medium" invert>
                Buries Drop Wire
              </Paragraph>
              <Paragraph size="medium" invert>
                $2.00
              </Paragraph>
            </Box>
            <Box between="space-between" inline>
              <Paragraph size="medium" invert>
                Jacks/Outlet
              </Paragraph>
              <Paragraph size="medium" invert>
                $75.00
              </Paragraph>
            </Box>
            <Box between="space-between" inline>
              <Paragraph size="medium" invert>
                UPS Battery
              </Paragraph>
              <Paragraph size="medium" invert>
                $30.00
              </Paragraph>
            </Box>
          </Box>
        </Box>
      </MiniExpandCollapse>
    </FlexGrid.Col>
  </FlexGrid.Row>
</FlexGrid>
```
