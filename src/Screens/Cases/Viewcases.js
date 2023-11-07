import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsFillFileEarmarkSpreadsheetFill } from 'react-icons/bs'
import { AiFillEye } from 'react-icons/ai'
import { urlapi } from '../../Components/Menu';
import {MdDeleteForever} from 'react-icons/md'

const Viewcases = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage] = useState(10); // Set the number of entries you want per page

    useEffect(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = !searchQuery ? entries : entries.filter(entry =>
            entry.title.toLowerCase().includes(lowercasedQuery) ||
            entry.nature.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredHistory(filtered);

    }, [searchQuery, entries]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${urlapi}/api/v1/auth/getentries`);
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredHistory.slice(indexOfFirstEntry, indexOfLastEntry);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);


    const deleteEntry = async (id) => {
        if (window.confirm('Are you sure you want to delete this case?')) {
            try {
                const response = await axios.delete(`${urlapi}/api/v1/auth/deleteentries/${id}`);
                alert(response.data.Message); // Or use a more sophisticated approach for user feedback
                // Remove the deleted entry from the state to update the UI
                setEntries(prevEntries => prevEntries.filter(entry => entry._id !== id));
            } catch (error) {
                console.error('Error deleting the case: ', error);
                alert('Failed to delete the case'); // Or display the error message returned from the server
            }
        }
    };

    return (
        <div className='w-full mx-auto px-4 sm:px-6 lg:px-8'>
              
            <div className="flex flex-col mt-8">
            <div  className=' bg-purple-300 mb-3 text-center p-3 rounded text-xl  font-bold'>All Cases</div>
              
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    {/* <input
                        className='border border-black mt-3 mb-3 rounded p-3'
                        type="text"
                        placeholder='Search'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    /> */}
                    <table className="min-w-full border">
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Suit No
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nature
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            prev-hearing
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            next-hearing
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fact sheet
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Report
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            View Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            View factsheet
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Delete
                        </th>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : currentEntries.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="px-6 py-4 text-center text-sm text-gray-500">
                                        No data available.
                                    </td>
                                </tr>
                            ) : (
                                currentEntries.map((entry, index) => (
                                    <tr key={entry._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.Suitno}</td>
                                        <td className="px- py-4 whitespace-normal text-sm text-gray-500">{entry.title}</td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{entry.nature}</td>
                                        <td className=" py-4 whitespace-normal text-sm text-gray-500">{entry.prevhearing}</td>
                                        <td className=" py-4 whitespace-normal text-sm text-gray-500">{entry.nexthearing}</td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{entry.factsheet}</td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{entry.progressreport}</td>
                                        <td className="px-10 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/viewdetails/${entry._id}/${entry.title}`} className="text-indigo-600 hover:text-indigo-900 text-xl">
                                                <AiFillEye className='' />
                                            </Link>
                                        </td>
                                        <td className=" text-center px-10 text-sm font-medium">
                                            <Link to={`/factsheetview/${entry._id}`} className="text-indigo-600 hover:text-indigo-900 text-xl">
                                                <BsFillFileEarmarkSpreadsheetFill />
                                            </Link>
                                        </td>
                                        <td>
                                           <button className=' text-2xl text-indigo-600 hover:text-red-500' onClick={() => deleteEntry(entry._id)}><MdDeleteForever/></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    {/* Pagination controls start here */}
                    <div className='flex justify-center items-center mt-4'>
                        <nav aria-label="Pagination">
                            <ul className='inline-flex items-center -space-x-px'>
                                {Array.from({ length: Math.ceil(filteredHistory.length / entriesPerPage) }, (_, i) => i + 1).map(number => (
                                    <li key={number} className='px-1'>
                                        <button
                                            onClick={() => paginate(number)}
                                            aria-current={currentPage === number ? 'page' : undefined}
                                            className={`
            ${currentPage === number
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }
            relative inline-flex items-center px-4 py-2 border text-sm font-medium
          `}
                                        >
                                            {number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viewcases;
