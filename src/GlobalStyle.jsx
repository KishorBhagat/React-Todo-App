import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    .dark-theme{
        --background-primary: #1d1e26;
        --background-secondary: #272836;
        --text-primary: #fff;
        --text-secondary: #9a9aa8;
        --text-tertiary: #d2d2e0;
        --hover: #34343f;
    }
    .light-theme{
        --background-primary: #dfdfe3;
        /* --background-primary: #d0d0d6; */
        --background-secondary: #bfc0c6;
        /* --background-secondary: #b4b5bd; */
        --text-primary: #000;
        --text-secondary: #000;
        --text-tertiary: #000;
        --hover: #a9aab1;
    }

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        /* background-color: #1d1e26; */
        background-color: var(--background-primary);
        color: var(--text-primary);
        
        /* scroll-behavior: smooth; */
        /* font-family: var(--font-poppins); */
    }
    
    .btn{
      background-color: #e756b5;
      border: none;
      border-radius: 10px;
      padding: 15px 30px;
    }
    
`;

export default GlobalStyle;
