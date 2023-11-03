// CaseHistoryContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CaseHistoryContext = createContext(null);

export const CaseHistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [entry, setEntry] = useState([]);
    const [factview, setFactview] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    // Fetch case history function
    const fetchHistory = async (caseId) => {
        try {
            const url = `https://cms-vusq.onrender.com/api/v1/auth/gethistory/${caseId}`;
            const response = await axios.get(url);
            setHistory(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Failed to fetch case history');
        }
    };
    const fetchHistoryentry = async (caseId) => {
        try {
            const url = `https://cms-vusq.onrender.com/api/v1/auth/getentriesid/${caseId}`;
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
            const url = `https://cms-vusq.onrender.com/api/v1/auth/factsheet/caseentry/${caseId}`;
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
            const url = `https://cms-vusq.onrender.com/api/v1/auth/updateschema/${caseId}`;
            const response = await axios.put(url, {
                date,
                proceedings
            });
            setMessage(response.data.Message);
            setHistory([...history, { date, proceedings }]);
        } catch (error) {
            console.error(error);
            setMessage('Failed to update case entry');
        }
    };

    return (
        <CaseHistoryContext.Provider value={{ history, message, entry, factview, loading, fetchfactsheet, fetchHistoryentry, fetchHistory, updateHistory }}>
            {children}
        </CaseHistoryContext.Provider>
    );
};
