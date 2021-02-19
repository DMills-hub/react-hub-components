import { useMediaQuery } from 'react-responsive'

export default () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' })
  return { isTabletOrMobile, isMobile }
}
