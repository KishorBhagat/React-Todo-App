import styled from "styled-components"
import Collection from "./icons/Collection"
import { useContext, useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { CollectionContext } from "../Context/CollectionContext"
import { TaskContext } from "../Context/TaskContext"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const StyledFormModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    padding: 0 10px;
    background-color: rgba(0, 0, 0, 0.5);

    .new-collection-modal{
        background-color: white;
        padding: 20px;
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 2px;
        transform: translate(-50%, -50%);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        z-index: 100;

        .heading{
            color: var(--pink);
            margin-bottom: 20px;
            font-weight: 500;
        }

        .add-collection-form{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
      
          input {
            height: 40px;
            width: 100%;
            background-color: inherit;
            font-size: 16px;
            border: none;
            border-bottom: 1px solid #e756b5;
            :focus{
              outline: none;
              border-bottom: 2px solid #e756b5;
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

    .form-container{
        position: relative;
        width: 500px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--background-secondary);
        color: var(--text-primary);
        border-radius: 4px;
        padding: 20px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

        .heading{
            text-align: center;
            margin-bottom: 30px;
            background-color: inherit;

            /* padding: 20px 0; */
        }
        
        form{
            display: flex;
            flex-direction: column;
            background-color: inherit;

            label{
                background-color: inherit;                
            }
            input{
                height: 40px;
                width: 100%;
                padding: 0 5px;
                background-color: inherit;
                margin-top: 10px;
                margin-bottom: 20px;
                border: none;
                /* border: 3px solid var(--background-secondary); */
                color: var(--text-primary);
                border: none;
                border-bottom: 1px solid var(--text-secondary);
                /* border-radius: 10px; */
                :focus{
                    outline: none;
                    border-bottom: 1px solid #e756b5;
                }
            }
            .collection-options{
                display: flex;
                align-items: center;
                margin-top: 10px;
                margin-bottom: 20px;
                background-color: inherit;
                select {
                    width: 100%;
                    height: 40px;
                    /* padding: 0 14px; */
                    /* border-radius: 10px; */
                    background-color: inherit;
                    color: var(--text-primary);
                    border: none;
                    border-bottom: 1px solid var(--text-secondary);
                    margin-right: 20px;
                    :focus{
                        outline: none;
                        border-bottom: 1px solid #e756b5;
                    }
                }
                svg{
                    fill: var(--text-primary);
                    background-color: inherit;
                    height: 24px;
                    width: 24px;
                    cursor: pointer;
                }
            }

            .buttons{
                display: flex;
                gap: 10px;
                background-color: inherit;
                margin-top: 20px;
                button{
                    height: 40px;
                    width: 50%;
                    border: none;
                    border: 1px solid #e756b5;
                    border-radius: 4px;
                    padding: 8px 20px;
                    cursor: pointer;
                    background-color: inherit;
                    color: white;
                    transition: .2s ease;
                    &:hover{
                        background-color: #e756b5;
                    }

                }
                .cancel{
                    color: #e756b5;
                    &:hover{
                        color: white;
                    }
                }
                .add{
                    background-color: #e756b5;
                }
            }
        }

    }

    @media (max-width: 700px){
        padding: 0;
        .new-collection-modal{
            border-radius: 14px;
            .heading{
                font-size: 20px;
            }
        }
        .form-container{
            width: 100%;
            height: 100%;
            border-radius: 0;
        }
    }
    
`

const FormModal = ({ isFormModalOpen, setIsFormModalOpen }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collectionName, setCollectionName] = useState('');
    const [task, setTask] = useState('');
    const [selectedDate, setSelectedDate] = useState(null)

    const { collection } = useParams();

    const { collections, fetchCollections } = useContext(CollectionContext);
    const { tasks, fetchTasks } = useContext(TaskContext);

    const currentCollection = collections.filter((obj) => obj.collection_name === collectionName);
    // console.log(currentCollection.length != 0)

    collections.sort((a, b) => {
        const nameA = a.collection_name.toLowerCase();
        const nameB = b.collection_name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    const capitalize = (str) => {
        if (typeof str !== 'string') {
            throw new TypeError('Input must be a string');
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    const token = localStorage.getItem('accessToken');

    const UpdateCollection = async (options) => {

        await fetchCollections();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections/${currentCollection[0]._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(options)
            });
            if (response.ok) {
                await fetchCollections();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleAddNewTask = async (e) => {
        e.preventDefault();
        const formData = {};
        // formData[e.target[0].getAttribute("name")] = e.target[0].value;
        // formData[e.target[1].getAttribute("name")] = e.target[1].value;
        formData['task'] = task;
        formData['dueDate'] = selectedDate;
        formData['collection_id'] = selectRef.current.value;
        console.log(formData)

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const data = await response.json();
                setIsFormModalOpen(false);
                // e.target[0].value = "";
                setTask('');
                setSelectedDate(null);
                await fetchTasks();
            }

        } catch (error) {
            console.log(error);
        }

    }

    const handleAddNewCollection = async (e) => {
        e.preventDefault();
        const formCollectionData = {};
        formCollectionData[e.target[0].getAttribute("name")] = e.target[0].value;
        e.target[0].value = "";

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
                body: JSON.stringify(formCollectionData)
            });
            if (response.ok) {
                const data = await response.json();
                await fetchCollections();
                console.log(data._id)
                console.log(collections?.filter((obj) => obj.collection_name === data.collection_name)[0]?._id);
                document.querySelector("#coll").value = data?._id;
            }

        } catch (error) {
            console.log(error);
        }

        setIsModalOpen(false);
    }

    const handleCancleBtn = () => {
        setIsFormModalOpen(false);
        document.querySelector("#coll").value = collections?.filter((obj) => obj.collection_name === "default")[0]?._id;
    }

    const handleModal = () => {
        setIsModalOpen(true);
    }

    useEffect(() => {
        setCollectionName(collection);
    }, [collection]);

    const inputTaskRef = useRef();
    const inputCollectionRef = useRef();
    const selectRef = useRef();

    useEffect(() => {
        if (collectionName) {
            document.querySelector("#coll").value = currentCollection[0]?._id;
        }
        else {
            if (collections?.filter((obj) => obj.collection_name === "default").length !== 0) {
                selectRef.current.value = collections?.filter((obj) => obj.collection_name === "default")[0]?._id;
            }
        }
    }, [collectionName, isFormModalOpen])

    useEffect(() => {
        inputTaskRef.current.value = "";
    }, [isFormModalOpen]);
    useEffect(() => {
        inputCollectionRef.current.value = "";
    }, [isModalOpen]);

    useEffect(() => {
        inputTaskRef.current.focus();
    }, [isFormModalOpen])
    useEffect(() => {
        inputCollectionRef.current.focus();
    }, [isModalOpen])

    return (
        <StyledFormModal className="overlay" style={{ display: `${isFormModalOpen ? "block" : "none"}` }} onClick={() => { setIsFormModalOpen(false); setIsModalOpen(false) }}>
            <div className="new-collection-modal" style={{ display: `${isModalOpen ? "block" : "none"}` }} onClick={e => e.stopPropagation()}>
                <div className="container">
                    <h2 className="heading">New Collection</h2>
                    <form className="add-collection-form" onSubmit={handleAddNewCollection}>
                        <input autoFocus={true} autoComplete="off" type="text" name="collection_name" placeholder="Enter collection name" ref={inputCollectionRef} required />
                        <div className="buttons">
                            <button type="button" onClick={() => setIsModalOpen(false)}>CANCEL</button>
                            <button type="submit">ADD</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="form-container" onClick={e => e.stopPropagation()}>
                <h2 className="heading">Add new Task</h2>
                <form action="" onSubmit={handleAddNewTask}>
                    <label htmlFor="">What is to be done?</label>
                    <input onChange={(e) => {setTask(e.target.value)}} value={task} type="text" name="task" autoComplete="off" placeholder="Enter task here" autoFocus={true} ref={inputTaskRef} required />
                    <label htmlFor="">Due date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat={"MMMM d, yyyy h:mm aa"}
                        minDate={new Date}
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                        showTimeSelect
                        placeholderText="No due date"
                    />
                    <label htmlFor="">Add to Collection</label>
                    <div className="collection-options">
                        <select name="collection_id" id="coll" ref={selectRef}>
                            {
                                collections.map(({ collection_name, _id }, idx) => {
                                    return (<option value={_id} key={idx} >{capitalize(collection_name)}</option>)
                                })
                            }
                        </select>
                        <div onClick={handleModal}>
                            <Collection />
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="button" className="cancel" onClick={handleCancleBtn}>CANCEL</button>
                        <button type="submit" className="add">ADD</button>
                    </div>
                </form>
            </div>
        </StyledFormModal>
    )
}

export default FormModal