import styled from "styled-components"
import Google from "../Components/icons/Google";
import Facebook from "../Components/icons/Facebook";
import Spinner from "../Components/icons/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledForgotPassword = styled.section`
    height: 100vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    
    .form-container{
        width: 300px;
        margin-top: 150px;

    }
    h1{
        font-size: 35px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 40px;
    }
    .desc{
        width: 300px;
        color: var(--text-secondary);
        text-align: justify;
        padding: 0 3px;
        margin-bottom: 20px;
    }
    .form{
        display: flex;
        flex-direction: column;
        gap: 16px;
        input{
            border: 3px solid #2d2e37;
            border-radius: 12px;
            padding: 10px 15px;
            width: 300px;
            font-size: 15px;
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
        
    }
    p{
        text-align: center;
        margin: 10px 0;
    }
    a{
        text-decoration: none;
        font-weight: 500;
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
`;

const ForgotPassword = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;
        // e.target[0].value = "";

        console.log(formData)
    }

    const [isPending, setIsPending] = useState(false);

  return (
    <StyledForgotPassword>
        <div className="form-container">
            <h1>Forgot Password?</h1>
            <p className="desc">Enter the email address associated with your account. A verification OTP will be sent to this email address.</p>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <input type="email" name="email" placeholder="Email" required/>
                {
                    isPending ? 
                    <button type="submit" className="btn" disabled><Spinner /></button>
                    :
                    <button type="submit" className="btn">Continue</button>
                }
            </form>
            <p><span>Go back to </span> <Link to="/login">Login</Link><span> Page.</span></p>
        </div>
    </StyledForgotPassword>
  )
}

export default ForgotPassword