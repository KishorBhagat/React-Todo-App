import styled from "styled-components"
import Search from "./icons/Search"
import { useContext, useEffect, useState } from "react"
import { TaskContext } from "../Context/TaskContext"
import { SearchContext } from "../Context/SearchContext"
import { CollectionContext } from "../Context/CollectionContext"
import Cross from "./icons/Cross"

const StyledSearchInput = styled.div`
  .search-input-container{
    background-color: #9a9aa8;
    display: flex;
    align-items: center;
    border-radius: 28px;
    padding-left: 8px;
    width: 160px;
    height: 28px;
    svg{
      fill: black;
      background-color: transparent;
      width: 14px;
      height: 14px;
      &:hover{
        fill: black;
      }
    }
    input{
      border-radius: 28px;
      border: none;
      outline: none;
      background-color: transparent;
      color: black;
      padding: 0 10px;
      width: calc(100% - 14px);
      height: 100%;

      &::placeholder{
        color: #6e6e6e;
      }
    }
    .clear-search{
      width: 18px;
      height: 18px;
      margin-right: 2px;
      .clear-search-button{
        background-color: transparent;
        display: flex;
        svg{
          width: 18px;
          height: 18px;
        }
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
            color: var(--text-primary);
        }
        .clear-search-button{
          display: none;
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

    const handleClearSearch = () => {
      setSearchValue('')
    }
    return (
        <StyledSearchInput>
            <div className="search-input-container">
                <Search />
                <input 
                  spellCheck={false} 
                  autoFocus={autofocus ? true : false} 
                  className="search-input" 
                  type="text" 
                  onChange={handleSearch} 
                  value={searchValue} placeholder="Search" 
                />
                <div className="clear-search">
                  {
                    searchValue.length!==0 && <button className="clear-search-button" onClick={handleClearSearch}><Cross /></button>
                  }
                </div>
            </div>
        </StyledSearchInput>
    )
}

export default SearchInput