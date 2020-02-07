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
        bodyText="dummy text of the printing and typesetting industry. This is a test. This is a test"
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
