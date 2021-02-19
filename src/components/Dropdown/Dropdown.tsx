import React from 'react'
import {
  Dropdown,
  DropdownProps as SemanticDropdownProps,
} from 'semantic-ui-react'
import styled from 'styled-components'
import { DropdownItem } from '../..'

export interface DropdownProps {
  placeholder: string
  options: DropdownItem[]
  onChange: (value: any) => void
  value: any
  dropdownProps?: SemanticDropdownProps
}

const StyledDropdownItem = styled(Dropdown.Item)<{ colour?: string }>`
  .ui.label {
    ${(props) =>
      props.colour ? `background-color: ${props.colour} !important;` : ''}
  }
`

const StyledDropdown = styled(Dropdown)<{ isPlaceholder: boolean }>`
  .default.text {
    ${(props) =>
      props.isPlaceholder
        ? ''
        : 'color: black !important;font-weight: bold !important;'}
  }
`

export default ({
  placeholder,
  options,
  onChange,
  value,
  dropdownProps,
}: DropdownProps) => {
  return (
    <StyledDropdown
      placeholder={placeholder}
      fluid
      selection
      text={options.find((option) => option.value === value)?.text as string}
      isPlaceholder={!value}
      {...dropdownProps}
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
