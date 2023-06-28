import styled from "styled-components"
import Task from "../Components/Task";

const StyledDashboard = styled.div`
  margin-top: 50px;
  /* background-color: purple; */
  width: 100%;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header{
    background-color: inherit;
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h1{
      background-color: inherit;
      font-weight: 500;
    }

    .heading{
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      height: 60px;
      background-color: inherit;
    }

    .greet{
      height: 90px;
      padding: 0 5px;
      background-color: inherit;
    }
  }

  .dashboard-container{
    background-color: inherit;
    /* background-color: yellow; */
    width: 600px;
    max-height: calc(100vh - 250px);
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
      padding-left: 5%;
      padding-right: 5%;

      .heading {
        height: 60px;
      }

      .greet {
        height: 70px;
      }
    }

    .dashboard-container{
      width: 100%;
      padding: 0 5%;
      padding-bottom: 10px;
      max-height: calc(100vh - 210px);
    }

    /* .NOTdashboard-container::-webkit-scrollbar {
      width: 4px;
    } */
  }
`;

const Dashboard = () => {
  return (
    <StyledDashboard>
      <header>
        <div className="heading">
          <h1 className="dashboard-heading">Dashboard</h1>
          <h1>...</h1>
        </div>
        <div className="greet">
          <h1>Good morning,</h1>
          <h1>Jhon Doe</h1>
        </div>
      </header>
      <div className="dashboard-container">
        <Task name={"Task to do"} collection={"Default"} />
        <Task name={"Task to do 1"} collection={"School"} />
        <Task name={"Task to do 2"} collection={"Personal"} />
        <Task name={"Task to do 3"} collection={"School"} />
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
  )
}

export default Dashboard