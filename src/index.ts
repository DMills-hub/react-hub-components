//#imports
import { HSLColor } from 'react-color'
import {
  DropdownItemProps,
  MenuItemProps,
  SemanticCOLORS,
  SemanticICONS,
} from 'semantic-ui-react'
import H_useMediaQueries from './hooks/useMediaQueries'
//#endimports

//#importcomponents
import C_AutoForm from './components/AutoForm'
import C_ButtonGroup from './components/ButtonGroup'
import C_DragDrop from './components/DragDrop'
import C_FileUploader from './components/FileUploader'
import C_FullPageContainer from './components/FullPageContainer'
import C_ImageSlider from './components/ImageSlider'
import C_MenuBarContainer from './components/MenuBarContainer'
import C_MenuBar from './components/MenuBar'
import C_PaginationBar from './components/PaginationBar'
import C_PositionedContainer from './components/PositionedContainer'
import C_Swatch from './components/Swatch'
import C_Dropdown from './components/Dropdown'
//#endimportcomponents

//#exportcomponents
export const AutoForm = C_AutoForm
export const ButtonGroup = C_ButtonGroup
export const DragDrop = C_DragDrop
export const FileUploader = C_FileUploader
export const FullPageContainer = C_FullPageContainer
export const ImageSlider = C_ImageSlider
export const MenuBarContainer = C_MenuBarContainer
export const MenuBar = C_MenuBar
export const PaginationBar = C_PaginationBar
export const PositionedContainer = C_PositionedContainer
export const Swatch = C_Swatch
export const Dropdown = C_Dropdown
//#endexportcomponents

//#exportinterfaces
export interface ButtonGroupButton {
  icon: SemanticICONS
  onClick: () => void
  color?: SemanticCOLORS
}

export type FieldDefinitionType =
  | 'number'
  | 'text'
  | 'swatch'
  | 'file'
  | 'boolean'
  | 'dropdown'

export interface FieldDefinition {
  label: string
  key: string
  type: FieldDefinitionType
  options?: DropdownItem[]
}

export interface DragDropDefinition {
  _id: string
  name: string
  swatchColour?: HSLColor
}

export interface MenuBarItem extends MenuItemProps {
  path: string
  name: string
  icon?: SemanticICONS
}

export interface DropdownItem extends DropdownItemProps {
  colour?: string
}

//#endexportinterfaces

//#exporthooks

export const useMediaQueries = H_useMediaQueries

//#endexporthooks
