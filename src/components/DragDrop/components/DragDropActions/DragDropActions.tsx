import React from 'react'
import { Form } from 'semantic-ui-react'
import styled from 'styled-components'

export interface DragDropActionsProps {
  onSave: () => void | Promise<void>
  onCancel: () => void
}

const StyledFormGroup = styled(Form.Group)`
  display: flex !important;
  margin-top: 10px !important;
  justify-content: center !important;
`

const DragDropActions = ({ onSave, onCancel }: DragDropActionsProps) => {
  return (
    <StyledFormGroup>
      <Form.Button primary onClick={onSave}>
        Save
      </Form.Button>
      <Form.Button onClick={onCancel}>Cancel</Form.Button>
    </StyledFormGroup>
  )
}

export default DragDropActions
