import styled from "styled-components"
import Google from "../Components/icons/Google";
import Facebook from "../Components/icons/Facebook";
import Spinner from "../Components/icons/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledLogin = styled.section`
    height: 100vh;
    display: flex;
    background-color: var(--background-primary);
    justify-content: center;
    align-items: center;
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
`;
const Login = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;
        formData[e.target[1].getAttribute("name")] = e.target[1].value;
        // e.target[0].value = "";

        console.log(formData)
    }

    const [isPending, setIsPending] = useState(false);

  return (
    <StyledLogin>
        <div className="form-container">
            <h1>Log in.</h1>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <div className="auth-btn"><Google />&nbsp;&nbsp;Continue with Google</div>
                <div className="auth-btn"><Facebook />&nbsp;&nbsp;Continue with Facebook</div>
                <span>or</span>
                <input type="email" name="email" placeholder="Email" required/>
                <input type="password" name="password" placeholder="Password" required/>
                {
                    isPending ? 
                    <button type="submit" className="btn" disabled><Spinner /></button>
                    :
                    <button type="submit" className="btn">Log in</button>
                }
            </form>
            <p><span>Don't have an account?</span> <Link to="/signup">Create Account</Link></p>
            <p><Link to="/forgotpassword">Forgot Password?</Link></p>
        </div>
    </StyledLogin>
  )
}

export default Login