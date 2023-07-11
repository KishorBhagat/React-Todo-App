import styled from "styled-components"
import Collection from "../Components/Collection";
import Layout from "./Layout";
import Modal from "../Components/Modal";
import { useContext, useEffect, useRef, useState } from "react";
import { CollectionContext } from "../Context/CollectionContext";
import { SearchContext } from "../Context/SearchContext";

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
  header{
    background-color: inherit;
    /* background-color: green; */
    width: 500px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    /* padding-bottom: 50px; */

    h1{
      background-color: inherit;
      font-weight: 500;
    }
  }

  .collection-container{
    background-color: transparent;
    /* background-color: yellow; */
    width: 500px;
    max-height: calc(100vh - 170px);
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
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
        width: 2px;
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

  @media (max-width: 700px){
    margin-top: 0px;
    padding-top: 0;

    .container{
      .add-collection-form{
        width: 270px;
      }
    }
    header{
      width: 100%;
      padding-top: 20px;
      padding-left: 5%;
      padding-right: 5%;
    }

    .collection-container{
      width: 100%;
      padding: 0 5%;
      padding-bottom: 10px;
      min-height: calc(100vh - 140px);
    }
  }
`;

const Collections = () => {

  const {collections} = useContext(CollectionContext)


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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
        <header>
          <h1 className="collections-heading">Collections</h1>
          {/* <h1>...</h1> */}
        </header>
        <div className="collection-container">
          {
            searchCollectionResult.map(({ collection_name, _id, total_tasks, total_finished }, id) => {
              return (
                <Collection name={collection_name} total={total_tasks} done={total_finished} key={_id} />
              )
            })
          }

          <button onClick={() => setIsModalOpen(true)}>+</button>
        </div>
      </StyledCollections>
    </Layout>
  )
}

export default Collections