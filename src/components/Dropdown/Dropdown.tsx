import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import styled from 'styled-components'
import { DropdownItem } from '../..'

export interface DropdownProps {
  placeholder: string
  options: DropdownItem[]
  onChange: (value: any) => void
  value: any
}

const StyledDropdownItem = styled(Dropdown.Item)<{ colour?: string }>`
  .ui.label {
    ${(props) =>
      props.colour ? `background-color: ${props.colour} !important;` : ''}
  }
`

const StyledDropdown = styled(Dropdown)`
  .default.text {
    color: black !important;
    font-weight: bold !important;
  }
`

export default ({ placeholder, options, onChange, value }: DropdownProps) => {
  return (
    <StyledDropdown
      placeholder={placeholder}
      fluid
      selection
      text={options.find((option) => option.value === value)?.text as string}
    >
      <Dropdown.Menu>
        {options.map((option) => (
          <StyledDropdownItem
            {...option}
            label={option.colour ? { empty: true, circular: true } : undefined}
            onClick={(_: any, { value }: { value: any }) => onChange(value)}
            active={option.value === value}
            selected={option.value === value}
          />
        ))}
      </Dropdown.Menu>
    </StyledDropdown>
  )
}
