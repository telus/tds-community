### Wrapping TDS elements

When used as a container for other components, it enhances a sub-set of TDS core components by adding `skeleton` property.
The `skeleton` property will transform the child component into a skeleton. The `skeleton` property can be set to an object
with options to customize how the skeleton will appear.

| TDS Core    | skeleton options | type   | default   | Description                                       |
| ----------- | ---------------- | ------ | --------- | ------------------------------------------------- |
| **Text**    | lines            | number | 1         | Number of lines to appear as a skeleton           |
|             | characters       | number | undefined | Character width of skeleton (default is full row) |
| **Heading** | characters       | number | undefined | Character width of skeleton (default is full row) |
| **Image**   | none             | n/a    | n/a       | Images always appear as a circle in skeleton form |

### Example

The following is an example component consisting of several TDS core components. By wrapping it in `<Skeleton />` we can easily
provide a skeletonized state for this component.

```jsx
<SkeletonProvider show={true}>
  <Card variant="grey">
    <Box inline between={3}>
      <Box>
        <Image
          src="image-example.jpg"
          rounded="circle"
          width={140}
          height={140}
          alt="Image of co-workers collaborating"
          skeleton
        />
      </Box>
      <Box>
        <Heading skeleton={{ characters: 5 }} level="h1">
          Newton / Dilucca
        </Heading>
        <Text skeleton={{ lines: 2, characters: 20 }}>
          euro-pop assault table monofilament uplink saturation point industrial grade monofilament
          corrupted A.I. network.
        </Text>
      </Box>
    </Box>
  </Card>
</SkeletonProvider>
```

### Custom skeleton rendering

You can override or provide a custom skeleton to any element by passing a component to the `skeleton` property. For example,
the community contribuited `<Testimonial />` component can be skeletonized like this:

```jsx
<SkeletonProvider show={true}>
  <Testimonial
    testimonial={`“My office is where ever my customers are. TELUS helps me stay connected whether I'm making a sale or doing payroll.”`}
    image={
      <Image
        src="image-example.jpg"
        rounded="circle"
        width={60}
        height={60}
        alt="Image of co-workers collaborating"
      />
    }
    title="Dave Smith, Foreman"
    additionalInfo="Pinnacle Reforestation"
    skeleton={
      /* Place custom skeleton componenent here: */
      () => (
        <SkeletonProvider>
          <Card>
            <Text skeleton={{ characters: 15 }}>s</Text>
            <Box inline between={2}>
              <Image rounded="circle" width={60} height={60} src={''} alt="loading..." skeleton />
              <Text skeleton={{ characters: 10, lines: 2 }}>s</Text>
            </Box>
          </Card>
        </SkeletonProvider>
      )
    }
  />
</SkeletonProvider>
```
