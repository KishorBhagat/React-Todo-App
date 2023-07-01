import styled from "styled-components"
import Collection from "../Components/Collection";
import Layout from "./Layout";

const StyledCollections = styled.div`
  margin-top: 50px;
  /* background-color: purple; */
  width: 100%;
  padding-top: 40px;
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;

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
    background-color: inherit;
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
      max-height: calc(100vh - 140px);
    }
  }
`;

const Collections = () => {

  const collectionData = [
    {
      name: "School",
      _id: "1",
      total_tasks: 8,
      total_finished: 4
    },
    {
      name: "Personal",
      _id: "2",
      total_tasks: 10,
      total_finished: 10
    },
    {
      name: "Design",
      _id: "3",
      total_tasks: 4,
      total_finished: 3
    },
    {
      name: "Groceries",
      _id: "4",
      total_tasks: 8,
      total_finished: 7
    },
    {
      name: "Birthday",
      _id: "5",
      total_tasks: 8,
      total_finished: 4
    },
    {
      name: "Default",
      _id: "6",
      total_tasks: 11,
      total_finished: 11
    },
  ];


  return (
    <Layout>
      <StyledCollections>
        {/* <div className="collections"> */}
        <header>
          <h1 className="collections-heading">Collections</h1>
          <h1>...</h1>
        </header>
        <div className="collection-container">
          {
            collectionData.map(({ name, _id, total_tasks, total_finished }, id) => {
              return (
                <Collection name={name} total={total_tasks} done={total_finished} key={id} />
              )
            })
          }

          <button>+</button>
        </div>
        {/* </div> */}
      </StyledCollections>
    </Layout>
  )
}

export default Collections