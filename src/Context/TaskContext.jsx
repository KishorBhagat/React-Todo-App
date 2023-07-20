import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext({}); 

export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState([]);
    const [loadingTasks, setLoadingTasks] = useState(false);

    const token = localStorage.getItem('accessToken');

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
        fetchTasks();
    }, []);
    

    return(
        <TaskContext.Provider value={{tasks, setTasks, loadingTasks, fetchTasks}}>
            {children}
        </TaskContext.Provider>
    )
}