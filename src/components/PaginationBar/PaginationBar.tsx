import React from 'react'
import styled from 'styled-components'
import { Pagination } from 'semantic-ui-react'

export interface PaginationBarProps {
  totalPages: number
  onChangePage: (selectedPage: number) => void
  activePage: number
}

const PaginationBarContainer = styled.div`
  display: flex;
  justify-content: center;
`

const PaginationBar = ({
  totalPages,
  onChangePage,
  activePage,
}: PaginationBarProps) => {
  const isValid = totalPages !== 1 && totalPages !== 0
  return isValid ? (
    <PaginationBarContainer>
      <Pagination
        totalPages={totalPages}
        activePage={activePage}
        onPageChange={(_, data) => onChangePage(data.activePage as number)}
      />
    </PaginationBarContainer>
  ) : null
}

export default PaginationBar
