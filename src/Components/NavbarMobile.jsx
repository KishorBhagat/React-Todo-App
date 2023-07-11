import { Link, NavLink } from "react-router-dom";
import styled from "styled-components"
import Search from "./icons/Search";
import Bell from "./icons/Bell";
import Google from "./icons/Google";
import Dashboard from "./icons/Dashboard";
import Collection from "./icons/Collection";
import Person from "./icons/Person";
import SearchInput from "./SearchInput";
import { useContext, useState } from "react";
import Cross from "./icons/Cross";
import { SearchContext } from "../Context/SearchContext";
// import HamburgerIcon from "./icons/HamburgerIcon";

const StyledNavbarMobile = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  background-color: var(--background-primary);
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
      }

      .profile-menu-btn{
        svg{
          height: 20px;
          width: 20px;
        }
      }
    }
  }

  @media (max-width: 700px){
    display: flex;
  }
`;

const StyledSearchBar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: none;
  height: 0px;

  
  button{
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    width: 30px;
    margin: 10px 10px;
    background-color: transparent;
    border: none;

    svg{
      fill: var(--text-secondary);
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 700px) {
    transition: .5s ease;
    display: block;
    height: 50px;
  }
`

const NavbarMobile = ({ setIsFormModalOpen }) => {

  const [searchOpen, setSearchOpen] = useState(false);

  const {setSearchValue} = useContext(SearchContext)

  const showProfileMenu = () => {
    let profileMenu = document.querySelector(".profile-menu");
    let profilecontainer = document.querySelector(".profile-container");
    profileMenu.classList.add("active");
    profilecontainer.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  const handleShowSearch = (e) => {
    setSearchOpen(true);
  }

  const handleHideSearch = () => {
    setSearchOpen(false);
    setSearchValue('');
  }

  return (
    <>
      {
        searchOpen &&
        <StyledSearchBar className="Search-Bar">
          <SearchInput autofocus={true}/>
          <button onClick={handleHideSearch}><Cross /></button>
        </StyledSearchBar>
      }
      <StyledNavbarMobile>
        <ul className="menus">
          <li><NavLink to="/dashboard"><Dashboard /></NavLink></li>
          <li><NavLink end to="/collections"><Collection /></NavLink></li>
          <li><button className="add-btn" onClick={() => setIsFormModalOpen(true)}>+</button></li>
          <li><button onClick={handleShowSearch}><Search /></button></li>
          <li><button onClick={showProfileMenu} className="profile-menu-btn"><Person /></button></li>
        </ul>
      </StyledNavbarMobile>
    </>
  )
}

export default NavbarMobile