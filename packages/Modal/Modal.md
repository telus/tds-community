Before you use modals:

- Does the interaction need to be disruptive?
- Have you tried other less disruptive options but they didn’t meet your needs?
- Is the information critical to be consumed before completing the task on this page?
- Are you not able to include the critical question or information within this page?

If you answered yes to the questions above, you may need to use a modal.

A modal window is a secondary window that opens on top of the main one. Users have to interact with it before they can carry out their task and return to the main window. Use to reveal additional information to a user after they have performed an explicit interaction. They are a strongly discouraged pattern; it's preferred to have all relevant information within a page, and irrelevant information either linked externally or omitted.

There are two kinds of modals, [Content Modal](#tds-content-modal) and [Dialog Modal](#tds-dialog-modal).

### Usage criteria

- Must only appear after a customer interaction, not on page load or any other circumstance
- Open a modal based on explicit customer action e.g. clicking on a button/link/form field
- Must only contain copy and no other content types
- Should keep copy to a minimum
- Only one modal should be "current" at any time
- Refer to [WebAIM documentation](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) for how to achieve modals accessibly
- Don’t use modals to reinforce or repeat information already available in the parent page or view
- Don’t use modals consecutively

### Accessibility features

- When displayed, the modal focus-traps the user, and locks page scroll
- It is scrollable when the viewport height is shorter than the contents of the modal

<div id="tds-content-modal"></div>
### Content Modal

A content modal provides a way for the customer to access additional information without leaving the current page or view, and maintain context. It’s also an effective technique to catch the customer's attention to something vital, a specific task, or set of information.

```jsx
const ExampleContentModal = () => {
  const [showModal, setShowModal] = React.useState(false)
  const focusElementOnClose = React.useRef(null)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const proceed = () => {
    alert('modal proceed')
    setShowModal(false)
  }

  return (
    <div>
      <Modal
        heading="Make a statement for a content modal"
        bodyText="Use a content modal for dismissible content. A content modal provides a way for the user to access additional information without leaving the current page or view, and maintain context"
        confirmCTAText="Primary action"
        focusElementAfterClose={focusElementOnClose}
        onConfirm={proceed}
        onClose={closeModal}
        isOpen={showModal}
      />
      <Box inset={4} between={3}>
        <Heading level="h2">Content Modal</Heading>
        <div>
          <Button ref={focusElementOnClose} onClick={openModal}>
            Open Modal
          </Button>
        </div>
      </Box>
    </div>
  )
}
;<ExampleContentModal />
```

<div id="tds-dialog-modal"></div>
### Dialog Modal

A dialog modal provides information to the customer and prompts them for a response.

### Usage criteria for Dialog Modals

- Use dialog modals as a means for customers to safely make actions that require their full attention, such as confirmations of destructive actions
- The copy on the modal should clearly lead to confirm or reject an impending decision and if possible the outcomes
- Limit content to less than 150 characters for the title, and less than 400 characters for body text
- Avoid dialog modals:
  - if there are more than 2 options for customer consideration
  - as alerts to display errors, warnings, and success messages
  - being shown consecutively

```jsx
const ExampleDialogModal = () => {
  const [showModal, setShowModal] = React.useState(false)
  const focusElementOnClose = React.useRef(null)

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const proceed = () => {
    alert('modal proceed')
    setShowModal(false)
  }

  return (
    <div>
      <Modal
        heading="Ask a question that confirms the customer action which initiated the dialog modal"
        bodyText="Use a dialog modal to provide information and prompt for a response to customer action, which may lead to a significant impact on account or lead to unrecoverable states."
        confirmCTAText="Affrimative action"
        cancelCTAText="Negative action"
        focusElementAfterClose={focusElementOnClose}
        onConfirm={proceed}
        onClose={closeModal}
        isOpen={showModal}
      />
      <Box inset={4} between={3}>
        <Heading level="h2">Dialog Modals</Heading>
        <div>
          <Button ref={focusElementOnClose} onClick={openModal}>
            Open Modal
          </Button>
        </div>
      </Box>
    </div>
  )
}
;<ExampleDialogModal />
```
