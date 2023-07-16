import styled from "styled-components"
import Spinner from "../Components/icons/Spinner";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../store/slices/authSlice";
import Cross from "../Components/icons/Cross";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const StyledChangeEmail = styled.section`
    .frame{
        height: 100vh;
        display: flex;
        justify-content: center;
        background-color: var(--background-primary);

        .close-btn{
            display: none;
        }

        .form-container{
            width: 300px;
            margin-top: 150px;
    
        }
        h1{
            font-size: 35px;
            font-weight: 500;
            text-align: center;
            margin-bottom: 40px;
            color: var(--text-primary);
        }
        .desc{
            width: 300px;
            color: var(--text-secondary);
            text-align: justify;
            padding: 0 3px;
            margin-bottom: 20px;
        }
        .error-message{
            position: relative;
            padding: 0 3px;
            color: red;
            top: 5px;
            text-align: center;
        }
        .form{
            display: flex;
            flex-direction: column;
            gap: 16px;
            input{
                background-color: var(--background-primary);
                border: none;
                border-bottom: 2px solid #2d2e37;
                padding: 10px 5px;
                width: 300px;
                font-size: 15px;
                color: var(--text-primary);
                &::placeholder{
                    color: #9a9aa8;
                }
                &:focus{
                    border-bottom: 2px solid #e756b5;
                    outline: none;
                }
            }
    
            
    
            button[type=submit]{
                height: 46px;
                margin: 10px 0;
                font-size: 15px;
                cursor: pointer;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
    
                svg{
                    fill: white;
                }
            }
            button[disabled]{
                cursor: not-allowed;
                padding: 10.5px 15px;
                .spinner{
                    background-color: inherit;
                    animation: spin 2s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            }
            
        }
        p{
            text-align: center;
            margin: 10px 0;
        }
        a{
            text-decoration: none;
            font-weight: 500;
            position: relative;
            color: var(--text-primary);
            
            ::after{
                content: "";
                position: absolute;
                bottom: 0;
                left: 50%;
                height: 1px;
                width: 0;
                background-color: var(--text-primary);
                transition: .2s ease;
            }
            &:hover::after{
                width: 100%;
                left: 0;
            }
        }
        span{
            text-align: center;
            color: var(--text-secondary);
        }
    }
    

    @media (max-width: 700px){
        background-color: rgba(0, 0, 0, 0.7);
        padding: 5px;
        height: 100vh;
        .frame{
            height: 100%;
            border-radius: 20px;

            .close-btn{
                display: flex;
                position: absolute;
                color: var(--text-primary);
                background-color: transparent;
                border: none;
                top: 20px;
                left: 20px;
                svg{
                    height: 40px;
                    width: 40px;
                }
            }

            h1{
                text-align: left;
                font-size: 30px;
            }
        }
    }
`;

const ChangeEmail = () => {

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => {
        return state.auth.isLoading;
    })

    const navigate = useNavigate();

    const token = localStorage.getItem('accessToken');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;

        setIsPending(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/changeemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data)
            if(response.ok){
                toast.info('Verifiaction link sent to your email. Please check your email.', { postion: toast.POSITION.TOP_CENTER, autoClose: false});
            }
            else {
                toast.error(data.error.message, { postion: toast.POSITION.TOP_CENTER});
            }
            setIsPending(false);
        }
        catch (error) {

        }
    }

    const [isPending, setIsPending] = useState(false);
    
    return (
        <StyledChangeEmail>
            <div className="frame">
                <button className="close-btn" onClick={(e) => navigate(-1)}><Cross /></button>
                <div className="form-container">
                    <h1>Change Email</h1>
                    <p className="desc">A verification link will be sent to this email. In order to change your email you have to click the verification link sent to your new email.</p>
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <input type="email" name="newemail" placeholder="Enter your new email address" required />
                        {
                            isPending ?
                                <button type="submit" className="btn" disabled><Spinner /></button>
                                :
                                <button type="submit" className="btn">Continue</button>
                        }
                    </form>
                    {/* <p> <Link to="/profile">Go back to profile</Link></p> */}
                </div>
            </div>
        </StyledChangeEmail>
    )
}

export default ChangeEmail