import styled from 'styled-components'

const Container = styled.div<{ left: number }>`
  position: absolute;
  left: ${(props) => props.left}px;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
`

export default Container
