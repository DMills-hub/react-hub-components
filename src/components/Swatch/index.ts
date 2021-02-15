import styled from 'styled-components'

const Swatch = styled.div<{ colour: string }>`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  background-color: ${(props) => props.colour};
  border-radius: 2px;
`

export default Swatch
