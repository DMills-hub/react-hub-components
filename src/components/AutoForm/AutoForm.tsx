import React, { useCallback, useEffect } from 'react'
import { FieldDefinition } from '../../'
import styled from 'styled-components'
import { Form } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
import ColourPicker from './fields/ColourPicker'
import Dropdown from '../Dropdown'

export interface AutoFormProps {
  fieldDefinitions: FieldDefinition[]
  onSave: (data: { [key: string]: any }) => Promise<void> | void
  defaultValues?: { [key: string]: any }
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

const AutoForm = ({
  onSave,
  fieldDefinitions,
  defaultValues,
}: AutoFormProps) => {
  const { setValue, register, getValues, watch } = useForm({
    defaultValues,
  })

  const allFields = watch()

  useEffect(() => {
    fieldDefinitions.map((field) =>
      register({ name: field.key }, { required: true })
    )
  }, [fieldDefinitions, register])

  const onSubmit = useCallback(async () => {
    const data = getValues()
    await onSave(data)
  }, [onSave, getValues])

  const onSetValue = useCallback(
    (name: string, value: any) => {
      watch()
      setValue(name, value)
    },
    [setValue, watch]
  )

  return (
    <FormContainer>
      <Form onSubmit={onSubmit}>
        {fieldDefinitions.map((field) => {
          const value = allFields[field.key]
          switch (field.type) {
            case 'text':
            case 'number':
              return (
                <InputContainer>
                  <label>{field.label}</label>
                  <input
                    onChange={(e) => onSetValue(field.key, e.target.value)}
                    name={field.key}
                    type={field.type}
                    step={field.type === 'number' ? '.01' : undefined}
                    value={value}
                  />
                </InputContainer>
              )
            case 'swatch':
              return (
                <ColourPicker
                  onChange={(color) => onSetValue(field.key, color)}
                  color={value}
                />
              )
            case 'boolean':
              return (
                <InputContainer booleanField={true}>
                  <label>{field.label}</label>
                  <input
                    onChange={(e) => onSetValue(field.key, e.target.checked)}
                    name={field.key}
                    type="checkbox"
                    checked={value}
                  />
                </InputContainer>
              )
            case 'dropdown':
              return (
                <InputContainer>
                  <label>{field.label}</label>
                  <Dropdown
                    onChange={(value: any) => onSetValue(field.key, value)}
                    placeholder={field.label}
                    value={value}
                    options={field.options ?? []}
                  />
                </InputContainer>
              )
            case 'file':
              return (
                <InputContainer>
                  <label>{field.label}</label>
                  <input
                    onChange={(e) => onSetValue(field.key, e.target.files)}
                    name={field.key}
                    type={field.type}
                  />
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
