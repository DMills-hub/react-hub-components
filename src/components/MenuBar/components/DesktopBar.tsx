import React from 'react'
import { Menu, Input } from 'semantic-ui-react'
import { MenuBarItem } from '../../..'

interface DesktopBarProps {
  leftItems: MenuBarItem[]
  rightItems?: MenuBarItem[]
  onClickMenuItem: (path: string) => void
}

const DesktopBar = ({
  leftItems,
  rightItems,
  onClickMenuItem,
}: DesktopBarProps) => {
  return (
    <>
      {leftItems.map((item) => (
        <Menu.Item onClick={() => onClickMenuItem(item.path)} {...item} />
      ))}
      {rightItems ? (
        <Menu.Menu position="right">
          {rightItems.map((item) =>
            item.search && item.onSearch ? (
              <Menu.Item>
                <Input
                  onChange={(e) =>
                    item.onSearch ? item.onSearch(e.target.value) : null
                  }
                  icon="search"
                  placeholder="Search..."
                />
              </Menu.Item>
            ) : (
              <Menu.Item onClick={() => onClickMenuItem(item.path)} {...item} />
            )
          )}
        </Menu.Menu>
      ) : null}
    </>
  )
}

export default DesktopBar
