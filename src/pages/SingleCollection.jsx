import styled from "styled-components"
import Task from "../Components/Task";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreeDots from "../Components/icons/ThreeDots"
import Trash from "../Components/icons/Trash";
import PencilSquare from "../Components/icons/PencilSquare";

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
      .delete-coll-btn{
        border: none;
        background-color: inherit;
        width: fit-content;
        display: flex;
        /* background-color: red; */
        padding-top: 3px;
        cursor: pointer;
        svg{
          fill: var(--text-primary);
          height: 23px;
          width: 23px;
        }
        position: relative;
        .options{
          position: absolute;
          width: fit-content;
          top: 28px;
          right: 10px;
          display: none;
          cursor: pointer;
          background-color: red;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          
          li{
            background-color: var(--background-secondary);
            font-size: 16px;
            color: var(--text-secondary);
            list-style: none;
            padding: 4px 6px;
            padding-right: 30px;
            text-align: left;
            display: flex;
            align-items: center;
            transition: .2s ease;
            
            svg{
              height: 16px;
              width: 16px;
              margin-right: 10px;
              fill: var(--text-secondary);
            }
            &:hover{
              background-color: var(--hover);
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
            <button className="delete-coll-btn">
              <div onClick={e => {
                if(document.querySelector(".options").style.display == "none")
                  document.querySelector(".options").style.display = "block";
                else
                  document.querySelector(".options").style.display = "none";
              }}>
                <ThreeDots />
              </div>
              <div className="options" /*onMouseLeave={e => document.querySelector(".options").style.display = "none"}*/>
                <li><Trash /> Delete</li>
                <li><PencilSquare/>Rename</li>
              </div>
            </button>
          </div>
          <form className="input-box" onSubmit={handleSubmit}>
            <button type="submit">+</button><input type="text" name="task" placeholder="Add a task" autoComplete="off" required/>
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