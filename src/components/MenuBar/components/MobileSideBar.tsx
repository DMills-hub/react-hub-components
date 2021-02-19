import React from 'react'
import { slide as Menu, Styles } from 'react-burger-menu'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import { MenuBarItem } from '../../..'
import MenuItem from './MenuItem'

interface MobileSideBarProps {
  items: MenuBarItem[]
  onClick: (path: string) => void
  isOpen: boolean
  onChangeMobileNav: (isOpen: boolean) => void
  styles?: Partial<Styles>
}

const MenuItemContainer = styled.div`
  display: block;
  margin: 10px;
  text-decoration: none !important;
  a {
    color: white !important;
    font-weight: bold !important;
  }
  outline: none !important;
`

const StyledMenuItem = styled(MenuItem)`
  text-decoration: none !important;
  color: white !important;
  font-weight: bold !important;
`

const MobileSideBar = ({
  items,
  onClick,
  isOpen,
  onChangeMobileNav,
  styles,
}: MobileSideBarProps) => {
  return (
    <Menu
      onStateChange={(state) => onChangeMobileNav(state.isOpen)}
      styles={styles}
      isOpen={isOpen}
    >
      {items.map((item) => (
        <MenuItemContainer>
          <StyledMenuItem item={item} onClick={onClick} />
          {item.icon ? <Icon name={item.icon} /> : null}
        </MenuItemContainer>
      ))}
    </Menu>
  )
}

export default MobileSideBar
