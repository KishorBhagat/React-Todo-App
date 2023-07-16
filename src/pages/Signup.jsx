import styled from "styled-components"
import Google from "../Components/icons/Google";
import Facebook from "../Components/icons/Facebook";
import Spinner from "../Components/icons/Spinner";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const StyledSignup = styled.section`
    min-height: 100vh;
    background-color: var(--background-primary);

    nav{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 38px 16%;
        background-color: inherit;
        height: 110px;
        
        .logo{
            font-size: 30px;
            color: var(--text-primary);
            a{
                text-decoration: none;
                color: var(--text-primary);
            }
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
        .login-link > a{
            border: 3px solid #2d2e37;
            border-radius: 10px;
            padding: 8px 20px;
            &:hover{
            background-color: #2d2e37;
            }
        }
        }
    }

    .form-container{
        display: flex;
        background-color: var(--background-primary);
        justify-content: center;
        align-items: center;
        padding-bottom: 40px;
        flex-direction: column;
        /* height: calc(100vh - 110px); */
        h1{
            font-size: 35px;
            font-weight: 500;
            text-align: center;
            margin-bottom: 60px;
            color: var(--text-primary);
        }
        .form{
            display: flex;
            flex-direction: column;
            gap: 16px;
            input{
                background-color: var(--background-primary);
                border: 3px solid #2d2e37;
                border-radius: 12px;
                padding: 10px 15px;
                width: 300px;
                font-size: 15px;
                color: var(--text-primary);
                &::placeholder{
                    color: #9a9aa8;
                }
                &:focus{
                    border: 3px solid #C82F8E;
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
    
            .auth-btn{
                border: 3px solid #2d2e37;
                border-radius: 12px;
                padding: 10px 15px;
                color: var(--text-secondary);
                font-size: 15px;
                font-weight: 500;
                transition: 0.2s ease;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover{
                    background-color: #2d2e37;
                    color: white;
                }
                svg{
                    background-color: inherit;
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
            color: var(--text-primary);
            position: relative;
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
        nav{
            padding: 38px 6%;
            padding-bottom: 68px;
            height: 50px;
        }
        .form-container{
            height: auto;
        }
    }
`;


const Signup = () => {

    const [isPending, setIsPending] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const initialFormState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formData, setFormData] = useState(initialFormState);

    const isLoading = useSelector((state) => {
        return state.auth.isLoading;
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(formData))
            .unwrap()
            .then((res) => {
                if(res.error){
                    toast.error(res.error.message, {position: toast.POSITION.TOP_CENTER});
                }
                else {
                    console.log(res.user);
                    toast.info("A verification link is sent to your email.\nPlease check your email.", {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: false
                    });
                    setIsFormSubmitted(true);
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        if (isFormSubmitted) {
          setFormData(initialFormState);
          setIsFormSubmitted(false);
        }
      }, [isFormSubmitted]);



    return (
        <StyledSignup>
            <nav>
                <div className="logo"><h4><Link to='/'>task.</Link></h4></div>
                <ul>
                    <li className="login-link"><Link to="/login">Log in</Link></li>
                </ul>
            </nav>
            <div className="form-container">
                <h1>Sign up.</h1>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="auth-btn"><Google />&nbsp;&nbsp;Continue with Google</div>
                    <div className="auth-btn"><Facebook />&nbsp;&nbsp;Continue with Facebook</div>
                    <span>or</span>
                    <input
                        type="text"
                        name="username"
                        onChange={handleInputChange}
                        value={formData.username}
                        placeholder="Name"
                        required
                    />
                    <input type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={formData.email}
                        required
                    />
                    <input type="password"
                        name="password"
                        onChange={handleInputChange}
                        value={formData.password}
                        placeholder="Password"
                        required
                    />
                    <input type="password"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        value={formData.confirmPassword}
                        placeholder="Re-enter password"
                        required
                    />
                    {
                        isLoading ?
                            <button type="submit" className="btn" disabled><Spinner /></button>
                            :
                            <button type="submit" className="btn">Sign up</button>
                    }
                </form>
                <p><span>Already have an account?</span> <Link to="/login">Log in</Link></p>
            </div>
        </StyledSignup>
    )
}

export default Signup