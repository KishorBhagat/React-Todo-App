import styled from "styled-components"
import Layout from "./Layout";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";
import UploadingSpinner from "../Components/icons/UploadingSpinner";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StyledProfile = styled.div`
  margin-top: 50px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  width: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header{
    /* background-color: red; */
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .heading{
      display: flex;
      justify-content: space-between;
      /* padding: 0 5px; */
      height: 60px;
      background-color: inherit;

      h1{
        font-weight: 500;
        background-color: inherit;
        display: flex;

        button{
            display: none;
            background-color: var(--background-secondary);
            height: 29px;
            width: 29px;
            margin-right: 20px;
            border-radius: 10px;
            font-weight: 500;
            border: none;
            color: var(--text-primary);
            font-weight: 500;
            font-size: 16px;
            font-family: monospace;
            cursor: pointer;
        }
      }
    }
  }

  .profile-container{
    width: 500px;
    /* height: calc(100vh - 150px); */
    padding-top: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .3s ease-in;
    /* background-color: lightblue; */

    .row-1{
        display: flex;
        align-items: center;
        
        .avatar{
            position: relative;
            border-radius: 50%;
            display: flex;
            img{
                height: 80px;
                width: 80px;
                border-radius: 50%;
                object-fit: cover;
            }
            .no-img{
                background-color: var(--avatar);
                color: var(--avatar-font-color);
                height: 80px;
                width: 80px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 50px;
            }
            .uploading-spinner{
                position: absolute;
                background-color: rgba(0, 0, 0, 0.6);
                border-radius: 50%;
                padding: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                svg{
                    height: 40px;
                    width: 40px;
                    fill: #fff;
                    path{
                        fill: #fff;
                    }
                }
            }
        }
        .username{
            font-size: 25px;
            font-weight: 500;
            margin-left: 20px;
            margin-bottom: 3px;
        }
        button{
            margin-left: 20px;
            margin-top: 3px;
            border-radius: 6px;
            padding: 3px 6px;
            font-size: 10px;
            text-transform: uppercase;
            border: 1px solid var(--pink);
            background-color: transparent;
            color: var(--text-primary);
            cursor: pointer;
        }
    }
    .row-2{
        background-color: var(--background-secondary);
        padding: 20px;
        margin-top: 30px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        .info{
            display: flex;
            gap: 5px;
            justify-content: space-between;
            /* align-items: center; */
            .col-1{
                display: flex;
                flex-direction: column;
                width: 80%;
                background-color: transparent;
                height: fit-content;
                label, span{
                    color: var(--text-secondary);
                    font-size: 14px;
                }
                input{
                    background-color: transparent;
                    border: none;
                    /* border-bottom: 1px solid gray; */
                    color: var(--text-primary);
                    font-size: 16px;
                    padding: 8px 0;
                    width: 95%;
                    height: 35px;
                    &:focus{
                        outline: none;
                    }
                }
                textarea{
                    resize: none;
                    background-color: red;
                    border: none;
                    color: var(--text-primary);
                    font-size: 16px;
                    padding: 8px 0;
                    width: 95%;
                    height: 35px;
                    overflow: hidden;
                    &:focus{
                        outline: none;
                    }
                }
                div{
                    background-color: transparent;
                    color: var(--text-primary);
                    font-size: 16px;
                    padding: 8px 0;
                    width: 95%;
                    height: fit-content;
                    word-break: break-all;
                    overflow: hidden;
                }
            }
            .col-2{
                display: flex;
                align-items: end;
                button{
                    padding: 5px 10px;
                    border-radius: 4px;
                    border: none;
                    background-color: #555561;
                    /* background-color: #414052; */
                    color: white;
                    cursor: pointer;
                    margin-bottom: 8px;
                    width: 65px;

                }
                a{
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
    button.signout-btn{
        background-color: var(--background-secondary);
        /* background-color: #33333e; */
        /* background-color: #272732; */
        padding: 12px 25px;
        color: var(--text-primary);
        font-size: 16px;
        border: none;
        border-radius: 10px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 20px;
        cursor: pointer;
    }

  }

  @media (max-width: 700px){
    margin-top: 0px;
    padding-top: 0;
    
    header{
      width: 100%;
      padding-top: 20px;
      padding-left: 20px;
      padding-right: 20px;

      .heading {
        height: 60px;
        h1{
            button{
                display: block;
            }
        }
      }

    }

    .profile-container{
      width: 100%;
      padding: 0 20px;
      padding-bottom: 10px;
      height: calc(100vh - 80px);

      .signout-btn{
        width: 100%;
      }
    }
  }
`;

const Profile = () => {

    const { user, fetchUser } = useContext(UserContext);

    const [isUploading, setIsUploading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');

    const fileInputRef = useRef(null);

    const token = localStorage.getItem('accessToken')

    const navigate = useNavigate();

    if (localStorage.getItem('passwordChanged') === 'true') {
        toast.success('Password Changed Successfully!', { position: toast.POSITION.TOP_CENTER });
        localStorage.removeItem('passwordChanged');
    }

    useEffect(() => {
        setName(user.username);
        setEmail(user.email);
        setImage(user.image);
    }, [user])

    useEffect(() => {
        const navbar = document.querySelector('.navbar-mobile');
        navbar.style.display = 'none';

        return () => {
            navbar.style.display = 'flex';
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            await fetchUser();
        }
        fetchData();
    }, [])


    const handleBack = () => {
        window.history.back();
    }

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        setIsUploading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile/upload`, {
                method: 'POST',
                headers: {
                    'authToken': token
                },
                body: formData
            })
            const data = await response.json();
            if (response.ok) {
                setIsUploading(false);
                await fetchUser()
                console.log(data)
            }
        } catch (error) {
            console.log({ error })
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadFile(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const dispatch = useDispatch();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const logoutRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`, {
                method: 'POST',
                credentials: "include",
            });
            dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    }

    const [isEditingName, setIsEditingName] = useState(false);

    const handleEditName = () => {
        setIsEditingName(!isEditingName);
    }

    const handleSubmitName = async (e) => {
        const formData = { username: name }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                await fetchUser();
            }
            else {
                toast.error('Failed to update! Try again or wait for some time.', { position: toast.POSITION.TOP_CENTER });
            }
            setIsEditingName(!isEditingName);
        } catch (error) {
            toast.error('Failed to update! Try again or wait for some time.', { position: toast.POSITION.TOP_CENTER });
            setIsEditingName(!isEditingName);
        }
    }


    return (
        <Layout>
            <StyledProfile>
                <header>
                    <div className="heading">
                        <h1 className="profile-heading"><button onClick={handleBack}>&lt;</button><span>Profile</span></h1>
                    </div>
                </header>
                <div className="profile-container">
                    <div className="row-1">
                        <div className="avatar">
                            {
                                image ?
                                    // (selectedImage && 
                                    <img src={user.image} alt="Selected" />
                                    // )
                                    :
                                    <div className="no-img">{user.username?.charAt(0).toUpperCase()}</div>
                            }
                            {isUploading && <div className="uploading-spinner"><UploadingSpinner /></div>}
                        </div>
                        <input
                            type="file"
                            accept=".jpeg, .jpg, .png"
                            name="image" style={{ display: 'none' }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                        <div>
                            <p className="username">{user.username}</p>
                            <div>
                                <button onClick={handleButtonClick}>
                                    {image ? "Change Photo" : "Upload Photo"}
                                </button>
                                {/* {image && <button>Remove Photo</button>} */}
                            </div>
                        </div>
                    </div>
                    <div className="row-2">
                        <div className="info">
                            <form className="col-1" id="nameForm" onSubmit={handleSubmitName}>
                                <label className="profile-labels" htmlFor="">Name</label>
                                {
                                    isEditingName ?
                                    <input
                                        type="text"
                                        name="username"
                                        style={{ borderBottom: '1px solid var(--pink)' }}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        autoFocus={true}
                                    />
                                    :
                                    <div>
                                        {name}
                                    </div>
                                }
                            </form>
                            <div className="col-2">
                                {
                                    isEditingName ?
                                        <button type="submit" htmlFor="nameForm" style={{ backgroundColor: 'var(--pink)' }} onClick={handleSubmitName}>Save</button>
                                        :
                                        <button onClick={handleEditName}>Edit</button>
                                }
                            </div>
                        </div>
                        <div className="info">
                            <div className="col-1">
                                <span className="profile-labels" htmlFor="">Email</span>
                                <div>
                                    {email}
                                </div>
                            </div>
                            <div className="col-2">
                                <button><Link to='/changeemail'>Change</Link></button>
                            </div>
                        </div>
                        <div className="info">
                            <div className="col-1">
                                <span className="profile-labels">Password</span>
                                <div style={{ fontSize: "25px", letterSpacing: "2px" }}>
                                    &#x2022;•••••••••
                                </div>
                            </div>
                            <div className="col-2">
                                <button><Link to='/changepassword'>Change</Link></button>
                            </div>
                        </div>
                    </div>
                    <button className="signout-btn" onClick={handleLogout}>Log out</button>
                </div>


            </StyledProfile>
        </Layout>
    )
}

export default Profile