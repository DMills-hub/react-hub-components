import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

export interface FileUploaderProps {
  onDrop: (fileList: FileList) => Promise<void>
}

const FileUploaderContainer = styled.div`
  background-color: blue;
  border: 3px dotted white;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledParagraph = styled.p`
  font-weight: bold;
  color: white;
  text-align: center;
`

const FileUploader = (props: FileUploaderProps) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const files = acceptedFiles as FileList
      await props.onDrop(files)
    },
    [props]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  return (
    <FileUploaderContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <StyledParagraph>Drop the files here ...</StyledParagraph>
      ) : (
        <StyledParagraph>
          Drag 'n' drop some files here, or click to select files
        </StyledParagraph>
      )}
    </FileUploaderContainer>
  )
}

export default FileUploader
