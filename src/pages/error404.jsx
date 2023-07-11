import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledError404 = styled.div`
  background-color:  var(--background-primary);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
`

const Error404 = () => {
  return (
    <StyledError404>
      <h1>Oops...</h1>
      <h1>Page not found</h1>
      <Link to='/'><button>Go back to home</button></Link>
    </StyledError404>
  )
}

export default Error404