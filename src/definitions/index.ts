import { HSLColor } from 'react-color'
import { SemanticCOLORS, SemanticICONS } from 'semantic-ui-react'

export interface ButtonGroupButton {
  icon: SemanticICONS
  onClick: () => void
  color?: SemanticCOLORS
}

export type FieldDefinitionType = 'number' | 'text' | 'swatch' | 'file'

export interface FieldDefinition {
  label: string
  key: string
  type: FieldDefinitionType
}

export interface DragDropDefinition {
  _id: string
  name: string
  swatchColour?: HSLColor
}
