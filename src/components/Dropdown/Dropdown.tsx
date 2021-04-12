import React from 'react'
import {
  Dropdown,
  DropdownProps as SemanticDropdownProps,
  DropdownItemProps,
} from 'semantic-ui-react'

export interface DropdownProps {
  placeholder: string
  options: DropdownItemProps[]
  onChange: (value: any) => void
  value: any
  dropdownProps?: SemanticDropdownProps
}

export default ({
  placeholder,
  options,
  onChange,
  value,
  dropdownProps,
}: DropdownProps) => {
  return (
    <Dropdown
      options={options}
      placeholder={placeholder}
      fluid
      selection
      {...dropdownProps}
      onChange={(_, { value }) => onChange(value)}
      value={value}
    />
  )
}
