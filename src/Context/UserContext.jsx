import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

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
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/user`, {
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
                // console.log("User is: \n", data)
            }
            if(response.status === 401 && token == null){
                console.log("401: User unauthorized")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);
    

    return(
        <UserContext.Provider value={{user, isUser}}>
            {children}
        </UserContext.Provider>
    )
}