import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components"
import NotificationSound from "/achive-sound.mp3";
import Trash from "./icons/Trash";
import { CollectionContext } from "../Context/CollectionContext";
import { TaskContext } from "../Context/TaskContext";
import PencilSquare from "./icons/PencilSquare";
import Modal from "./Modal";
import { SearchContext } from "../Context/SearchContext";

const StyledTask = styled.div`
    background-color: var(--background-secondary);
    padding: 12px;
    margin: 10px 5px;
    border-radius: 14px;
    display: flex;
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

                .highlight{
                    background-color: #d684b9;
                    /* color: #e756b5; */
                }
            }
            span{
                background-color: inherit;
                color: #9a9aa8;
                color: #c84949;
                font-size: 12px;
                position: relative;
                top: 5px;
            }
        }
    }
    .icons-btn{
        display: flex;
        gap: 10px;
    }
    button{
        cursor: pointer;
        height: fit-content;
        background-color: transparent;
        color: var(--text-primary);
        opacity: 1;
        border: none;

        svg{
            background-color: inherit;
        }
    }
    /* button.delete-btn{
        display: none;
    } */
    
`;

const StyledModal = styled.div`
    .modal-inner-container{
        background-color: white;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        border-radius: 2px;

        .heading{
        color: var(--pink);
        margin-bottom: 20px;
        }

        .rename-collection-form{
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    
        input {
            height: 40px;
            width: 100%;
            /* padding: 0 14px; */
            background-color: inherit;
            font-size: 16px;
            border: none;
            /* color: var(--text-primary); */
            border-bottom: 2px solid #e756b5;
            /* border-bottom: 2px solid black; */
            /* border-radius: 10px; */
            :focus{
            outline: none;
            border-bottom: 3px solid #e756b5;
            caret-color: var(--pink);
            }
        }
    
        .buttons{
            display: flex;
            justify-content: end;
            width: 100%;
            gap: 5px;
            margin-top: 20px;
    
            button{
            border: none;
            padding: 5px 10px;
            color: var(--pink);
            font-weight: 500;
            background-color: inherit;
            cursor: pointer;
            }
        }
        }
    }
`

const Task = ({ _id, name, user, collection_id, isActive, showCollectionName }) => {

    const audioPlayer = useRef(null);
    const labelRef = useRef();
    const taskRef = useRef();
    const deleteRef = useRef();
    const renameRef = useRef();
    const checkRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [collectionName, setCollectionName] = useState('');

    const { collections, fetchCollections } = useContext(CollectionContext);
    const { fetchTasks } = useContext(TaskContext);

    const currentCollection = collections?.filter((obj) => obj._id === collection_id);
    const collectionName = currentCollection[0]?.collection_name;
    const totalTasks = currentCollection[0]?.total_tasks;
    const totalFinished = currentCollection[0]?.total_finished;

    const token = localStorage.getItem('accessToken');


    const UpdateTask = async (options) => {
        // await fetchCollections();
        // await fetchTasks();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(options)
            });
            if (response.ok) {
                // await fetchCollections();
                await fetchTasks();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleOnCheck = async (e) => {

        if (e.target.checked) {
            labelRef.current.style.textDecoration = "line-through";
            labelRef.current.style.textDecorationColor = "#e756b5";
            labelRef.current.style.textDecorationThickness = "1.5px";
            taskRef.current.style.opacity = ".5";
            await UpdateTask({ active: false });
            // deleteRef.current.style.display = "block";
            // renameRef.current.style.display = "none";
        }
        else {
            labelRef.current.style.textDecoration = "none";
            taskRef.current.style.opacity = "1";
            // deleteRef.current.style.display = "none";
            await UpdateTask({ active: true });
            // renameRef.current.style.display = "block";
        }
    }

    const handleDelete = async (e) => {
        // await fetchCollections()
        await fetchTasks();

        taskRef.current.style.opacity = ".3";
        taskRef.current.style.transform = "translate(100%)";
        setTimeout(() => {
            audioPlayer.current.play();
            taskRef.current.style.opacity = "0";
            taskRef.current.style.display = "none";
        }, 700)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token,
                },
            });
            if(response.ok){
                await fetchTasks();
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleRenameCollection = async (e) => {
        e.preventDefault();
        const formData = {};
        formData[e.target[0].getAttribute("name")] = (e.target[0].value).toLowerCase();
        e.target[0].value = "";
        // console.log(formData)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                setIsModalOpen(false);
                await fetchTasks();
                // await fetchCollections();
                // navigate(`/collections/${data.collection_name}`, { replace: true });
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!isActive) {
            labelRef.current.style.textDecoration = "line-through";
            labelRef.current.style.textDecorationColor = "#e756b5";
            labelRef.current.style.textDecorationThickness = "1.5px";
            taskRef.current.style.opacity = ".5";
            deleteRef.current.style.display = "block";
            checkRef.current.checked = true;
        }
    }, [])

    const capitalize = (str) => {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const inputRenameTaskRef = useRef();
    const [curTaskName, setCurTaskName] = useState(name);
    const handleInputChange = (e) => {
        inputRenameTaskRef.current.focus()
        setCurTaskName(e.target.value);
    }

    const { searchValue } = useContext(SearchContext);

    const highlightText = (text) => {
        const regex = new RegExp(searchValue, 'gi');
        return text.replace(regex, (match) => `<label class="highlight">${match}</label>`);
    }

    return (
        <>

            <StyledTask ref={taskRef}>
                <div className="left">
                    <div className="check-box">
                        <input type="checkbox" name="done" id={"done-checkbox"} onChange={(e) => handleOnCheck(e)} ref={checkRef} />
                    </div>
                    <div className="label">
                        <label ref={labelRef} dangerouslySetInnerHTML={{ __html: highlightText(name) }}>
                            {/* {name} */}
                        </label>
                        {
                            showCollectionName && collectionName && collectionName !== "default" && (<span style={{}}>{capitalize(collectionName)}</span>)
                        }

                    </div>
                </div>
                <div className="icons-btn">
                    {
                        isActive ? 
                        <button ref={renameRef} className="rename-btn" onClick={() => setIsModalOpen(true)}><PencilSquare /></button>
                        :
                        <button ref={deleteRef} className="delete-btn" onClick={handleDelete}><Trash /></button>
                    }
                </div>

                <audio ref={audioPlayer} src={NotificationSound} />
            </StyledTask>
            <StyledModal>
                <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} refInput={inputRenameTaskRef} refInputValue={name}>
                    <div className="modal-inner-container">
                        <h2 className="heading">Rename Task</h2>
                        <form className="rename-collection-form" onSubmit={handleRenameCollection}>
                            <input onFocus={(e) => e.target.select()}
                                onChange={handleInputChange} autoComplete="off" type="text" name="task" required ref={inputRenameTaskRef} value={curTaskName} />
                            <div className="buttons">
                                <button type="button" onClick={() => { setIsModalOpen(false); setCurTaskName(name) }}>CANCEL</button>
                                <button type="submit">DONE</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </StyledModal>
        </>
    )
}

export default Task