import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Menu, MenuItemProps } from 'semantic-ui-react'
import { useHistory, useLocation } from 'react-router'

const MenuBarContainer = styled.div<{ width: number; backgroundColor: string }>`
  width: ${(props) => props.width}px;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
`

const StyledMenu = styled(Menu)`
  height: 100%;
`

export interface MenuBarProps<T> {
  width: number
  backgroundColor: string
  activeItemType: T
  items: MenuItemProps[]
}

const MenuBar = <T extends any>({
  width,
  backgroundColor,
  activeItemType,
  items,
}: MenuBarProps<T>) => {
  const history = useHistory()
  const location = useLocation()
  const [activeItem, setActiveItem] = useState<typeof activeItemType>()

  useEffect(() => {
    if (!activeItem) {
      const pathName = location.pathname.split('/')[1]
      const path = `/${pathName}` as T
      setActiveItem(path)
    }
  }, [activeItem, setActiveItem])

  const onChangeRoute = useCallback(
    (name: typeof activeItemType) => {
      setActiveItem(name)
      history.push(name as string)
    },
    [setActiveItem]
  )

  return (
    <MenuBarContainer width={width} backgroundColor={backgroundColor}>
      <StyledMenu fluid vertical tabular>
        {items.map((item) => (
          <Menu.Item
            onClick={() => {
              setActiveItem(item.name as typeof activeItemType)
              onChangeRoute(item.name as typeof activeItemType)
            }}
            {...item}
          />
        ))}
      </StyledMenu>
    </MenuBarContainer>
  )
}

export default MenuBar
