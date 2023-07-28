import { createContext, useEffect, useState } from "react";
import isAccessTokenValid from "../utils/verifyJwt";
import { useDispatch } from "react-redux";
import { refreshLogin } from "../store/slices/authSlice";

export const TaskContext = createContext({}); 

export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(false);

    const dispatch = useDispatch();

    let token = localStorage.getItem('accessToken');

    const fetchTasks = async () => {
        setLoadingTasks(true);
        if(!token){
            return
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': token
                },
            });
            if(response.ok){
                const data = await response.json();
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setTasks(data);
                setLoadingTasks(false);
                return response;
            } else{
                setLoadingTasks(false);
            }
        } catch (error) {
            setLoadingTasks(false);
        }
    }

    useEffect(() => {
        if(!isAccessTokenValid(token)){
            dispatch(refreshLogin())
                .unwrap()
                .then((res) => {
                    token = res.token.access;
                    fetchTasks();
                })
        } 
        else {
            fetchTasks();
        }
    }, []);
    

    return(
        <TaskContext.Provider value={{tasks, setTasks, loadingTasks, fetchTasks}}>
            {children}
        </TaskContext.Provider>
    )
}