import React from 'react'
import { HSLColor } from 'react-color'
import { Card, Header } from 'semantic-ui-react'
import styled from 'styled-components'
import Swatch from '../../../Swatch'

export interface DraggableProps {
  name: string
  swatchColour?: HSLColor
}

const StyledCard = styled(Card)`
  margin-top: 6px !important;
  margin-bottom: 6px !important;
`

const CardContent = styled(Card.Content)<{ flexStart: boolean }>`
  display: flex !important;
  justify-content: ${(props) =>
    props.flexStart ? 'flex-start' : 'space-evenly'} !important;
  align-items: center;
`

const StyledHeader = styled(Header)`
  margin: 0 !important;
`

const Draggable = ({ name, swatchColour }: DraggableProps) => {
  return (
    <StyledCard>
      <CardContent flexStart={!swatchColour}>
        <StyledHeader size="tiny">{name}</StyledHeader>
        {swatchColour ? (
          <Swatch colour={(swatchColour as unknown) as string} />
        ) : null}
      </CardContent>
    </StyledCard>
  )
}

export default Draggable
