import React from 'react'
import { ColorResult, HSLColor, SketchPicker } from 'react-color'
import styled from 'styled-components'

export interface ColourPickerProps {
  onChange: (color: ColorResult) => void
  color?: HSLColor
  label: string
}

const ColourPickerContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const StyledLabel = styled.label`
  font-weight: bold;
  margin-bottom: 2px;
`

const ColourPicker = ({ onChange, color, label }: ColourPickerProps) => {
  return (
    <ColourPickerContainer>
      <StyledLabel>{label}</StyledLabel>
      <SketchPicker onChange={onChange} color={color} />
    </ColourPickerContainer>
  )
}

export default ColourPicker
