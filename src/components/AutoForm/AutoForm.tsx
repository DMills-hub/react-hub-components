import React, { useCallback, useState } from 'react'
import { FieldDefinition } from '../../'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
import ColourPicker from './fields/ColourPicker'
import { ColorResult, HSLColor } from 'react-color'
import Dropdown from '../Dropdown'

export interface AutoFormProps {
  fieldDefinitions: FieldDefinition[]
  onSave: (data: { [key: string]: any }) => Promise<void> | void
}

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InputContainer = styled.div<{ booleanField?: boolean }>`
  margin: 0 !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
  width: 100%;

  ${(props) =>
    props.booleanField
      ? 'display: flex; justify-content: space-between; align-items: center;'
      : ''}

  label {
    font-weight: bold !important;
  }
`

interface SelectedColour {
  key: string
  colour: string
}

interface SelectedDropdownOption {
  key: string
  value: any
}

const AutoForm = ({ onSave, fieldDefinitions }: AutoFormProps) => {
  const { register, handleSubmit } = useForm()
  const [colours, setColours] = useState<SelectedColour[]>([])
  const [dropdownOption, setDropdownOption] = useState<
    SelectedDropdownOption[]
  >([])

  const onChangeColour = useCallback(
    (key: string, color: ColorResult) => {
      setColours((prevState) => {
        const colourKeyExists = prevState.find((val) => val.key === key)

        if (colourKeyExists) {
          return prevState.map((value) => {
            if (value.key === key) {
              return {
                key,
                colour: color.hex,
              }
            }
            return value
          })
        }
        return [...prevState, { key, colour: color.hex }]
      })
    },
    [setColours]
  )

  const onChangeDropdown = useCallback(
    (value: any, key: string) => {
      setDropdownOption((p) => {
        const dropdownOptionExists = p.find((val) => val.key === key)

        if (dropdownOptionExists) {
          return p.map((value) => {
            if (value.key === key) {
              return {
                key,
                value,
              }
            }
            return value
          })
        }
        return [...p, { key, value }]
      })
    },
    [setDropdownOption]
  )

  const onSubmit = useCallback(
    async (data: { [key: string]: any }) => {
      if (colours.length === 0 && dropdownOption.length === 0) {
        await onSave(data)
        return
      }

      let coloursObject = {}

      if (colours.length > 0) {
        const formattedColours = colours.map((colour) => {
          return { [colour.key]: colour.colour }
        })
        coloursObject = formattedColours.reduce((prevValue, curValue) => ({
          ...prevValue,
          ...curValue,
        }))
      }

      let dropdownObject

      if (dropdownOption.length > 0) {
        const formattedDropdownOptions = dropdownOption.map(
          (dropdownOption) => {
            return { [dropdownOption.key]: dropdownOption.value }
          }
        )

        dropdownObject = formattedDropdownOptions.reduce(
          (prevValue, curValue) => ({
            ...prevValue,
            ...curValue,
          })
        )
      }

      return onSave({ ...data, ...coloursObject, ...dropdownObject })
    },
    [onSave, colours, dropdownOption]
  )

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {fieldDefinitions.map((field) => {
          switch (field.type) {
            case 'text':
            case 'number':
              return (
                <InputContainer>
                  <label>{field.label}</label>
                  <input
                    ref={register}
                    name={field.key}
                    type={field.type}
                    step={field.type === 'number' ? '.01' : undefined}
                  />
                </InputContainer>
              )
            case 'swatch':
              return (
                <ColourPicker
                  onChange={(color) => onChangeColour(field.key, color)}
                  color={
                    colours.find((colour) => colour.key === field.key)
                      ?.colour as HSLColor | undefined
                  }
                  label={field.label}
                />
              )
            case 'boolean':
              return (
                <InputContainer booleanField={true}>
                  <label>{field.label}</label>
                  <input ref={register} name={field.key} type="checkbox" />
                </InputContainer>
              )
            case 'dropdown':
              return (
                <Dropdown
                  onChange={(value: any) => onChangeDropdown(value, field.key)}
                  placeholder={field.label}
                  value={
                    dropdownOption.find((option) => option.key === field.key)
                      ?.value
                  }
                  options={field.options ?? []}
                />
              )
            case 'file':
              return (
                <InputContainer>
                  <label>{field.label}</label>
                  <input ref={register} name={field.key} type={field.type} />
                </InputContainer>
              )
          }
        })}
        <Form.Group>
          <Form.Button type="submit" primary>
            Save
          </Form.Button>
        </Form.Group>
      </Form>
    </FormContainer>
  )
}

export default AutoForm
