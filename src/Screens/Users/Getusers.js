import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Context/Usercontext';
import axios from 'axios';
import { urlapi } from '../../Components/Menu'
const Getusers = () => {
    const { Getallusers, getuserdata } = useContext(UserContext);


    useEffect(() => {
        Getallusers()
    }, [])


    const handleApprovalChange = async (userid , isUserApproved) => {
        try {
            // const token = sessionStorage.getItem('token') // Or wherever the token is stored

            const response = await axios.post(`${urlapi}/api/v1/auth/approvedreq/${userid}`,
                { isUserApproved },
                // {
                //     headers: {
                //         Authorization: `Bearer ${token}`
                //     }
                // }
            );

            console.log(response.data.message);
            // Update the local data to reflect the change
            Getallusers();
        } catch (error) {
            console.error('Error updating approval status:', error);
        }
    };


    return (
        <>
            <main className='w-full'>
                {/* Staff View Modal Placeholder */}

                <div className="container mx-auto mt-5">
                    {/* <div className="flex justify-end">
                        <a href="/addstaff" className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Staff
                        </a>
                    </div> */}

                    {/* <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/2">
                                <label className="block text-gray-700 font-bold mb-1 md:mb-0 pr-4">
                                    Search
                                </label>
                                <input
                                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    type="text"
                                    placeholder="Search by name or email"
                                />
                            </div>
                            <div className="md:w-1/2">
                                <label className="block text-gray-700 font-bold mb-1 md:mb-0 pr-4">
                                    Filter
                                </label>
                                <select
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                >
                                    <option value="">All</option>
                                    <option value="Active">Active</option>
                                    <option value="In-Active">In-Active</option>
                                </select>
                            </div>
                        </div>
                    </div> */}

                    <div className="shadow-lg mt-2">
                        <table className="table-auto w-full text-center">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">#</th>
                                    <th className="px-4 py-2">Profile</th>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Approved User</th>
                                    <th className="px-4 py-2">Current Status</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getuserdata.map((item) => {
                                    const itemsapproved = item.isUserApproved === false ? "bg-red-200" : "bg-green-200"
                                    return (
                                        <>
                                            <tr className={`${itemsapproved}`}  >
                                                <td className="border px-4 py-2">1</td>
                                                <td className="border px-4 py-2">Profile Picture</td>
                                                <td className="border px-4 py-2">{item.name}</td>
                                                <td className="border px-4 py-2">{item.email}</td>
                                                <td className="border px-4 py-2">{item.role === 1 ? "Admin" : "User"}</td>
                                                <td className="border px-4 py-2">
                                                    <select
                                                        className="form-select appearance-none block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        value={item.isUserApproved}
                                                        onChange={(e) => handleApprovalChange(item._id , e.target.value)}
                                                    >
                                                        <option value="true">Approved</option>
                                                        <option value="false">Not Approved</option>
                                                    </select>
                                                </td>
                                                <td className="border px-4 py-2">Edit</td>
                                            </tr>
                                        </>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>

                    {/* Toaster Placeholder */}
                </div>

            </main>
        </>
    )
}

export default Getusers
