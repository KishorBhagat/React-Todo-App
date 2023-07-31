import styled from "styled-components"
import Avatar from "./icons/Avatar"
import Logout from "./icons/Logout"
import Cross from "./icons/Cross"
import ToggleButton from "./ThemeToggleButton"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../store/slices/authSlice"
import { UserContext } from "../Context/UserContext"
import { useContext, useEffect, useState } from "react"
import PencilSquare from "./icons/PencilSquare"
import Person from "./icons/Person"

const StyledProfileMenu = styled.div`
    background-color: transparent;
    position: absolute;
    height: calc(100vh - 50px);
    width: 0;
    right: 0;
    transition: all .2s ease;
    overflow: hidden;
    z-index: 1000;
    &.active{
        height: calc(100vh);
        width: 100vw;
    }

    .profile-container{

        position: absolute;
        height: fit-content;
        top: 50px;
        right: 0;
        margin-top: 1px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        overflow: hidden;
        width: 0px;
        background-color: var(--background-secondary);
        display: flex;
        flex-direction: column;
        transition: all .2s ease;
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
                left: 20px;    
                /* transform: scale(1.2); */
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
                position: relative;
            }
            .profile-img{
                height: 100px;
                width: 100px;
                border-radius: 50%;
                background-color: #fff;
                position: relative;
                
                img{
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            .edit-icon{
                position: absolute;
                right: 2px;
                bottom: 2px;
                background-color: #fff;
                display: flex;
                padding: 5px;
                border-radius: 50%;
                svg{
                    fill: var(--text-secondary);
                }
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
                padding: 5px 12px;
                border-radius: 15px;
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
                a{
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    color: var(--text-secondary);
                }
                svg{
                    fill: var(--text-secondary);
                    background-color: inherit;
                    margin-right: 10px;
                }
            }
        }
    }

    @media (max-width: 700px) {
        top: 0;
        left: 0;
        height: 100vh;
        &.active{
            height: 100vh;
        }
        .profile-container{
            left: 0;
            top: 0;
            height: calc(100vh);
            &.active{
                width: 260px;
            }
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
    }
    
`
const ProfileMenu = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const logoutRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: "include",
                // withCredentials: true,
            });
            dispatch(logout());        
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseProfileMenu = () => {
        document.querySelector(".profile-menu").classList.remove("active");
        document.querySelector(".profile-container").classList.remove("active");
        document.body.style.overflow = "visible";
    }

    const {user, isUser} = useContext(UserContext);

    const [image, setImage] = useState('');

    useEffect(() => {
        if(user.image){
            setImage(user.image);
        }
    }, [user])

  return (
    <StyledProfileMenu className="profile-menu" onClick={handleCloseProfileMenu}>
    <div className="profile-container" onClick={e => e.stopPropagation()}>
        <div className="profile">
            <span className="close-btn" onClick={handleCloseProfileMenu}><Cross /></span>
            <span className="toggle-btn"><ToggleButton /></span>
            {
                image ? 
                <div className="profile-img">
                    <img src={image} alt="" />
                </div>
                :
                <div className="no-img">
                    {user.username?.charAt(0).toUpperCase()}
                </div>
            }
            <p className="name">{user.username}</p>
            <p className="email">{user.email}</p>
            {/* <button className="edit">Edit Profile</button> */}
        </div>
        <ul>
            <li><Link to="/profile"><Person /> Profile</Link></li>
            <li onClick={handleLogout}><Logout /> Logout</li>
            {/* <li></li> */}
        </ul>
    </div>
    </StyledProfileMenu>
  )
}

export default ProfileMenu