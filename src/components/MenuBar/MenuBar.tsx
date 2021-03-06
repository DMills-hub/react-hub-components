import React from 'react'
import styled from 'styled-components'
import { Menu, Image } from 'semantic-ui-react'
import { MenuBarItem } from '../../'
import useMediaQueries from '../../hooks/useMediaQueries'
import MenuItem from './components/MenuItem'
import MobileSideBar from './components/MobileSideBar'
import { Styles } from 'react-burger-menu'

const MenuBarContainer = styled.div<{
  width?: number
  isTabletOrMobile: boolean
  spaceBetweenLogo?: number
}>`
  width: 100%;
  height: 100%;
  ${(props) => (props.isTabletOrMobile ? 'display: flex;' : '')}
  ${(props) =>
    props.isTabletOrMobile && props.spaceBetweenLogo
      ? `padding-left: ${props.spaceBetweenLogo}px`
      : props.spaceBetweenLogo
      ? `padding-top: ${props.spaceBetweenLogo}px`
      : ''}
`

const StyledMenu = styled(Menu)`
  height: 100%;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`

const LogoContainer = styled.div`
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.div<{
  isTabletOrPhone: boolean
  width: number
  backgroundColour: string
}>`
  height: ${(props) => (props.isTabletOrPhone ? '70px' : '100%')};
  width: ${(props) => (props.isTabletOrPhone ? '100%' : `${props.width}px`)};
  ${(props) => (props.isTabletOrPhone ? 'display: flex;' : '')}
  background-color: ${(props) => props.backgroundColour};
`

export interface MenuBarProps {
  width: number
  backgroundColor: string
  items: MenuBarItem[]
  logoUrl?: string
  onClickLogo?: () => void
  onClickMenuItem: (path: string) => void
  isMobileNavOpen: boolean
  onChangeMobileNav: (isOpen: boolean) => void
  mobileNavStyles: Partial<Styles>
  logoWidth?: number
  spaceBetweenLogo?: number
}

const MenuBar = ({
  width,
  backgroundColor,
  items,
  logoUrl,
  onClickLogo,
  onClickMenuItem,
  isMobileNavOpen,
  onChangeMobileNav,
  mobileNavStyles,
  logoWidth,
  spaceBetweenLogo,
}: MenuBarProps) => {
  const { isTabletOrMobile, isMobile } = useMediaQueries()

  return (
    <Container
      backgroundColour={backgroundColor}
      isTabletOrPhone={isTabletOrMobile}
      width={width}
    >
      {logoUrl && !isMobile ? (
        <LogoContainer>
          <StyledImage
            onClick={() => {
              if (onClickLogo) {
                onClickLogo()
              }
            }}
            src={logoUrl}
            width={logoWidth}
          />
        </LogoContainer>
      ) : isMobile ? (
        <MobileSideBar
          items={items}
          isOpen={isMobileNavOpen}
          onClick={onClickMenuItem}
          onChangeMobileNav={onChangeMobileNav}
          styles={mobileNavStyles}
        />
      ) : null}
      {!isMobile ? (
        <MenuBarContainer
          spaceBetweenLogo={spaceBetweenLogo}
          isTabletOrMobile={isTabletOrMobile}
          width={width}
        >
          <StyledMenu fluid vertical={isTabletOrMobile ? false : true} tabular>
            {items.map((item) => (
              <MenuItem item={item} onClick={onClickMenuItem} />
            ))}
          </StyledMenu>
        </MenuBarContainer>
      ) : null}
    </Container>
  )
}

export default MenuBar
