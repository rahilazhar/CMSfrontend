// CaseHistoryContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { urlapi } from '../Components/Menu';

export const CaseHistoryContext = createContext(null);

export const CaseHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [entry, setEntry] = useState([]);
    const [factview, setFactview] = useState([]);
    const [message, setMessage] = useState('');
    const [updatemessage, setUpdatemessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    // Fetch case history function
    const fetchHistory = async (caseId) => {
        try {
            const url = `${urlapi}/api/v1/auth/gethistory/${caseId}`;
            const response = await axios.get(url);
            setHistory(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        }
    };


    const fetchHistoryentry = async (caseId) => {
        try {
            const url = `${urlapi}/api/v1/auth/getentriesid/${caseId}`;
            const response = await axios.get(url);
            setEntry(response.data);

        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        }
    };


    const fetchfactsheet = async (caseId) => {
        setLoading(true); // Start loading
        setFactview([]); // Reset factview state before loading new data
        try {
            const url = `${urlapi}/api/v1/auth/factsheet/caseentry/${caseId}`;
            const response = await axios.get(url);
            setFactview(response.data);
            
        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Update case history function
    const updateHistory = async (caseId, date, proceedings) => {
        try {
            const url = `${urlapi}/api/v1/auth/updateschema/${caseId}`;
            const response = await axios.put(url, {
                date,
                proceedings
            });
            setUpdatemessage(response.data.Message);
            setHistory([...history, { date, proceedings }]);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update case entry');
        }
    };
    // const updateHistory = async (caseId, date, proceedings) => {
    //     try {
    //         setLoading(true); // Indicate loading state
    //         const url = `${urlapi}/api/v1/auth/updateschema/${caseId}`;
    //         const response = await axios.put(url, {
    //             date,
    //             proceedings
    //         });
    //         if (response.data && response.data.newEntry) {
    //             setUpdatemessage(response.data.message);
    //             setHistory(prevHistory => [...prevHistory, response.data.newEntry]);
    
    //             // Update filteredHistory to include the new entry
    //             setHistory(prevFilteredHistory => [...prevFilteredHistory, response.data.newEntry]);
    //         } else {
    //             // Handle the case where the server doesn't return a newEntry as expected
    //             console.error('Server did not return the expected new entry');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         setMessage('Failed to update case entry');
    //     } finally {
    //         setLoading(false); // Indicate loading has finished
    //     }
    // };
    
    




    return (
        <CaseHistoryContext.Provider value={{ history, message, entry, updatemessage , factview, loading, fetchfactsheet, fetchHistoryentry, fetchHistory, updateHistory }}>
            {children}
        </CaseHistoryContext.Provider>
    );
};
