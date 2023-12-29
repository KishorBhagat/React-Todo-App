import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components"
import { ThemeContext } from "../Context/ThemeContext";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";

const StyledToggleButton = styled.button`
    background-color: inherit;
    cursor: pointer;
    .toggle-track{
       height: 24px;
       width: 48px;
       border-radius: 20px;
       background-color: #9a9aa8;
       display: flex;
       align-items: center;
       position: relative;
        /* flex-direction: column; */

        &:hover .toggle-thumb{
            box-shadow: 0 0 4px 6px #e756b5;
        }
       .toggle-thumb{
           position: absolute;
           height: 16px;
           width: 16px;
           border-radius: 50%;
           margin: 0 4px;
           background-color: #fafafa;
           cursor: pointer;
           transition: .2s ease;
           z-index: 1;
       }
       .toggle-icons{
            position: absolute;
            height: 24px;
            width: 48px;
            border-radius: 20px;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .moon, .sun{
                font-size: 12px;
                border-radius: 50%;
                background-color: transparent;
                ::selection{
                    background-color: transparent;
                }
            }
       }
    }
`;

const ToggleButton = () => {

    const thumbRef = useRef();
    const { theme, setTheme } = useContext(ThemeContext);

    const handleToggleTheme = (e) => {
        if (theme === 'dark') {
            setTheme('light');
            thumbRef.current.style.transform = "translateX(24px)";
        }
        if (theme === 'light') {
            setTheme('dark');
            thumbRef.current.style.transform = "translateX(0px)";
        }
    }

    useEffect(() => {
        if (theme === 'light') {
            thumbRef.current.style.transform = "translateX(24px)";
        }
    }, [theme])

    return (
        <StyledToggleButton className="toggle" onClick={handleToggleTheme}>
            <div className="toggle-track">
                <div className="toggle-thumb" ref={thumbRef}></div>
                <div className="toggle-icons">
                    <span className="moon">🌙</span>
                    <span className="sun">🌞</span>
                </div>
            </div>
        </StyledToggleButton>
    )
}

export default ToggleButton