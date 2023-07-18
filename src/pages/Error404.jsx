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

  h1{
    font-size: 44px;
    margin-bottom: 20px;
  }
  small{
    color: var(--text-secondary);
  }

  button{
    color: #fff;
    margin-top: 30px;
    cursor: pointer;
  }
`

const Error404 = () => {
  return (
    <StyledError404>
      <h1>404 - Looks like you're lost.</h1>
      <small>May be this page used to exist or you just spell something wrong.</small>
      <small>Chances are you spelled something wrong, so you can double check the URL?</small>
      <Link to='/'><button className="btn">Return Home</button></Link>
    </StyledError404>
  )
}

export default Error404
