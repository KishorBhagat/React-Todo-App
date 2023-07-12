import styled from "styled-components"
import Search from "./icons/Search"
import { useContext, useEffect, useState } from "react"
import { TaskContext } from "../Context/TaskContext"
import { SearchContext } from "../Context/SearchContext"
import { CollectionContext } from "../Context/CollectionContext"

const StyledSearchInput = styled.div`
  .search-input-container{
    background-color: #9a9aa8;
    display: flex;
    align-items: center;
    border-radius: 28px;
    padding-left: 8px;
    width: 150px;
    height: 28px;
    svg{
      fill: black;
      background-color: transparent;
      width: 14px;
      height: 14px;
    }
    input{
      border-radius: 28px;
      border: none;
      outline: none;
      background-color: transparent;
      color: var(--text-primary);
      padding: 0 10px;
      width: 100%;
      height: 100%;

      &::placeholder{
        color: #6e6e6e;
      }
    }
  }

  @media (max-width: 700px) {
    height: 100%;
    .search-input-container{
        width: 100%;
        height: 100%;
        border-radius: 0;
        padding-right: 40px;
        background-color: var(--background-secondary);
        box-shadow: 0 10px 30px -10px rgba(2,12,27,0.7);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        input{
            font-size: 20px;
            height: 100%;
        }
        svg{
            display: none;
        }
    }
  }
`
const SearchInput = ({autofocus}) => {

    const { tasks, setTasks } = useContext(TaskContext);
    const { collections, setCollections } = useContext(CollectionContext);
    const { searchTaskResult, setSearchTaskResult, searchCollectionResult, setSearchCollectionResult, searchValue, setSearchValue } = useContext(SearchContext);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        const filteredTasks = tasks.filter((obj) => obj.task.toLowerCase().includes(searchValue.toLowerCase()));
        const filteredCollections = collections.filter((obj) => obj.collection_name.toLowerCase().includes(searchValue.toLowerCase()));
        if (searchValue.length === 0) {
            setSearchTaskResult(tasks);
            setSearchCollectionResult(collections);
        }
        else {
            setSearchTaskResult(filteredTasks);
            setSearchCollectionResult(filteredCollections);
        }
    }, [searchValue])

    return (
        <StyledSearchInput>
            <div className="search-input-container">
                <Search />
                <input autoFocus={autofocus ? true : false} className="search-input" type="text" onChange={handleSearch} value={searchValue} placeholder="Search" />
            </div>
        </StyledSearchInput>
    )
}

export default SearchInput