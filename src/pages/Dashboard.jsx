import styled from "styled-components"
import Task from "../Components/Task";
import Layout from "./Layout";
import ThreeDots from "../Components/icons/ThreeDots";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import { TaskContext } from "../Context/TaskContext";
import { SearchContext } from "../Context/SearchContext";

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
    background-color: transparent;
    width: 600px;
    height: calc(100vh - 240px);
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
      height: calc(100vh - 230px);
    }

    /* .NOTtask-container::-webkit-scrollbar {
      width: 4px;
    } */
  }
`;

const Dashboard = () => {

  const { user } = useContext(UserContext);
  const { tasks, loadingTasks, fetchTasks } = useContext(TaskContext);
  const { searchTaskResult } = useContext(SearchContext);

  const [greeting, setGreeting] = useState("");

  if (localStorage.getItem('isWelcomed') === 'true') {
    toast.success("Welcome to tasks.", { position: toast.POSITION.TOP_CENTER });
    localStorage.removeItem('isWelcomed');
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good morning");
    } else if (currentHour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchTasks();
  //   };

  //   fetchData();
  // }, []);


  const data = useSelector((state) => {
    return state.data;
  })


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
            <h1>{user.username?.split(' ')[0]}</h1>
          </div>
        </header>
        <div className="task-container">
          {!loadingTasks && tasks.length === 0 && <h2 className="msg">No tasks to show.<br/>Create your first task.</h2>}
          {
            searchTaskResult.map(({ _id, user, collection_id, task, active }, idx) => {
              return (<Task _id={_id} user={user} name={task} collection_id={collection_id} isActive={active} key={_id} showCollectionName={true} />)
            })
          }
          {loadingTasks && <h2 className="msg">Loading Tasks...</h2>}
          {tasks.length !== 0 && searchTaskResult.length === 0 && <h2 className="msg">No results</h2>}
        </div>
      </StyledDashboard>
    </Layout>
  )
}

export default Dashboard