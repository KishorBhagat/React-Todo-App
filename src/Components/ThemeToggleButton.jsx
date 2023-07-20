import { useEffect, useRef } from "react";
import styled from "styled-components"
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";

const StyledToggleButton = styled.div`
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
    const currentTheme = document.body.className;

    const handleToggleTheme = (e) => {
        if (document.body.classList == "dark-theme") {
            document.body.classList = "light-theme";
            thumbRef.current.style.transform = "translateX(24px)";
            localStorage.setItem('theme', 'light-theme')
        }
        else {
            document.body.classList = "dark-theme"
            thumbRef.current.style.transform = "translateX(0px)";
            localStorage.setItem('theme', 'dark-theme')
        }
    }

    useEffect(() => {
        if(currentTheme === 'light-theme'){
            thumbRef.current.style.transform = "translateX(24px)";
        }
    }, [])

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