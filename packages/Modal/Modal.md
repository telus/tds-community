```jsx
initialState = {
  toggleModal: false,
}

const openModal = () => {
  setState({ toggleModal: true })
}

const closeModal = () => {
  setState({ toggleModal: false })
}

const proceed = () => {
  alert('modal proceed')
}

const content = {
  confirm: 'Confirm',
  cancel: 'Cancel',
}

;<Modal
  heading="Are you sure you want to disable internet?"
  bodyText="dummy text of the printing and typesetting industry. Lorem Ipsum has been the jfadsiof jifodasjf oijs oifdafsdoi oif jasd"
  copy={content}
  proceedModalHandler={proceed}
  closeModalHandler={closeModal}
  modalOpen={state.toggleModal}
>
  <Box inset={4}>
    <Box between={3}>
      <Heading level="h2">Availability Check</Heading>
      <Paragraph>Ready to order? Click here to check if the product is available.</Paragraph>
    </Box>
    <Box vertical={3}>
      <Button onClick={openModal}>Open Modal</Button>
    </Box>
  </Box>
</Modal>
```
