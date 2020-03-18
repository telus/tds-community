### Usage criteria

- Tags are displayed to help customers filter data
- Tags are self-described and are meant to filter only one criterion or category of data per Tag
- Application must control toggled state
- Must use level 3 Box spacing between Tags (inline and vertical)
- May use multiple tags

### Accessibility features

- Tags use HTML buttons to indicate they're interactive and perform an immediate action, they use the 'switch' role
- Tags make use of aria-label to display their label to assistive technology. See [Content Guidelines](#tds-tags-content-guidelines) below for more information
- Tags make use of `aria-checked` to represent its toggled state to assisstive technology
- Tags forwards React refs, allowing you to set focus to it

### Accessibility guide

The following must be fulfilled in order to ensure an accessible experience is delivered to customers.

- Provide an accessible label to Tag in order for assisstive technology to read a label with each individual option
- Provide a visual label above your group of Tags, either as a heading or using medium bold text
- For asynchronous content, follow the example below

### <a id="tds-tags-content-guidelines">Content guidelines</a>

- Recommend to limit text within a Tag to a maximum of 15 characters
- The `Tags` component includes built-in English and French copy to help communicate its filtering capabilities to assistive technology

| Key                    | `copy` language | Default copy                             |
| ---------------------- | --------------- | ---------------------------------------- |
| `a11yLabel`            | `en`            | Filter products by %{tag}                |
|                        | `fr`            | Produits de la catégorie %{tag}          |
| `a11yDescriptionSet`   | `en`            | Products currently filtered by %{tags}   |
|                        | `fr`            | Produits des catégories %{tags}          |
| `a11yDescriptionUnset` | `en`            | No product filters currently applied     |
|                        | `fr`            | Aucun filtre de recherche n’est appliqué |

The above copy can be set by the Tags component’s `copy` prop by choosing either `copy="en"` or `copy="fr"`

By consuming the component like this:

```jsx static
<Tags copy="en">
  <Tags.Item>Blackberry</Tags.Item>
  <Tags.Item>Jolla</Tags.Item>
</Tags>
```

It will render all final copy like this:

```html static
<div id="descriptionbox" class="screen-reader-only">
  <!--
    the a11yDescriptionUnset and a11yDescriptionSet keys
    correspond to the copy in this div
  -->
  No product filters currently applied
</div>
<div class="box-styles">
  <!-- the a11yLabel key corresponds to the value for aria-label here -->
  <button aria-label="Filter by Blackberry" aria-describedby="descriptionbox">
    Blackberry
  </button>
  <button aria-label="Filter by Jolla" aria-describedby="descriptionbox">
    Jolla
  </button>
</div>
```

To override these values for a different language or intent, you may pass in an object to the `copy` prop and pass in copy for these three keys: `a11yLabel`, `a11yDescriptionSet`, `a11yDescriptionUnset`.

```jsx
// As an example, languages like Chinese require different placement of the tag labels
// Here we’re making use of the `%{tags}` token in a11yDescriptionSet to place the tag labels appropriately
<Tags
  copy={{
    a11yLabel: '%{tag}过滤',
    a11yDescriptionSet: '通过%{tags}过滤',
    a11yDescriptionUnset: '当前未应用任何过滤器',
  }}
>
  <Tags.Item>黑莓</Tags.Item>
  <Tags.Item>Jolla</Tags.Item>
</Tags>
```

### Usage

#### Using the `children` prop

```jsx
initialState = {
  tags: [
    {
      children: 'Palm',
      isSelected: false,
      isLoading: false,
    },
    {
      children: 'Jolla',
      isSelected: false,
      isLoading: false,
    },
    {
      children: 'Blackberry',
      isSelected: false,
      isLoading: false,
    },
  ],
}

const handleClick = name => {
  const tags = state.tags.map(tag => {
    if (name === tag.children) {
      return {
        ...tag,
        isSelected: !tag.isSelected,
      }
    }
    return tag
  })
  setState({ tags })
}

;<Tags copy="en" onClick={handleClick}>
  {state.tags.map(tag => (
    <Tags.Item key={tag.children} {...tag} />
  ))}
</Tags>
```

#### Using the `tags` prop

```jsx
initialState = {
  tags: [
    {
      children: 'Palm',
      isSelected: false,
      isLoading: false,
    },
    {
      children: 'Jolla',
      isSelected: false,
      isLoading: false,
    },
    {
      children: 'Blackberry',
      isSelected: false,
      isLoading: false,
    },
  ],
}

const handleClick = name => {
  const tags = state.tags.map(tag => {
    if (name === tag.children) {
      return {
        ...tag,
        isSelected: !tag.isSelected,
      }
    }
    return tag
  })
  setState({ tags })
}
;<Tags copy="fr" tags={state.tags} onClick={handleClick} />
```

### Using Tags with asynchronous content

When `Tags` are used to perform asynchronous tasks, customers should experience the following flow:

1. Customer focuses on a Tag, the Tag’s label and description is read by assisstive technology
2. Customer clicks Tag
   1. A Spinner appears, covering the content to be loaded. The Spinner’s loading copy gets announced
   2. The initiating Tag appears in a loading state
3. After content has loaded
   1. The Spinner disappears
   2. The content is revealed
   3. The initiating Tag no longer appears in a loading state
   4. The Tag’s description is read by assisstive technology

This examples is strictly meant to demonstrate the intended experience when loading asynchronous content.

```jsx
const AsynchronousTags = () => {
  const timeout = React.useRef()
  const [tags, setTags] = React.useState([
    {
      children: 'Palm',
      isSelected: false,
      isLoading: false,
      content: ['Pilot 1000', 'Tungsten T', 'Treo 600'],
    },
    {
      children: 'Jolla',
      isSelected: false,
      isLoading: false,
      content: ['Jolla C', 'Jolla'],
    },
    {
      children: 'Blackberry',
      isSelected: false,
      isLoading: false,
      content: ['BlackBerry Q5', 'BlackBerry Z10', 'BlackBerry Passport', 'BlackBerry Z3'],
    },
  ])
  const [isSpinning, setIsSpinning] = React.useState(false)
  const [content, setContent] = React.useState([])

  const BtnRef = React.useRef()
  const SpinnerRef = React.useRef()

  const handleClick = name => {
    setIsSpinning(true)
    setTags(
      tags.map(tag =>
        name === tag.children
          ? {
              ...tag,
              isLoading: true,
            }
          : tag
      )
    )
    if (timeout.current) {
      clearTimeout(timeout.current)
    }
    timeout.current = setTimeout(() => {
      setIsSpinning(false)
      setTags(
        tags.map(tag => {
          if (name === tag.children || tag.isLoading) {
            return {
              ...tag,
              isSelected: !tag.isSelected,
              isLoading: false,
            }
          }
          return tag
        })
      )
    }, 1000)
  }

  React.useEffect(() => {
    const c = tags
      .filter(tag => tag.isSelected)
      .map(tag => tag.content)
      .reduce((acc, curr) => acc.concat(curr), [])
      .sort()

    setContent(c)
  }, [tags])

  return (
    <Box between={5}>
      <Box between={2}>
        <Text bold>Filter products</Text>
        <Tags copy="en" tags={tags} onClick={handleClick} />
      </Box>
      <Spinner spinning={isSpinning} label="Loading products" inline>
        <Box between={3}>
          <Heading level="h2">Products</Heading>
          <UnorderedList>
            {content.length > 0 ? (
              content.map(c => <UnorderedList.Item>{c}</UnorderedList.Item>)
            ) : (
              <UnorderedList.Item>No products available</UnorderedList.Item>
            )}
          </UnorderedList>
        </Box>
      </Spinner>
    </Box>
  )
}

;<AsynchronousTags />
```
