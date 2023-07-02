import styled from "styled-components"
import Task from "../Components/Task";
import Layout from "./Layout";
import ThreeDots from "../Components/icons/ThreeDots";
import { useEffect, useState } from "react";

const StyledDashboard = styled.div`
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
      /* background-color: pink; */

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
        svg{
          fill: var(--text-primary);
          height: 23px;
          width: 23px;
        }
      }
      
    }

    .greet{
      font-size: 20px;
      height: 90px;
      padding: 0 5px;
      background-color: inherit;
    /* background-color: green; */
      h1{
        background-color: inherit;
      }

    }
  }

  .task-container{
    /* background-color: inherit; */
    /* background-color: yellow; */
    width: 600px;
    max-height: calc(100vh - 240px);
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

      .greet {
        height: 90px;
      }
    }

    .task-container{
      width: 100%;
      padding: 0 10px;
      padding-bottom: 10px;
      max-height: calc(100vh - 230px);
    }

    /* .NOTtask-container::-webkit-scrollbar {
      width: 4px;
    } */
  }
`;

const Dashboard = () => {

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, [])


  return (
    <Layout>
      <StyledDashboard>
        <header>
          <div className="heading">
            <h1 className="dashboard-heading">Dashboard</h1>
            {/* <button className="delete-coll-btn"><ThreeDots /></button> */}
          </div>
          <div className="greet">
            <h1>{greeting},</h1>
            <h1>{"Jhon Doe"}</h1>
          </div>
        </header>
        <div className="task-container">
          <Task name={"The quick brown fox jumps over a lazy dog. The quick brown fox jumps over a lazy dog. The quick brown fox jumps over a lazy dog."} collection={"Default"} />
          <Task name={"Task to do 1"} collection={"School"} />
          <Task name={"Task to do 2"} collection={"Personal"} />
          <Task name={"Task to do 3"} />
          <Task name={"Task to do 4"} collection={"Grocery"} />
          <Task name={"Task to do 5"} collection={"School"} />
          <Task name={"Task to do 6"} collection={"Design"} />
          <Task name={"Task to do 7"} collection={"School"} />
          <Task name={"Task to do 8"} collection={"School"} />
          <Task name={"Task to do 9"} collection={"School"} />
          <Task name={"Task to do 10"} collection={"Personal"} />
          <Task name={"Task to do 11"} collection={"Personal"} />
          <Task name={"Task to do 12"} collection={"School"} />
          <Task name={"Task to do 13"} collection={"Design"} />
          <Task name={"Task to do 14"} collection={"School"} />
          <Task name={"Task to do 15"} collection={"Design"} />
          <Task name={"Task to do 16"} collection={"School"} />
          <Task name={"Task to do 17"} collection={"School"} />
        </div>
      </StyledDashboard>
    </Layout>
  )
}

export default Dashboard