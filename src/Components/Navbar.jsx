import { Link, NavLink } from "react-router-dom";
import styled from "styled-components"
import Search from "./icons/Search";
import Bell from "./icons/Bell";
import Avatar from "./icons/Avatar";
import HamburgerIcon from "./icons/HamburgerIcon";
import { useDispatch, useSelector } from "react-redux";
import { toggelMenu } from "../store/slices/SidebarSlice";
import Dashboard from "./icons/Dashboard";
import Collection from "./icons/Collection";

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-secondary);
  height: 50px;
  padding: 0 20px;
  ul{
    display: flex;
    gap: 30px;
    background-color: inherit;
    align-items: center;
    justify-content: center;
    li{
      list-style: none;
      background-color: inherit;
      display: flex;
      align-items: center;
      a{
        text-decoration: none;
        color: var(--text-secondary);
        background-color: inherit;
        transition: .2s ease;
        display: flex;
        align-items: center;
        &:hover{
          color: white;
          svg{
            transition: .2s ease;
            fill: white
          }
        } 
        &.active{
          color: white;
          svg{
            fill: white;
          }
        }
      }
    }
    svg{
      transition: .2s ease;
      background-color: inherit;
      fill: var(--text-secondary);
      &:hover{
        fill: white;
      }
    }
    button{
      background-color: inherit;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .2s ease;
      color: var(--text-secondary);
      font-size: 16px;
      &.active{
        svg{
          fill: var(--text-primary);
        }
      }
    }

    .add-btn{
      font-size: 16px;
      font-weight: 500;
      background-color: #e756b5;
      color: white;
      height: 25px;
      width: 25px;
      border-radius: 9px;
    }
  }

  @media (max-width: 700px){
    display: none;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggelMenu())
  }

  const isToggleOn = useSelector((state) => {
    return state.sidebar;
  })

  const handleToggleTheme = (e) => {
    if(document.body.classList == "dark-theme"){
      document.body.classList = "light-theme";
      e.target.innerHTML = "Dark 🌙";
    }
    else {
      document.body.classList = "dark-theme"
      e.target.innerHTML = "Light 🌞";
    }
  }

  return (
    <StyledNavbar>
      <ul className="tabs">
        <li><button className={isToggleOn ? "active" : ""} onClick={() => handleToggleMenu()}><HamburgerIcon /></button></li>
        <li><NavLink to="/dashboard"><Dashboard />&nbsp;&nbsp;Dashboard</NavLink></li>
        <li><NavLink to="/collections"><Collection />&nbsp;&nbsp;Collections</NavLink></li>
      </ul>
      <ul className="menus">
        <button className="add-btn">+</button>
        <button><Search /></button>
        <button><Bell /></button>
        <button onClick={handleToggleTheme}>Light 🌞</button>
        <button><Avatar /></button>
      </ul>
    </StyledNavbar>
  )
}

export default Navbar