import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { CaseHistoryContext } from '../../Context/CaseHistoryContext';
import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast'
const itemsPerPage = 5; // Define how many items per page

const UpdateHistoryForm = () => {
    const { caseId, title } = useParams();
    const { history, message, fetchHistory, updatemessage, updateHistory, entry, fetchHistoryentry } = useContext(CaseHistoryContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [date, setDate] = useState('');
    const [proceedings, setProceedings] = useState('');
    const [id, setID] = useState('')

    useEffect(() => {
        fetchHistory(caseId);
    }, [caseId]);

    useEffect(() => {
        fetchHistoryentry(caseId);
        console.log(caseId, 'case')
    }, [caseId, fetchHistoryentry, entry]);




    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = !searchQuery ? history : history.filter(entry =>
            entry.date.toLowerCase().includes(lowercasedQuery) ||
            entry.proceedings.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredHistory(filtered);

    }, [searchQuery, entry]);




    // Pagination logic
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = filteredHistory.slice(firstItemIndex, lastItemIndex);
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateHistory(caseId, date, proceedings);
            toast.success("Add Successfully");
        } catch (error) {
            // Handle or log the error
            toast.error("An error occurred.");
        }
    };


    const deleteHistory = async (historyid) => {
        try {
            const response = await axios.delete(`https://cms-vusq.onrender.com/api/v1/auth/caseentries/${caseId}/history/${historyid}`);
            alert(response.data.Message); // Alert or handle the success response
            // Refresh the state or perform any other actions after deletion
        } catch (error) {
            // Handle the error response
            alert(error.response ? error.response.data.Message : "An error occurred");
        }
    };



    console.log(entry.nature, 'entry')
    console.log(id, 'id')

    return (
        <>
            <div className=' w-full p-4'>
                <h3 className="text-2xl text-center font-bold bg-blue-300 mb-3 text-gray-800 py-6">Progress Report</h3>
                <div className=' justify-center flex items-center flex-col mb-3'>
                    <p className=' text-xl font-bold relative top-5'>{title}</p>
                    <div>
                        <BsSearch className=' ml-[1170px] relative top-[30px]' />
                        <input
                            type="text"
                            placeholder="Date or Description"
                            value={searchQuery}
                            onChange={(e) => {
                                setCurrentPage(1); // Reset to first page on search
                                setSearchQuery(e.target.value);
                            }}

                            className="p-2 border-2 ml-[1000px] rounded border-gray-300"
                        />

                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm divide-y border ">
                            {/* Table header */}
                            <thead className='border-b border-black'>
                                <tr className='border-black border-2 '>
                                    <th className="px-6 py-3 font-semi-bold text-center text-gray-600 border-r-2 border-black bg-red-100">#</th>
                                    <th className="px-6 py-3 font-semi-bold text-center text-gray-600 border-r-2 border-black uppercase bg-red-100">Date</th>
                                    <th className="px-6 py-3 font-semi-bold text-center text-gray-600 border-r-2 border-black uppercase bg-red-100">Description</th>
                                    <th className="px-6 py-3 font-semi-bold text-center text-gray-600 border-r-2 border-black uppercase bg-red-100">Delete</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="bg-white border-black border">
                                {currentItems.map((entry, index) => (
                                    <tr key={index} className='border-black border'>
                                        <td className="px-6 text-center py-4 text-gray-800 whitespace-normal border-r border-black">{firstItemIndex + index + 1}</td>
                                        <td className="px-6 text-center py-4 text-gray-800 whitespace-normal border-r border-black">{entry.date}</td>
                                        <td className="px-6 text-center py-4 text-gray-800 whitespace-normal border-r border-black">{entry.proceedings}</td>
                                        <td className="px-6 text-center py-4 text-gray-800 whitespace-normal border-r border-black"><button onClick={() => deleteHistory(entry._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination controls */}
                    <div className="pagination flex justify-center items-center space-x-2 my-4">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => changePage(1)}
                            className={`px-4 py-2 text-sm ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                        >
                            First
                        </button>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => changePage(currentPage - 1)}
                            className={`px-4 py-2 text-sm ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                        >
                            Prev
                        </button>
                        {[...Array(totalPages).keys()].map(number => (
                            <button
                                key={number}
                                onClick={() => changePage(number + 1)}
                                className={`px-4 py-2 text-sm border ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => changePage(currentPage + 1)}
                            className={`px-4 py-2 text-sm ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                        >
                            Next
                        </button>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => changePage(totalPages)}
                            className={`px-4 py-2 text-sm ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-blue-500 hover:text-white'}`}
                        >
                            Last
                        </button>
                    </div>
                </div>

                <div className='mt-12 px-6'>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h2 className='text-center font-bold text-xl mb-4 bg-blue-300 p-4'>Update Case History</h2>


                        <label className="block">
                            <span className="text-gray-700 font-bold">Date:</span>
                            <input className='form-input mt-1 block p-1 w-80 rounded  ring-1 ring-gray-300  shadow-sm' type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
                        </label>



                        <label className="block">
                            <span className='block text-gray-700  mb-1 font-bold'>Description</span>
                            <textarea className='form-textarea mt-1 block w-80 ring-1 ring-gray-300 rounded-md shadow-sm' value={proceedings} onChange={(e) => setProceedings(e.target.value)} rows="4" required></textarea>
                        </label>


                        <div className='flex justify-center mt-4'>
                            <button className='bg-blue-600 text-white font-bold px-10 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300' type="submit">Update History</button>
                        </div>

                    </form>
                </div>

                <div className='flex justify-center mt-12 mb-6'>
                    <Link to={`/Factsheet/${caseId}/${title}`}>
                        <button className='bg-amber-400 text-gray-800 px-6 py-2 rounded hover:bg-amber-500 focus:outline-none focus:ring focus:border-amber-300 transition ease-in duration-200'>Factsheet</button>
                    </Link>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>



        </>
    );
};

export default UpdateHistoryForm;
