import React, { useCallback, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import styled from 'styled-components'
import Drag from './components/Draggable'
import { Header } from 'semantic-ui-react'
import { DragDropDefinition } from '../../'
import DragDropActions from './components/DragDropActions'

export interface DragDropProps {
  droppableId: string
  allRecords: DragDropDefinition[]
  initialSelectedRecords: DragDropDefinition[]
  onSave: (selectedIds: string[]) => void | Promise<void>
  onCancel: () => void
}

interface DragDropState {
  selected: DragDropDefinition[]
  unselected: DragDropDefinition[]
}

const getInitiallySelectedRecords = (
  initallySelectedDragDrop: DragDropDefinition[],
  allDragDrop: DragDropDefinition[]
) => {
  return {
    selected: initallySelectedDragDrop,
    unselected: allDragDrop.filter(
      (value) => !initallySelectedDragDrop.find((val) => val._id === value._id)
    ),
  } as DragDropState
}

const DragDropContainer = styled.div`
  display: flex;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const DropContainer = styled.div<{ isDragging: boolean }>`
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
  overflow: auto;
  background-color: #f8f8f8;
  padding: 30px;
  border-radius: 3px;
  border: ${(props) =>
    props.isDragging ? '2px dashed black' : '1px solid black'};
  width: 300px;
`

const StyledHeader = styled(Header)`
  text-align: center;
`

const DragDrop = ({
  droppableId,
  allRecords,
  initialSelectedRecords,
  onSave,
  onCancel,
}: DragDropProps) => {
  const [dragDrop, setDragDrop] = useState<DragDropState>(
    getInitiallySelectedRecords(initialSelectedRecords, allRecords)
  )

  const onGetKeysOfState = useCallback((res: DropResult) => {
    const destinationState = res.destination?.droppableId.split(
      '-'
    )[0] as keyof DragDropState
    const sourceState = res.source.droppableId.split(
      '-'
    )[0] as keyof DragDropState
    return {
      destinationState,
      sourceState,
    }
  }, [])

  const move = useCallback(
    (res: DropResult) => {
      const { destinationState, sourceState } = onGetKeysOfState(res)
      if (!destinationState) return

      setDragDrop((prevState) => {
        const newState = {
          unselected: Array.from(prevState.unselected),
          selected: Array.from(prevState.selected),
        }

        const draggedRecords = newState[sourceState].splice(res.source.index, 1)

        newState[destinationState].splice(
          res?.destination?.index as number,
          0,
          ...draggedRecords
        )

        return newState
      })
    },
    [onGetKeysOfState, setDragDrop]
  )

  const onDrop = useCallback(
    (res: DropResult) => {
      move(res)
    },
    [move]
  )

  return (
    <Container>
      <DragDropContainer>
        <DragDropContext onDragEnd={onDrop}>
          <Droppable droppableId={`unselected-${droppableId}`}>
            {(provided, snapshot) => (
              <DropContainer
                isDragging={snapshot.isDraggingOver}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <StyledHeader>Unselected</StyledHeader>
                {dragDrop.unselected.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Drag
                          name={item.name}
                          swatchColour={item.swatchColour}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DropContainer>
            )}
          </Droppable>
          <Droppable droppableId={`selected-${droppableId}`}>
            {(provided, snapshot) => (
              <DropContainer
                isDragging={snapshot.isDraggingOver}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <StyledHeader>Selected</StyledHeader>
                {dragDrop.selected.map((item, index) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <Drag
                          name={item.name}
                          swatchColour={item.swatchColour}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </DropContainer>
            )}
          </Droppable>
        </DragDropContext>
      </DragDropContainer>
      <DragDropActions
        onSave={() => onSave(dragDrop.selected.map((value) => value._id))}
        onCancel={onCancel}
      />
    </Container>
  )
}

export default DragDrop
