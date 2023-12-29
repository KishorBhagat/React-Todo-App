import { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../Context/ThemeContext";
import { useEffect } from "react";
import { useRef } from "react";
import Sun from "./icons/Sun";
import Moon from "./icons/Moon";
import Display from "./icons/Display";

const StyledThemeSelector = styled.div`
    display: flex;
    border: 1px solid var(--text-secondary);
    border-radius: 25px;
    padding: 4px;
    .theme-btn{
        height: 20px;
        width: 20px;
        font-size: 12px;
        border-radius: 50%;
        color: var(--text-primary);

        svg{
            height: 14px;
            width: 14px;
            &:hover{
                fill: var(--text-secondary);
            }
        }
    }
    .theme-btn.active{
        background-color: var(--text-secondary);
        background-color: var(--pink);
        svg{
            fill: white;
        }
    }
    .select-light-btn, .select-system-btn{
        svg{
            height: 12px;
            width: 12px; 
        }
    }
`
const ThemeSelector = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    const hasMounted = useRef(false)
    // Due to the asynchronous nature of the useState hook, when we call setCurrentTheme() to update the theme, React doesn't immediately update the state. Instead, it schedules the update to be applied on the next render.
    // To log the updated state, do it in a useEffect that listens for changes in currentTheme. 
    const handleThemeSelection = (theme) => {
        switch (theme) {
            case 'dark':
                setTheme('dark');
                break;
            case 'light':
                setTheme('light');
                break;
            case 'system':
                setTheme('system');
                break;
        }
    }

    // useEffect(() => {
    //     if (hasMounted.current) {
    //         console.log(currentTheme);
    //     } else {
    //         hasMounted.current = true;
    //     }
    // }, [currentTheme]);

    return (
        <StyledThemeSelector>
            <button className={`select-light-btn theme-btn ${theme === "light" ? 'active' : ''}`} onClick={() => handleThemeSelection('light')}>
                <Sun />
            </button>
            <button className={`select-system-btn theme-btn ${theme === "system" ? 'active' : ''}`} onClick={() => handleThemeSelection('system')}>
                <Display />
            </button>
            <button className={`select-dark-btn theme-btn ${theme === "dark" ? 'active' : ''}`} onClick={() => handleThemeSelection('dark')}>
                <Moon />
            </button>
        </StyledThemeSelector>
    )
}

export default ThemeSelector