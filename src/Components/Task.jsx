import { useRef } from "react";
import styled from "styled-components"
import NotificationSound from "/achive-sound.mp3";
import Trash from "./icons/Trash";

const StyledTask = styled.div`
    background-color: var(--background-secondary);
    padding: 12px;
    margin: 10px 5px;
    border-radius: 14px;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    transition: all .5s ease-in;
    height: fit-content;

    .left{
        display: flex;
        flex-direction: row;
        background-color: inherit;

        .check-box{
            background-color: inherit;
            display: flex;
            align-items: flex-start;

            input[type=checkbox]{
                /* accent-color: #C82F8E; */


                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;

                height: 20px;
                min-width: 20px;
                max-width: 20px;
                border-radius: 8px;
                margin-right: 14px;
                border: 3px solid #e756b5;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: inherit;

                &::after{
                    content: "";
                    height: 4px;
                    width: 8px;
                    border-left: 2px solid white;
                    border-bottom: 2px solid white;
                    border-color: white;
                    transform: rotate(-45deg);
                    position: relative;
                    bottom: 1px;
                    display: none;
                }

                &:checked{
                    background-color: #e756b5;
                    box-shadow: rgba(231, 86, 181, 0.55) 0px 0px 25px;
                }
                &:checked::after{
                    display: block;
            }
            }
        }

        .label{
            display: flex;
            flex-direction: column;
            background-color: inherit;
            label{
                background-color: inherit;
                font-size: 16px;
                color: var(--text-tertiary);
                /* display: flex;
                justify-content: center; */
                /* margin-top: 2px; */
            }
            span{
                background-color: inherit;
                color: #9a9aa8;
                color: #c84949;
                font-size: 12px;
                position: relative;
                top: 5px;
                /* margin-top: 5px; */
            }
        }
    }
    
    button{
        cursor: pointer;
        height: fit-content;
        background-color: transparent;
        color: var(--text-primary);
        opacity: 1;
        border: none;
        display: none;

        svg{
            background-color: inherit;
        }
    }
`;

const Task = ({ name, collection }) => {

    const audioPlayer = useRef(null);
    const labelRef = useRef();
    const taskRef = useRef();
    const deleteRef = useRef();

    const handleOnCheck = (e) => {
        if (e.target.checked) {
            labelRef.current.style.textDecoration = "line-through";
            labelRef.current.style.textDecorationColor = "#e756b5";
            labelRef.current.style.textDecorationThickness = "1.5px";
            taskRef.current.style.opacity = ".5";
            deleteRef.current.style.display = "block";
        }
        else {
            labelRef.current.style.textDecoration = "none";
            taskRef.current.style.opacity = "1";
            deleteRef.current.style.display = "none";
        }
    }

    const handleDelete = (e) => {
        taskRef.current.style.opacity = ".3";
        taskRef.current.style.transform = "translate(100%)";
        setTimeout(() => {
            audioPlayer.current.play();
            taskRef.current.style.opacity = "0";
            taskRef.current.style.display = "none";
        }, 700)
    }


    return (
        <StyledTask ref={taskRef}>
            <div className="left">
                <div className="check-box">
                    <input type="checkbox" name="done" id={"done-checkbox"} onChange={(e) => handleOnCheck(e)} />
                </div>
                <div className="label">
                    <label ref={labelRef}>{name}</label>
                    {
                        collection !== "Default" && (<span style={{}}>{collection}</span>)
                    }

                </div>
            </div>
            <button ref={deleteRef} className="delete-btn" onClick={handleDelete}><Trash /></button>
            <audio ref={audioPlayer} src={NotificationSound} />
        </StyledTask>
    )
}

export default Task