import { createContext, useContext, useEffect, useState } from "react";
import { TaskContext } from "./TaskContext";
import { CollectionContext } from "./CollectionContext";

export const SearchContext = createContext({});

export const SearchContextProvider = ({children}) => {

    const {tasks} = useContext(TaskContext)
    const {collections} = useContext(CollectionContext)

    const [searchValue, setSearchValue] = useState('');
    const [searchTaskResult, setSearchTaskResult] = useState(tasks);
    const [searchCollectionResult, setSearchCollectionResult] = useState(collections);

    useEffect(() => {
        setSearchTaskResult(tasks)
    }, [tasks])

    useEffect(() => {
        setSearchCollectionResult(collections)
    }, [collections])

    useEffect(() => {
    }, [searchCollectionResult])




    return (
        <SearchContext.Provider value={{
            searchTaskResult,
            setSearchTaskResult, 
            searchValue, 
            setSearchValue,
            searchCollectionResult, 
            setSearchCollectionResult,
        }}>
            {children}
        </SearchContext.Provider>
    )
}