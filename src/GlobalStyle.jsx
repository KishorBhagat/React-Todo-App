import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    .dark-theme{
        --background-primary: #1d1e26;
        --background-secondary: #272836;
        --text-primary: #fff;
        --text-secondary: #9a9aa8;
        --text-tertiary: #d2d2e0;
        --hover: #36374b;
        --hover-light: rgba(54, 55, 75, 0.3);
        --pink: #e756b5;
        --avatar: #9a9aa8;
        --avatar-font-color: #272836;
    }
    .light-theme{
        --background-primary: #dfdfe3;
        /* --background-primary: #d6d6db; */
        /* --background-primary: #b4b5bd; */
        /* --background-primary: #cecfd3; */

        --background-secondary: #bfc0c6;
        /* --background-secondary: #b4b5bd; */
        /* --background-secondary: #d6d6db; */
        /* --background-secondary: #e4e4ef; */

        --text-primary: #000;
        --text-secondary: #000;
        --text-tertiary: #000;
        --hover: #a9aab1;
        --hover-light: rgba(169, 170, 177, 0.5);
        --pink: #e756b5;
        --avatar: #e756b5;
        --avatar-font-color: #fff;
    }

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    
    .btn{
      background-color: #e756b5;
      border: none;
      border-radius: 10px;
      padding: 15px 30px;
    }
    
`;

export default GlobalStyle;
