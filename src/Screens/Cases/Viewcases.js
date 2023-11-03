import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BsFillFileEarmarkSpreadsheetFill} from 'react-icons/bs'
import {AiFillEye} from 'react-icons/ai'

const Viewcases = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cms-vusq.onrender.com/api/v1/auth/getentries');
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full mx-auto px-4 sm:px-6 lg:px-8'>
    <div className="flex flex-col mt-8">
        <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-green-900 border">
                <thead>
                    <tr className="bg-gray-50">
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
                            View Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            View factsheet
                        </th>
                        {/* <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">View Details</span>
                        </th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {loading && (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                Loading...
                            </td>
                        </tr>
                    )}
                    {!loading && entries.length === 0 && (
                        <tr>
                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                No data available.
                            </td>
                        </tr>
                    )}
                    {!loading && entries.map((entry, index) => (
                        <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.Suitno}</td>
                            <td className="px- py-4 whitespace-normal text-sm text-gray-500">{entry.title}</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{entry.nature}</td>
                            <td className=" py-4 whitespace-normal text-sm text-gray-500">{entry.prevhearing}</td>
                            <td className=" py-4 whitespace-normal text-sm text-gray-500">{entry.nexthearing}</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{entry.factsheet}</td>
                            <td className="px-10 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Link to={`/viewdetails/${entry._id}/${entry.title}`} className="text-indigo-600 hover:text-indigo-900">
                                    <AiFillEye className=''/>
                                </Link>
                            </td>
                            <td className=" text-center px-10 text-sm font-medium">
                                <Link to={`/factsheetview/${entry._id}`} className="text-indigo-600 hover:text-indigo-900">
                                   <BsFillFileEarmarkSpreadsheetFill/>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
</div>

  );
}

export default Viewcases;
