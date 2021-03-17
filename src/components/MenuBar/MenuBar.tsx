import React from 'react'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'
import { MenuBarItem } from '../../'
import useMediaQueries from '../../hooks/useMediaQueries'
import MobileSideBar from './components/MobileSideBar'
import { Styles } from 'react-burger-menu'
import DesktopBar from './components/DesktopBar'

const StyledMenu = styled(Menu)`
  margin: 0 !important;
`

export interface MenuBarProps {
  backgroundColor: string
  leftItems: MenuBarItem[]
  rightItems?: MenuBarItem[]
  onClickMenuItem: (path: string) => void
  isMobileNavOpen: boolean
  onChangeMobileNav: (isOpen: boolean) => void
  mobileNavStyles: Partial<Styles>
}

const Container = styled.div<{ backgroundColor: string }>`
  width: 100%;
  background-color: ${(props) => props.backgroundColor};
`

const MenuBar = ({
  backgroundColor,
  leftItems,
  rightItems,
  onClickMenuItem,
  isMobileNavOpen,
  onChangeMobileNav,
  mobileNavStyles,
}: MenuBarProps) => {
  const { isMobile } = useMediaQueries()

  const allItems = [...leftItems, ...(rightItems ?? [])]

  return (
    <Container backgroundColor={backgroundColor}>
      {!isMobile ? (
        <StyledMenu tabular secondary>
          <DesktopBar
            leftItems={leftItems}
            rightItems={rightItems}
            onClickMenuItem={onClickMenuItem}
          />
        </StyledMenu>
      ) : (
        <MobileSideBar
          items={allItems}
          isOpen={isMobileNavOpen}
          onClick={onClickMenuItem}
          onChangeMobileNav={onChangeMobileNav}
          styles={mobileNavStyles}
        />
      )}
    </Container>
  )
}

export default MenuBar
