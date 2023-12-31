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
    /* transition: all .3s ease-in; */

    .greet-mobile{
      display: none;
    }

    .filter-tabs{
      padding: 0 5px;
      display: flex;
      gap: 10px;
      margin-top: 15px;
      margin-bottom: 20px;
      button{
        padding: 5px 10px;
        border-radius: 8px;
        background-color: var(--background-primary);
        border: 2px solid var(--btn-gray);
        color: var(--text-primary);
        cursor: pointer;

        &:hover{
          background-color: var(--background-secondary);
        }

        &.active{
          background-color: var(--background-secondary);
        }
      }
    }

    .msg{
      color: var(--text-primary);
      text-align: center;
      font-weight: 300;
      position: relative;
      top: calc(50% - 50px);

      @media (max-width: 700px){
        top: calc(20%);
      }
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
        /* height: 90px; */
        display: none;
      }
    }

    .task-container{
      width: 100%;
      padding: 0 10px;
      padding-bottom: 60px;
      height: calc(100vh - 140px);

      .greet-mobile{
        height: 90px;
        display: block;
        font-size: 20px;
        height: 90px;
        padding: 0 5px;
        background-color: inherit;
        h1{
          background-color: inherit;
        }
      }
      .filter-tabs{
        button{
          flex: 1;
        }
      }
    }
  }
`;

const Dashboard = () => {

  const { user } = useContext(UserContext);
  const { tasks, setTasks, loadingTasks, fetchTasks } = useContext(TaskContext);
  const { searchValue, searchTaskResult, setSearchTaskResult} = useContext(SearchContext);

  const [greeting, setGreeting] = useState("");
  const [tab, setTab] = useState('all');

  if (localStorage.getItem('isWelcomed') === 'true') {
    toast.success("Welcome to task.", { position: toast.POSITION.TOP_CENTER });
    localStorage.removeItem('isWelcomed');
  }

  if (localStorage.getItem('passwordChanged') === 'true') {
    toast.success('Password Changed Successfully!', { position: toast.POSITION.TOP_CENTER });
    localStorage.removeItem('passwordChanged');
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

  const handleTabChange = (name) => {
    setTab(name);
    switch (name) {
      case 'all':
        setSearchTaskResult(tasks);
        break;
      case 'pending':
        // setTab(name);
        setSearchTaskResult(tasks.filter((obj) => obj.active));
        break;
      case 'finished':
        // setTab(name);
        setSearchTaskResult(tasks.filter((obj) => !obj.active));
        break;
    }
  }

  // console.log("All", tasks)
  // console.log("Pending", tasks.filter((obj) => obj.active))
  // console.log("Finished", tasks.filter((obj) => !obj.active))

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
          <div className="greet-mobile">
            <h1>{greeting},</h1>
            <h1>{user.username?.split(' ')[0]}</h1>
          </div>
          {/* <div className="filter-tabs">
            <button className="tab-btn" style={{ backgroundColor: `${tab === 'all' ? 'var(--btn-gray)' : 'var(--background-primary)'}` }} onClick={() => handleTabChange('all')}>All</button>
            <button className="tab-btn" style={{ backgroundColor: `${tab === 'pending' ? 'var(--btn-gray)' : 'var(--background-primary)'}` }} onClick={() => handleTabChange('pending')}>Pending</button>
            <button className="tab-btn" style={{ backgroundColor: `${tab === 'finished' ? 'var(--btn-gray)' : 'var(--background-primary)'}` }} onClick={() => handleTabChange('finished')}>Finished</button>
          </div> */}
          {!loadingTasks && tasks.length === 0 && <h2 className="msg">No tasks to show.<br />Create your first task.</h2>}
          {
            searchTaskResult.map(({ _id, user, collection_id, task, dueDate, active }, idx) => {
              return (<Task _id={_id} user={user} name={task} collection_id={collection_id} dueDate={dueDate} isActive={active} key={_id} showCollectionName={true} />)
            })
          }
          {loadingTasks && <h2 className="msg">Loading Tasks...</h2>}
          {tasks.length !== 0 && searchValue.length !== 0 && searchTaskResult.length === 0 && <h2 className="msg">No results</h2>}
  
        </div>
      </StyledDashboard>
    </Layout>
  )
}

export default Dashboard