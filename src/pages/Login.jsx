import styled from "styled-components"
import Google from "../Components/icons/Google";
import Facebook from "../Components/icons/Facebook";
import Spinner from "../Components/icons/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from "jwt-decode";
import EyeSlash from "../Components/icons/EyeSlash";
import Eye from "../Components/icons/Eye";
import { useState } from "react";

const StyledLogin = styled.section`
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

    .form-container{
        display: flex;
        background-color: var(--background-primary);
        justify-content: center;
        align-items: center;
        padding-bottom: 50px;
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
                    border: 3px solid #e756b5;
                    outline: none;
                }
            }

            span{
                position: relative;
                input[type=password]{
                    padding-right: 50px;
                }
                .show-btn{
                    background-color: transparent;
                    display: flex;
                    border: none;
                    color: var(--text-secondary);
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    cursor: pointer;
                }
            }
    
            button[type=submit]{
                height: 46px;
                margin: 10px 0;
                margin-bottom: 0;
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
                color: #9a9aa8;
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
            .guest-login-btn{
                background-color: #3fc73f;
                font-size: 15px;
                cursor: pointer;
                color: white;
                margin-bottom: 10px;
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


const Login = () => {
    // const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    // const hasNativeToggle = typeof document !== 'undefined' && 'password' in document.createElement('input');

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => {
        return state.auth.isLoading;
    })

    // const data = useSelector((state) => {
    //     return state.auth.data;
    // })
    // const isLoggedIn = useSelector((state) => {
    //     return state.auth.isLoggedIn;
    // })
    if (localStorage.getItem('passwordRestSuccess') === 'true') {
        toast.success('Password change successfully.', { position: toast.POSITION.TOP_CENTER });
        localStorage.removeItem('passwordRestSuccess');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;
        formData[e.target[1].getAttribute("name")] = e.target[1].value;
        // e.target[0].value = "";
        // e.target[1].value = "";

        dispatch(login(formData))
            .unwrap()
            .then((res) => {
                if (res.error) {
                    toast.error(res.error.message, { position: toast.POSITION.TOP_CENTER });
                }
                else {
                    localStorage.setItem('accessToken', (res.token.access));
                    localStorage.setItem("isWelcomed", "true");
                    // navigate('/dashboard')
                    window.location.replace('/dashboard');
                }
            })
    }

    const [isGuestLogging, setIsGuestLogging] = useState(false);
    const guestLogin = (e) => {
        setIsGuestLogging(true);
        const guestCredentials = {
            email: import.meta.env.VITE_GUEST_EMAIL,
            password: import.meta.env.VITE_GUEST_PASSWORD
        }
        const form = document.querySelector('.form');
        const showBtn = document.querySelector('.show-btn');
        setTimeout(() => {
            form[0].value = guestCredentials.email;
            form[1].value = guestCredentials.password;
            showBtn.style.display = "none";
            e.target.style.display = "none";
            setShowPassword(false);
            setIsGuestLogging(false);
        }, 1500)
    }

    return (
        <StyledLogin>
            <nav>
                <div className="logo"><h4><Link to='/'>task.</Link></h4></div>
                <ul>
                    <li className="signup-link"><Link to="/signup">Sign up</Link></li>
                </ul>
            </nav>
            <div className="form-container">
                <h1>Log in.</h1>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            // console.log(credentialResponse);
                            const decodedToken = jwtDecode(credentialResponse.credential);
                            console.log(decodedToken);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        text="continue_with"
                    /> */}
                    {/* <div className="auth-btn"><Google />&nbsp;&nbsp;Continue with Google</div> */}
                    {/* <div className="auth-btn"><Facebook />&nbsp;&nbsp;Continue with Facebook</div> */}
                    {/* <span>or</span> */}
                    <input type="email" name="email" placeholder="Email" required />
                    <span>
                        <input type={showPassword? "text" : "password"} name="password" placeholder="Password" required />
                        <button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeSlash /> : <Eye />}
                        </button>
                    </span>
                    {/* {data && data.error && <p style={{color: "red"}}>{data.error.message}</p>} */}
                    {
                        isLoading ?
                            <button type="submit" className="btn" disabled><Spinner /></button>
                            :
                            <button type="submit" className="btn">Log in</button>
                    }
                    {
                        isGuestLogging ?
                            <button onClick={guestLogin} type="button" className="btn guest-login-btn" disabled><Spinner /></button>
                            :
                            <button onClick={guestLogin} type="button" className="btn guest-login-btn">Get Guest User Credentials</button>
                    }
                </form>
                <p><span>Don't have an account?</span> <Link to="/signup">Create Account</Link></p>
                <p><Link to="/forgotpassword">Forgot Password?</Link></p>
            </div>
        </StyledLogin>
    )
}

export default Login