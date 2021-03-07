import React, { useCallback } from 'react'
import { ColorResult, BlockPicker } from 'react-color'
import styled from 'styled-components'
import { Popup } from 'semantic-ui-react'
import Swatch from '../../Swatch'

export interface ColourPickerProps {
  onChange: (color: string) => void
  color?: string
}

const ColourPickerContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const ColourPicker = ({ onChange, color }: ColourPickerProps) => {
  const onChangeColour = useCallback(
    (color: ColorResult) => {
      onChange(color.hex)
    },
    [onChange]
  )

  return (
    <ColourPickerContainer>
      <Popup
        on="click"
        trigger={
          <Container>
            <Swatch colour={color} />
          </Container>
        }
      >
        <BlockPicker onChangeComplete={onChangeColour} color={color} />
      </Popup>
    </ColourPickerContainer>
  )
}

export default ColourPicker
