import React from 'react'
import { Menu } from 'semantic-ui-react'
import { MenuBarItem } from '../../..'

interface MenuItemProps {
  item: MenuBarItem
  onClick: (path: string) => void
}

const MenuItem = ({ item, onClick }: MenuItemProps) => {
  return (
    <Menu.Item
      onClick={() => {
        onClick(item.path)
      }}
      {...item}
    />
  )
}

export default MenuItem
