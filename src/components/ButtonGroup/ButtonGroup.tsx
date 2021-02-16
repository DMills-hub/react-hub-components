import React from 'react'
import { Button, ButtonGroup } from 'semantic-ui-react'
import { ButtonGroupButton } from '../../'
import styled from 'styled-components'

export interface ButtonGroupProps {
  buttons: ButtonGroupButton[]
}

const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 10px !important;
`

export default ({ buttons }: ButtonGroupProps) => {
  return (
    <StyledButtonGroup>
      {buttons.map((button) => (
        <Button
          color={button.color}
          icon={button.icon}
          onClick={button.onClick}
        />
      ))}
    </StyledButtonGroup>
  )
}
