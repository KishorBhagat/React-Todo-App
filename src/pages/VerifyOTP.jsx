import styled from "styled-components"
import Google from "../Components/icons/Google";
import Facebook from "../Components/icons/Facebook";
import Spinner from "../Components/icons/Spinner";
import { useState } from "react";
import { Link } from "react-router-dom";

const StyledVerifyOTP = styled.section`
    height: 100vh;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background-color: var(--background-primary);
    
    .form-container{
        width: 300px;
        margin-top: 150px;

    }
    h1{
        font-size: 32px;
        font-weight: 500;
        text-align: center;
        margin-bottom: 40px;
        color: var(--text-primary);
    }
    .desc{
        width: 300px;
        color: var(--text-secondary);
        text-align: justify;
        /* padding: 0 3px; */
        margin-bottom: 20px;
        line-height: 1.35;
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

const VerifyOTP = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = e.target[0].value;
        // e.target[0].value = "";

        console.log(formData)
    }

    const [isPending, setIsPending] = useState(false);

  return (
    <StyledVerifyOTP>
        <div className="form-container">
            <h1>Verification required.</h1>
            <p className="desc">To continue, complete this verification step. We've sent an OTP to the email {"example@gmail.com"}. Please enter it below to complete verification.</p>
            <form className="form" onSubmit={(e) => handleSubmit(e)}>
                <input type="text" name="resetCode" placeholder="Enter OTP" required/>
                <small className="error-message">Error message goes here</small>
                {
                    isPending ? 
                    <button type="submit" className="btn" disabled><Spinner /></button>
                    :
                    <button type="submit" className="btn">Continue</button>
                }
            </form>
        </div>
    </StyledVerifyOTP>
  )
}

export default VerifyOTP