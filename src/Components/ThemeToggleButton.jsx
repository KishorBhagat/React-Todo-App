import { useRef } from "react";
import styled from "styled-components"

const StyledToggleButton = styled.div`
    background-color: inherit;
    cursor: pointer;

    .toggle-track{
       height: 20px;
       width: 40px;
       border-radius: 20px;
       background-color: #9a9aa8;
       display: flex;
       align-items: center;
       position: relative;
        /* flex-direction: column; */

        &:hover .toggle-thumb{
            box-shadow: 0 0 2px 4px #e756b5;

        }
       .toggle-thumb{
           position: absolute;
           height: 16px;
           width: 16px;
           border-radius: 50%;
           margin: 0 2px;
           background-color: #fafafa;
           cursor: pointer;
           transition: .2s ease;
           z-index: 1;
       }
       .toggle-icons{
            position: absolute;
            height: 20px;
            width: 40px;
            border-radius: 20px;
            background-color: transparent;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .moon, .sun{
                font-size: 10px;
                border-radius: 50%;
                background-color: transparent;
                ::selection{
                    color: red;
                }
            }
       }
    }
`;

const ToggleButton = () => {

    const thumbRef = useRef();

    const handleToggleTheme = (e) => {
        if (document.body.classList == "dark-theme") {
            document.body.classList = "light-theme";
            thumbRef.current.style.transform = "translateX(20px)";
            localStorage.setItem('theme', 'light-theme')
        }
        else {
            document.body.classList = "dark-theme"
            thumbRef.current.style.transform = "translateX(0px)";
            localStorage.setItem('theme', 'dark-theme')
        }
    }

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