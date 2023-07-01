import styled from "styled-components"
import Task from "../Components/Task";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StyledSingleCollection = styled.div`
  margin-top: 50px;
  /* background-color: purple; */
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
        width: 100%;
        height: 100%;
        border: none;
        padding: 0 14px;
        /* color: white; */

        &:focus{
            outline: none;
        }
      }
    }
  }

  .task-container{
    background-color: inherit;
    /* background-color: yellow; */
    width: 600px;
    height: calc(100vh - 215px);
    padding-bottom: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    transition: all .3s ease-in;

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

    /* .NOTtask-container::-webkit-scrollbar {
      width: 4px;
    } */
  }
`;

const SingleCollection = () => {

  const [collectionName, setCollectionName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    formData[e.target[1].getAttribute("name")] = e.target[1].value;
    formData.collection_name = collectionName;
    e.target[1].value = "";

    console.log(formData)
  }

  // useEffect(() => {
  //   const extractedPathArr = window.location.pathname.split('/');
  //   setCollectionName(extractedPathArr[2])
  // }, [collectionName])


  const { collection } = useParams();
  useEffect(() => {
    setCollectionName(collection);
  }, [collection])

  const capitalize = (str) => {
    if (typeof str !== 'string') {
      throw new TypeError('Input must be a string');
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  return (
    <Layout>
      <StyledSingleCollection>
        <header>
          <div className="heading">
            <h1 className="collection-heading">{capitalize(collectionName).slice(0, 40)}{collectionName.length > 40 && "..."}</h1>
            <h1>...</h1>
          </div>
          <form className="input-box" onSubmit={handleSubmit}>
            <button type="submit">+</button><input type="text" name="task" placeholder="Add a task" autoComplete="off" />
          </form>
        </header>
        <div className="task-container">
          <Task name={"The quick brown fox jumps over a lazy dog.The quick brown fox jumps over a lazy dog.The quick brown fox jumps over a lazy dog."} />
          <Task name={"Single Task to do 1"}/>
          <Task name={"Single Task to do 2"}/>
          <Task name={"Single Task to do 3"}/>
          <Task name={"Single Task to do 4"}/>
          <Task name={"Single Task to do 5"}/>
          <Task name={"Single Task to do 6"}/>
          <Task name={"Single Task to do 7"}/>
          <Task name={"Single Task to do 8"}/>
          <Task name={"Single Task to do 9"}/>
          <Task name={"Single Task to do 10"}/>
          <Task name={"Single Task to do 11"}/>
          <Task name={"Single Task to do 12"}/>
          <Task name={"Single Task to do 13"}/>
          <Task name={"Single Task to do 14"}/>
          <Task name={"Single Task to do 15"}/>
          <Task name={"Single Task to do 16"}/>
          <Task name={"Single Task to do 17"}/>
        </div>
      </StyledSingleCollection>
    </Layout>
  )
}

export default SingleCollection