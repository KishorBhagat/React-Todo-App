import { createContext, useEffect, useState } from "react";

export const CollectionContext = createContext({}); 

export const CollectionContextProvider = ({children}) => {
    const [collections, setCollections] = useState([]);
    const [loadingCollections, setLoadingCollections] = useState(false);


    const token = localStorage.getItem('accessToken');

    const fetchCollections = async () => {
        if(!token){
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/collections`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
            });
            if(response.ok){
                const data = await response.json();
                setCollections(data);
                return response;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCollections();
    }, []);
    

    return(
        <CollectionContext.Provider value={{collections, setCollections, loadingCollections, setLoadingCollections, fetchCollections}}>
            {children}
        </CollectionContext.Provider>
    )
}