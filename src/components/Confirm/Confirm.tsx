import React, { useCallback } from 'react'
import { Modal, Button } from 'semantic-ui-react'

export interface ConfirmProps {
  header: string
  message: string
  onSave: () => void | Promise<void>
  onCancel: () => void | Promise<void>
  open: boolean
}

const Confirm = ({ header, message, onSave, onCancel, open }: ConfirmProps) => {
  const onConfirm = useCallback(() => {
    onSave()
    onCancel()
  }, [onSave, onCancel])

  return (
    <Modal closeIcon onClose={onCancel} open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{message}</Modal.Content>
      <Modal.Actions>
        <Button onClick={onConfirm} primary>
          Yes
        </Button>
        <Button onClick={onCancel}>No</Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Confirm
