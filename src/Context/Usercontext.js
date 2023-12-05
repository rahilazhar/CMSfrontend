// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlapi } from '../Components/Menu';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [getuserdata , setGetuserdata] = useState([])

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);


    const Getallusers = async (caseId) => {
        // setLoading(true); // Start loading
        try {
            const url = `${urlapi}/api/v1/auth/getallusers`;
            const response = await axios.get(url);
            setGetuserdata(response.data);
            
        } catch (error) {
            console.error(error);
        } finally {
            // setLoading(false); // Stop loading
        }
    };
    

    

    return (
        <UserContext.Provider value={{ user, setUser , Getallusers , getuserdata }}>
            {children}
        </UserContext.Provider>
    );
};


