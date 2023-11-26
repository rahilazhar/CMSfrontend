import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { urlapi } from '../../Components/Menu'

const Editrequest = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let response = await axios.get(`${urlapi}/api/v1/auth/pendingrequests`)
                setData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, [])

    const Approvehandler = async (selectedValue, id) => {
        if (window.confirm(`Are you sure to ${selectedValue} this Request`)) {
            try {
                let response = await axios.post(`${urlapi}/api/v1/auth/updaterequest/${id}`, { status: selectedValue });

                if (response.status === 200) {
                    // Handle success - maybe update the UI or show a success message
                    console.log("Request updated successfully:", response.data);
                    // Additional UI feedback can be added here
                } else {
                    // Handle non-success status codes
                    console.log("Failed to update request:", response.status, response.data);
                    // Additional UI feedback for failure can be added here
                }
            } catch (error) {
                // Handle errors in the request itself (e.g., network errors)
                console.error("Error during update request:", error);
                // Additional UI error handling can be added here
            }
        }
    };


    return (
        <div className=' w-full'>
            <div className=' bg-purple-300 mb-3 text-center p-3 rounded text-xl  font-bold'>Pending Approvals</div>
            <table className="min-w-full border">
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Suit No
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nature
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    prev-hearing
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    next-hearing
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fact sheet
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report
                </th>
                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                </th>

                <th scope="col" className="p-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Approve
                </th>

                {
                    data.map((item, index) => {
                        console.log(item, 'item______')

                        return (
                            <>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr key={item._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 text-center`}>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caseId.Suitno}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caseId.title}</td>
                                        <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">{item.caseId.nature}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caseId.prevhearing}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caseId.nexthearing}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caseId.factsheet}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.caseId.progressreport}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <select className='w-[150px] p-2' onChange={(e) => Approvehandler(e.target.value, item.caseId._id)}>
                                                <option value="">--Select--</option>
                                                <option value="approved">Approve</option>
                                                <option value="rejected">Reject</option>
                                            </select>
                                        </td>

                                    </tr>
                                </tbody>
                            </>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Editrequest
