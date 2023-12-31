import styled from "styled-components"
import Collection from "../Components/Collection";
import Layout from "./Layout";
import Modal from "../Components/Modal";
import { useContext, useEffect, useRef, useState } from "react";
import { CollectionContext } from "../Context/CollectionContext";
import { SearchContext } from "../Context/SearchContext";
import { TaskContext } from "../Context/TaskContext";
import { toast } from "react-toastify";

const StyledCollections = styled.div`
  margin-top: 50px;
  background-color: var(--background-primary);
  color: var(--text-primary);
  width: 100%;
  padding-top: 40px;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;

  .container{
    background-color: white;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 2px;

    .heading{
      color: var(--pink);
      margin-bottom: 20px;
      font-weight: 500;
    }

    .add-collection-form{
      width: 300px;
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

  .outer-collections-container{
    background-color: inherit;
    /* background-color: red; */
    width: fit-content;
    height: calc(100vh - 90px);
    display: flex;
    flex-direction: column;
    align-items: center;    

    header{
      background-color: inherit;
      width: 100%;
      width: 470px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      /* padding-bottom: 50px; */
  
      h1{
        background-color: inherit;
        font-weight: 500;
      }
    }
  
    .collections-container{
      background-color: transparent;
      width: 470px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 20px;
      overflow: auto;
  
      button{
        width: 150px;
        height: 85px;
        border: 3px solid var(--background-secondary);
        background-color: var(--background-primary);
        border-radius: 20px;
        cursor: pointer;
        color: var(--text-secondary);
        font-size: 25px;
        transition: .2s ease;
  
        &:hover{
          background-color: var(--background-secondary);
        }
      }
  
      &::-webkit-scrollbar {
          width: 0px;
      }
      &::-webkit-scrollbar-track {
          background: transparent;
      }
      &::-webkit-scrollbar-thumb {
          background: #9a9aa8;
          border-radius: 100px;
      }
    }
  }

  @media (max-width: 700px){
    margin-top: 0px;
    padding-top: 0;

    .container{
      border-radius: 14px;
      .heading{
        font-size: 20px;
      }
      .add-collection-form{
        width: 270px;
      }
    }

    .outer-collections-container{
      width: 100%;
      height: calc(100vh - 60px);
      header{
        width: 100%;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 5%;
        padding-right: 5%;
      }
  
      .collections-container{
        width: 100%;
        width: 470px;
        padding-bottom: 60px;
      }
    }
  }
  @media (max-width: 480px){
    .outer-collections-container{
      .collections-container{
        width: 330px;
        button{
          width: 160px;
        }
      }
    }
  }
  @media (max-width: 340px){
    .outer-collections-container{
      .collections-container{
        width: 250px;
        button{
          width: 120px;
        }
      }
    }
  }
`;

const Collections = () => {

  const {collections} = useContext(CollectionContext)
  const {fetchTasks} = useContext(TaskContext)


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNewCollection = async (e) => {
    e.preventDefault();
    const formData = {};
    formData[e.target[0].getAttribute("name")] = e.target[0].value;
    e.target[0].value = "";

    const token = localStorage.getItem('accessToken');
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': token
            },
            body: JSON.stringify(formData)
        });
        if(response.ok){
            const data = await response.json();
            collections.push(data);
        }

    } catch (error) {
        console.log(error);
    }

    setIsModalOpen(false);    
  }

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTasks();
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [isModalOpen]);

  const {searchValue, searchCollectionResult} = useContext(SearchContext);


  return (
    <Layout>
      <StyledCollections>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <div className="container">
            <h2 className="heading">New Collection</h2>
            <form className="add-collection-form" onSubmit={handleAddNewCollection}>
                <input autoFocus={true} autoComplete="off" type="text" name="collection_name" placeholder="Enter collection name" required ref={inputRef}/>
                <div className="buttons">
                  <button type="button" onClick={() => setIsModalOpen(false)}>CANCEL</button>
                  <button type="submit">ADD</button>
                </div>
            </form>
          </div>
        </Modal>
        <div className="outer-collections-container">
          <header>
            <h1 className="collections-heading">Collections</h1>
          </header>
          <div className="collections-container">
            {
              searchCollectionResult.map(({ collection_name, _id, total_tasks, total_finished }, id) => {
                return (
                  // <Collection name={collection_name} total={total_tasks} done={total_finished} key={_id} />
                  <Collection name={collection_name} collection_id={_id} key={_id} />
                )
              })
            }

            <button onClick={() => setIsModalOpen(true)}>+</button>
          </div>
        </div>
      </StyledCollections>
    </Layout>
  )
}

export default Collections