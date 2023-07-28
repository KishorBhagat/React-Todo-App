import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const UserContext = createContext({}); 

export const UserContextProvider = ({children}) => {
    const [isUser, setIsUser] = useState(false);
    const [user, setUser] = useState({});
    
    const dispatch = useDispatch();

    const token = localStorage.getItem('accessToken');
    const fetchUser = async () => {
        if(!token){
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
            });
            const data = await response.json();
            if(response.ok){
                setUser(data);
                setIsUser(true);
                // console.log(data)
                return response;
            }
            if(response.status === 401 && token == null){
                console.log("401: User unauthorized")
            }
            if(response.status === 401){
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    

    return(
        <UserContext.Provider value={{user, isUser, fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}