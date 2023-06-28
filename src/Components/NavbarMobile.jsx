import { Link, NavLink } from "react-router-dom";
import styled from "styled-components"
import Search from "./icons/Search";
import Bell from "./icons/Bell";
import Google from "./icons/Google";
import Dashboard from "./icons/Dashboard";
import Collection from "./icons/Collection";
// import HamburgerIcon from "./icons/HamburgerIcon";

const StyledNavbarMobile = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  /* background-color: green; */
  display: none;
  ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: inherit;
    li{
      list-style: none;
      background-color: inherit;
      a {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: inherit;
        &.active{
          color: var(--text-primary);
          svg{
            fill: var(--text-primary);
          }
        }
      }

      button{
        background-color: inherit;
        border: none;
        cursor: pointer;
        transition: all .2s ease;
      }

      .add-btn{
        font-size: 20px;
        font-weight: 500;
        background-color: #e756b5;
        color: white;
        height: 35px;
        width: 35px;
        border-radius: 10px;
      }

      svg{
        height: 16px;
        width: 16px;
        fill: var(--text-secondary);
        background-color: inherit;
        &:hover{
          fill: white;
        }
      }
    }
  }

  @media (max-width: 700px){
    display: flex;
  }
`;

const NavbarMobile = () => {

  return (
    <StyledNavbarMobile>
      <ul className="menus">
        <li><NavLink to="/dashboard"><Dashboard /></NavLink></li>
        <li><NavLink to="/collections"><Collection /></NavLink></li>
        <li><button className="add-btn">+</button></li>
        <li><button><Search /></button></li>
        <li><button><Bell /></button></li>
      </ul>
    </StyledNavbarMobile>
  )
}

export default NavbarMobile