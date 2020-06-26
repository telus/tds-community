### Usage criteria

- Use when you want an image and a text displayed under the image, as a link, to have a separating border either on the right or left and/or under the image/text
- Desktop/large view will have all the items in a single row
- Tablet/medium view will have the `3` items in a row
- Mobile/small view will have `2` items in a row

### Future iterations

- Handle `paddingBottom` on six or more items for `tablet` view
- Handle `borderBottom` and `paddingBottom`/`paddingTop` on 6 or more items in `desktop` view
- Handle the extra `borderBottom` and `borderRight` in `tablet` view when there are only two or three items
- Consider what should happen given a very long text to display
- Consider accepting "node" properties to be flexible to display more than just a link

```jsx
<WaffleGrid
  items={[
    {
      image:
        'https://images.ctfassets.net/3cqlnin176yn/6fbpuI7xGEQwM0sueuEMmy/8768c289e22006227aa1ebf64bd05cf4/stevie.jpg',
      imageAltText: 'The image alt text',
      href: '//telus.com',
      text: 'TELUS',
    },
    {
      image:
        'https://images.ctfassets.net/3cqlnin176yn/6fbpuI7xGEQwM0sueuEMmy/8768c289e22006227aa1ebf64bd05cf4/stevie.jpg',
      imageAltText: 'The image alt text',
      href: '//telus.com',
      text: 'TELUS',
    },
    {
      image:
        'https://images.ctfassets.net/3cqlnin176yn/6fbpuI7xGEQwM0sueuEMmy/8768c289e22006227aa1ebf64bd05cf4/stevie.jpg',
      imageAltText: 'The image alt text',
      href: '//telus.com',
      text: 'TELUS',
    },
    {
      image:
        'https://images.ctfassets.net/3cqlnin176yn/6fbpuI7xGEQwM0sueuEMmy/8768c289e22006227aa1ebf64bd05cf4/stevie.jpg',
      imageAltText: 'The image alt text',
      href: '//telus.com',
      text: 'TELUS',
    },
    {
      image:
        'https://images.ctfassets.net/3cqlnin176yn/6fbpuI7xGEQwM0sueuEMmy/8768c289e22006227aa1ebf64bd05cf4/stevie.jpg',
      imageAltText: 'The image alt text',
      href: '//telus.com',
      text: 'TELUS',
    },
    {
      image:
        'https://images.ctfassets.net/3cqlnin176yn/6fbpuI7xGEQwM0sueuEMmy/8768c289e22006227aa1ebf64bd05cf4/stevie.jpg',
      imageAltText: 'The image alt text',
      href: '//telus.com',
      text: 'TELUS',
    },
  ]}
/>
```
