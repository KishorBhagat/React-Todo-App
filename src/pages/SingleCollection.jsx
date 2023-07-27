import styled from "styled-components"
import Task from "../Components/Task";
import Layout from "./Layout";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ThreeDots from "../Components/icons/ThreeDots"
import Trash from "../Components/icons/Trash";
import PencilSquare from "../Components/icons/PencilSquare";
import { CollectionContext } from "../Context/CollectionContext";
import { TaskContext } from "../Context/TaskContext";
import Modal from "../Components/Modal";
import { SearchContext } from "../Context/SearchContext";

const StyledSingleCollection = styled.div`
  margin-top: 50px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  width: 100%;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header{
    background-color: inherit;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .heading{
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      height: 60px;
      background-color: inherit;

      h1{
        font-weight: 500;
        background-color: inherit;
      }
      .utility{
        position: relative;

        .utility-btn{
          border: none;
          background-color: inherit;
          width: fit-content;
          display: flex;
          padding-top: 3px;
          position: relative;
          cursor: pointer;
          svg{
            fill: var(--text-primary);
            height: 23px;
            width: 23px;
          }
        }

        .options{
          position: absolute;
          width: fit-content;
          top: 29px;
          right: 10px;
          border-radius: 8px;
          padding: 8px 0;
          overflow: hidden;
          background-color: white;
          z-index: 1;
          cursor: pointer;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

          .options-list {
            li{
              background-color: inherit;
              list-style: none;
              padding: 8px 16px;
              display: flex;
              align-items: center;
              /* margin-top: 1px; */
              color: black;
              font-size: 14px;
              transition: .2s ease;
              &:hover{
                background-color: #f1efef;
              }

              svg{
                display: none;
                width: 13px;
                fill: var(--text-secondary);
                margin-right: 10px;
              }
            }
          }
          }
        }
      }

    .input-box{
      /* font-size: 20px; */
      height: 40px;
      padding: 0px 9px;
      margin: 25px 5px;
      margin-top: 0px;
      border-radius: 14px;
      background-color: inherit;
      /* background-color: green; */
      border: 3px solid var(--background-secondary);
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        height: 20px;
        width: 20px;
        border: 3px solid #e756b5;
        border-radius: 8px;
        background-color: #e756b5;
        cursor: pointer;
        color: var(--background-primary);
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      input {
        background-color: var(--background-primary);
        color: var(--text-primary);
        width: 100%;
        height: 100%;
        border: none;
        padding: 0 14px;

        &:focus{
            outline: none;
        }
      }
    }
  }

  .task-container{
    width: 600px;
    height: calc(100vh - 215px);
    padding-bottom: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .3s ease-in;
    .msg{
      color: var(--text-primary);
      text-align: center;
      font-weight: 300;
      position: relative;
      top: calc(50% - 50px);
    }

    &::-webkit-scrollbar {
      width: 0px;
      /* height: 7.5px; */
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
    &::-webkit-scrollbar-thumb {
        background: #9a9aa8;
        /* background: #1d1e26; */
        border-radius: 100px;
    }
  }

  .modal-inner-container{
    background-color: white;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 2px;

    .heading{
      color: var(--pink);
      margin-bottom: 20px;
      font-weight: 500;
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
        border-bottom: 1px solid #e756b5;
        /* border-bottom: 2px solid black; */
        /* border-radius: 10px; */
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

  /* ::selection {
      color: #ccd6f6;
      background: #233554;
  } */

  @media (max-width: 700px){
    margin-top: 0px;
    padding-top: 0;
    
    header{
      width: 100%;
      padding-top: 20px;
      padding-left: 10px;
      padding-right: 10px;

      .heading {
        height: 60px;
      }

      .input-box {
        display: none;
      }
    }

    .task-container{
      width: 100%;
      padding: 0 10px;
      padding-bottom: 10px;
      height: calc(100vh - 120px);
    }

    .modal-inner-container{
      border-radius: 14px;
      .heading{
        font-size: 20px;
      }
    }
    /* .NOTtask-container::-webkit-scrollbar {
      width: 4px;
    } */
  }
`;

const SingleCollection = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  const { collection } = useParams();

  useEffect(() => {
    setCollectionName(collection);
  }, [collection])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [collectionName, setCollectionName] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [currentCollectionID, setCurrentCollectioinID] = useState('');
  const [currentCollectionTotalTasks, setCurrentCollectioinTotalTasks] = useState(null);

  const optionsRef = useRef();

  const { tasks, loadingTasks, fetchTasks } = useContext(TaskContext);
  const { collections, fetchCollections } = useContext(CollectionContext);
  const { searchValue, searchTaskResult } = useContext(SearchContext);


  const currentCollection = collections?.filter((obj) => obj.collection_name === collectionName);

  const filteredTasks = searchTaskResult?.filter((obj) => obj.collection_id === currentCollectionID);
  // console.log(filteredTasks)

  useEffect(() => {
    if (currentCollection.length !== 0) {
      setCurrentCollectioinID(currentCollection[0]._id);
      setCurrentCollectioinTotalTasks(currentCollection[0].total_tasks);
    }
  }, [currentCollection])

  const handler = (e) => {
    if (!optionsRef.current?.contains(e.target)) {
      setIsOptionsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }

  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks();
    };

    fetchData();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const UpdateCollection = async (options) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections/${currentCollectionID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'authToken': token
        },
        body: JSON.stringify(options)
      });

      if (response.ok) {
        await fetchCollections();
        setIsSubmitting(false);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // console.log(collections.filter((obj) => obj.collection_id === currentCollectionID))
  // console.log(collection)
  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = {};
    formData[e.target[1].getAttribute("name")] = e.target[1].value;
    formData.collection_id = currentCollectionID;
    e.target[1].value = "";
    console.log(formData)

    if (isSubmitting) {
      console.log("Wait");
      return
    }

    try {
      setIsSubmitting(true);
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
        tasks.push(data);

        await fetchCollections();

        UpdateCollection({ total_tasks: currentCollectionTotalTasks + 1 });

      }

    } catch (error) {
      console.log(error);
    }

  }

  const capitalize = (str) => {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleDeleteCollection = async () => {
    setIsOptionsOpen(false);
    if (!confirm("Delete the collection?\nAll tasks in this collection will be deleted.")) {
      setIsOptionsOpen(false)
      return
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections/${currentCollectionID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authToken': token
        },
      });
      if (response.ok) {
        await fetchCollections();
        navigate('/collections', { replace: true });

      }

    } catch (error) {
      console.log(error);
    }
  }
  const handleRenameCollection = async (e) => {
    e.preventDefault();
    const formData = {};
    formData[e.target[0].getAttribute("name")] = (e.target[0].value).toLowerCase().trim();
    // console.log(formData)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections/${currentCollectionID}`, {
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
        e.target[0].value = "";
        await fetchCollections();
        navigate(`/collections/${data.collection_name}`, { replace: true });
      }

    } catch (error) {
      console.log(error);
    }
  }

  const inputRenameRef = useRef();
  const [curColName, setCurColName] = useState(collection);
  
  const handleInputChange = (e) => {
    setCurColName(e.target.value);
  }
  
  useEffect(() => {
    inputRenameRef.current.value = capitalize(collection);
    inputRenameRef.current.focus()
  }, [isModalOpen])


  return (
    <Layout>
      <StyledSingleCollection>
        <header>
          <div className="heading">
            <h1 className="collection-heading">{capitalize(collectionName).slice(0, 40)}{collectionName.length > 40 && "..."}</h1>
            {collectionName !== "default" &&

              <div className="utility" ref={optionsRef}>
                <button className="utility-btn" onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                  <ThreeDots />
                </button>

                <div className="options">
                  {
                    isOptionsOpen && (
                      <div className="options-list">
                        <li onClick={handleDeleteCollection}><Trash /> Delete</li>
                        <li onClick={() => {setIsModalOpen(true); setIsOptionsOpen(false);}}><PencilSquare />Rename</li>
                      </div>
                    )
                  }
                </div>
              </div>
            }
          </div>
          <form className="input-box" onSubmit={handleSubmit}>
            <button type="submit">+</button><input type="text" name="task" placeholder="Add a task" autoComplete="off" required />
          </form>
        </header>
        <div className="task-container">
          {
            filteredTasks
              .map(({ _id, user, collection_id, task, dueDate, active }, idx) => {
                return (<Task _id={_id} collection_id={collection_id} user={user} name={task} dueDate={dueDate} isActive={active} key={_id} showCollectionName={false} />)
              })
          }
          {
            loadingTasks && filteredTasks.length === 0 ? (<h2 className="msg">Loading Tasks...</h2>) :
              (
                tasks.length !== 0 && filteredTasks.length === 0 && searchValue.length === 0 ? (<h2 className="msg">No tasks in this collection.</h2>) :
                  (
                    filteredTasks.length === 0 && searchValue.length !== 0 ? <h2 className="msg">No result</h2> : null
                  )
              )
          }


        </div>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <div className="modal-inner-container">
            <h2 className="heading">Rename Collection</h2>
            <form className="rename-collection-form" onSubmit={handleRenameCollection}>
              <input 
                // onFocus={(e) => e.target.select()} 
                type="text" 
                name="collection_name" 
                onChange={handleInputChange} 
                ref={inputRenameRef} 
                autoComplete="off" 
                required 
              />
              <div className="buttons">
                <button type="button" onClick={() => { setIsModalOpen(false); setCurColName(collection) }}>CANCEL</button>
                <button type="submit">DONE</button>
              </div>
            </form>
          </div>
        </Modal>

      </StyledSingleCollection>
    </Layout>
  )
}

export default SingleCollection