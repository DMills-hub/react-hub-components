import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router'
import { MenuBarItem } from '../../'

const MenuBarContainer = styled.div<{ width: number; backgroundColor: string }>`
  width: ${(props) => props.width}px;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
`

const StyledMenu = styled(Menu)`
  height: 100%;
`

export interface MenuBarProps {
  width: number
  backgroundColor: string
  items: MenuBarItem[]
}

const MenuBar = ({ width, backgroundColor, items }: MenuBarProps) => {
  const history = useHistory()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState<string>()

  useEffect(() => {
    if (!activeItem) {
      const pathName = location.pathname.split('/')[1]
      const path = `/${pathName}`
      setActiveItem(path)
    }
  }, [activeItem, setActiveItem])

  const onChangeRoute = useCallback(
    (path: string) => {
      setActiveItem(path)
      history.push(path)
    },
    [setActiveItem]
  )

  return (
    <MenuBarContainer width={width} backgroundColor={backgroundColor}>
      <StyledMenu fluid vertical tabular>
        {items.map((item) => (
          <Menu.Item
            active={activeItem === item.path}
            onClick={() => {
              onChangeRoute(item.path)
            }}
            {...item}
          />
        ))}
      </StyledMenu>
    </MenuBarContainer>
  )
}

export default MenuBar
