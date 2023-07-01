import styled from "styled-components"
import Avatar from "./icons/Avatar"
import Logout from "./icons/Logout"
import Cross from "./icons/Cross"
import ToggleButton from "./ToggleButton"
import { useNavigate } from "react-router-dom"

const StyledProfileMenu = styled.div`
    position: absolute;
    height: fit-content;
    width: 0px;
    top: 50px;
    right: 0;
    z-index: 1000;
    margin-top: 1px;
    transition: all .2s ease;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow: hidden;
    /* width: 300px; */
    background-color: var(--background-secondary);
    display: flex;
    flex-direction: column;

    
    &.active{
        width: 300px;

    }
    .profile{
        background-color: var(--background-secondary);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px 0;
        gap: 5px;
        width: 100%;

        .close-btn, .toggle-btn{
            background-color: inherit;
            position: absolute;
            top: 15px;
            cursor: pointer;
            display: none;
            svg{
                background-color: inherit;
                width: 30px;
                height: 30px;
                fill: var(--text-secondary);
            }
        }
        .close-btn{
            right: 15px;
        }
        .toggle-btn{
            top: 17px;
            left: 15px;    
        }

        .no-img{
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background-color: var(--avatar);
            border: 5px solid var(--avatar);
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--avatar-font-color);
            font-size: 50px;
        }
        .profile-img{
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background-color: #fff;
        }
        .name{
            margin-top: 10px;
            font-size: 20px;
            font-weight: 500;
            background-color: inherit;
            color: var(--text-tertiary);
            white-space: nowrap;
        }
        .email{
            font-size: 13px;
            background-color: inherit;
            color: var(--text-secondary);
        }
        button{
            margin-top: 10px;
            padding: 5px 10px;
            border-radius: 5px;
            border: 1px solid var(--text-secondary);
            background-color: var(--background-secondary);
            cursor: pointer;
            color: var(--text-secondary);

        }
    }

    ul{
        width: 100%;
        border-top: 1px solid var(--text-secondary);
        /* border-bottom: 1px solid var(--text-secondary); */
        li{
            list-style: none;
            padding: 10px 10px;
            color: var(--text-secondary);
            background-color: var(--background-secondary);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            white-space: nowrap;
            svg{
                fill: var(--text-secondary);
                background-color: inherit;
                margin-right: 10px;
            }
        }
    }

    @media (max-width: 700px) {
        top: 0;
        left: 0;
        height: calc(100vh);
        .profile{
            padding-top: 70px;

            .close-btn, .toggle-btn{
                display: block;
            }
        }
        ul{
            border-bottom: 1px solid var(--text-secondary);
        }
    }
    
`
const ProfileMenu = () => {

    const navigate = useNavigate();
    
    const handleLogout = (e) => {
        e.preventDefault();
        navigate("/", {replace: true})
    }

    const handleCloseProfileMenu = () => {
        document.querySelector(".profile-menu").classList.remove("active");
    }

  return (
    <StyledProfileMenu className="profile-menu">
        <div className="profile">
            <span className="close-btn" onClick={handleCloseProfileMenu}><Cross /></span>
            <span className="toggle-btn"><ToggleButton /></span>
            <div className="no-img">{"kishor".charAt(0).toUpperCase()}</div>
            {/* <div className="profile-img"></div> */}
            <p className="name">Kishor Bhagat</p>
            <p className="email">kishorebhagat663@gmail.com</p>
            {/* <button className="edit">Edit</button> */}
        </div>
        <ul>
            <li onClick={handleLogout}><Logout /> Logout</li>
            {/* <li></li> */}
        </ul>
    </StyledProfileMenu>
  )
}

export default ProfileMenu