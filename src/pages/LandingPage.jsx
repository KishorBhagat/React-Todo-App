import { Link } from "react-router-dom";
import styled from "styled-components"

const StyledLanding = styled.div`
  height: 100vh;
  background-color: var(--background-dark);
  background-color: #1d1e26;
  color: white;
  /* padding: 0 16%; */
  nav{
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 38px 16%;
    /* background-color: green; */
    
    .logo{
      font-size: 30px;
    }
    ul{
      display: flex;
      li {
        list-style: none;
        margin: 0 12px;
        a{
          text-decoration: none;
          color: var(--text-secondary);
          font-size: 14px;
          transition: 0.2s ease;
          &:hover{
            color: white;
          }
        }
      }
      .signup-link > a{
        border: 3px solid #2d2e37;
        border-radius: 10px;
        padding: 8px 20px;
        &:hover{
          background-color: #2d2e37;
        }
      }
    }
  }

  section{
    /* background-color: blue; */
    height: 100%;
    padding: 0 15%;
    padding-top: 210px;
    text-align: center;
    h1{
      font-size: 50px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    p{
      color: var(--text-secondary);
    }
    button {
      margin-top: 40px;
    }
    button > a {
      text-decoration: none;
      color: white;
      background-color: inherit;
    }
  }

  @media (max-width: 400px){
    nav, section{
      padding-left: 6%;
      padding-right: 6%;
    }
    .signup-link{
      margin-right: 0;
    }
  }
`;

const LandingPage = () => {
  return (
    <StyledLanding>
      <nav>
        <div className="logo"><h4>task.</h4></div>
        <ul>
          <li className="login-link"><Link to="/login">Log in</Link></li>
          <li className="signup-link"><Link to="/signup">Sign up</Link></li>
        </ul>
      </nav>
      <section>
        <h1>Tasks, just tasks.</h1>
        <p>Keep track of the daily tasks in life and</p>
        <p>get the satisfation upon completion.</p>
        <button className="btn"><Link to="/dashboard">Get started</Link></button>
      </section>
    </StyledLanding>
  )
}

export default LandingPage