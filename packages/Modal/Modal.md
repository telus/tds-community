A modal is used to reveal additional information to a user after they have performed an explicit interaction. They are a strongly discouraged pattern; it's preferred to have all relevant information within a page, and irrelevant information either linked externally or omitted.

### Usage Criteria

- `Modals` must only appear after a user interaction, not on page load or any other circumstance
- `Modals` must only be triggered by a button
- `Modals` must only contain copy and no other content types
- Should keep copy to a minimum
- Refer to [WebAIM documentation](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for how to achieve modals accessibly

### Accessibility

- When displayed, the modal focus traps the user, and locks page scroll.
- It is scrollable when the viewport height is shorter than the contents of the modal

```jsx
const ExampleComponent = () => {
  const [showModal, toggleModal] = React.useState('')
  const focusElementOnClose = React.useRef(null)

  const openModal = () => {
    toggleModal(true)
  }

  const closeModal = () => {
    toggleModal(false)
  }

  const proceed = () => {
    alert('modal proceed')
  }

  return (
    <div>
      <Modal
        heading="Are you sure you want to disable internet?"
        bodyText="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        cancelCTAText="Cancel"
        confirmCTAText="Confirm"
        proceedModalHandler={proceed}
        focusElementAfterClose={focusElementOnClose}
        closeModalHandler={closeModal}
        modalOpen={showModal}
      />
      <Box inset={4}>
        <Box between={3}>
          <Heading level="h2">Availability Check</Heading>
          <Paragraph>Ready to order? Click here to check if the product is available.</Paragraph>
        </Box>
      </Box>
      <Box horizontal={4}>
        <Button ref={focusElementOnClose} onClick={openModal}>
          Open Modal
        </Button>
      </Box>
    </div>
  )
}
;<ExampleComponent />
```
