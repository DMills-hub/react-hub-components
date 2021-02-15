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
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const PaginationBar = ({
  totalPages,
  onChangePage,
  activePage,
}: PaginationBarProps) => {
  return totalPages !== 1 ? (
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
