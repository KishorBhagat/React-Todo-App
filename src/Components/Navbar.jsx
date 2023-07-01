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
import { useRef } from "react";
import ToggleButton from "./ToggleButton";

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--background-secondary);
  /* box-shadow: 0 10px 10px -10px #020c1bb3; */
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
          color: var(--text-primary);
          svg{
            fill: var(--text-primary);
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

      .avatar{
        height: 28px;
        width: 28px;
        border-radius: 50%;
        background-color: var(--avatar);
        border: 3px solid var(--avatar);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--avatar-font-color);
        font-weight: 600;
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

const Navbar = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const handleToggleMenu = () => {
    dispatch(toggelMenu())
  }

  const isToggleOn = useSelector((state) => {
    return state.sidebar;
  })

  const showProfileMenu = () => {
    let profileMenu = document.querySelector(".profile-menu");
    if(profileMenu.classList.contains("active")){
      profileMenu.classList.remove("active");
    }
    else {
      profileMenu.classList.add("active");
    }
  }


  return (
    <StyledNavbar>
      <ul className="tabs">
        <li><button className={isToggleOn ? "active" : ""} onClick={() => handleToggleMenu()}><HamburgerIcon /></button></li>
        <li><NavLink to="/dashboard"><Dashboard />&nbsp;&nbsp;Dashboard</NavLink></li>
        <li><NavLink end to="/collections"><Collection />&nbsp;&nbsp;Collections</NavLink></li>
      </ul>
      <ul className="menus">
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>+</button>
        <button><Search /></button>
        <ToggleButton />
        <button onClick={showProfileMenu}>
          <div className="avatar">
            {"kishor".charAt(0).toUpperCase()}
          </div>
        </button>
      </ul>
    </StyledNavbar>
  )
}

export default Navbar