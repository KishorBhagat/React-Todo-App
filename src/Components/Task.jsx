import { useRef } from "react";
import styled from "styled-components"
import NotificationSound from "/achive-sound.mp3";

const StyledTask = styled.div`
    background-color: var(--background-secondary);
    padding: 12px;
    margin: 10px 5px;
    border-radius: 14px;
    display: flex;
    /* align-items: center; */
    transition: all .5s ease-in;
    height: fit-content;
    
    input[type=checkbox]{
        /* accent-color: #C82F8E; */


        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        height: 20px;
        width: 20px;
        border-radius: 8px;
        margin-right: 14px;
        border: 3px solid #e756b5;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--background-secondary);

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
    input[type=checkbox]:not(:checked){
        
    }
    div{
        display: flex;
        flex-direction: column;
        background-color: inherit;
        label{
            background-color: inherit;
            font-size: 14px;
            color: var(--text-tertiary);
        }
        span{
            background-color: inherit;
            color: #9a9aa8;
            color: #c84949;
            font-size: 12px;
            margin-top: 5px;
        }
    }
`;

const Task = ({name, collection}) => {

    const audioPlayer = useRef(null);
    const labelRef = useRef();
    const taskRef = useRef();

    const handleOnCheck = (e) => {
        if(e.target.checked){
            labelRef.current.style.textDecoration = "line-through";
            taskRef.current.style.opacity = ".5";
            setTimeout(() => {
                taskRef.current.style.opacity = ".3";
                taskRef.current.style.transform = "translate(100%)";
            }, 700)
            setTimeout(() => {
                audioPlayer.current.play();
                taskRef.current.style.opacity = "0";
                taskRef.current.style.display = "none";
            }, 1300)
        }
    }
    

  return (
    <StyledTask ref={taskRef}>
        <input type="checkbox" name="done" id={"done-checkbox"} onChange={(e) => handleOnCheck(e)}/>
        <div>
            <label ref={labelRef}>{name}</label>
            {
                collection !== "Default" && <span>{collection}</span>
            }
            
        </div>
        <audio ref={audioPlayer} src={NotificationSound} />
    </StyledTask>
  )
}

export default Task