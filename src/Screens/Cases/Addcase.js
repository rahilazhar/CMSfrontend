import React, { useState } from 'react'
import {BiHash} from 'react-icons/bi'

const Addcase = () => {
    const [Suitno, setSuitNo] = useState('');
    const [title, setTitle] = useState('');
    const [nature, setNature] = useState('');
    const [prevhearing, setPrevHearing] = useState('');
    const [nexthearing, setNextHearing] = useState('');
    const [factsheet, setFactSheet] = useState('');
    const [progressreport, setProgressReport] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);



    const formsubmission = async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        try {
            const response = await fetch('http://localhost:8082/api/v1/auth/entries', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Suitno, title, nature, prevhearing, nexthearing, factsheet, progressreport }),
            });

            const data = await response.json(); // Attempt to parse the response body as JSON

            if (response.ok) {
                console.log('Form submitted successfully:', data);
                setMessage(data.Message || 'Form submitted successfully!'); // Use the message from the backend if available
                setIsError(false);
                // Clear the form fields here
                setSuitNo('');
                setTitle('');
                setNature('');
                setPrevHearing('');
                setNextHearing('');
                setFactSheet('');
                setProgressReport('');
                // Clear the message after a delay if needed
                setTimeout(() => setMessage(''), 5000);
            } else {
                console.error('Form submission failed:', response.status, response.statusText, data);
                setMessage(data.Message || 'Form submission failed!'); // Use the error message from the backend if available
                setIsError(true);
                // You might want to show an error message to the user here
            }
        } catch (error) {
            console.error('An error occurred during form submission:', error);
            setMessage('An unexpected error occurred. Please try again later.');
            setIsError(true);
            // You might want to show an error message to the user here
        }
    };



    return (
        <>
            <main className='w-full'>
                {/* Section-1 */}

                <section>
                    <div className=' container'>
                        <div className='bg-purple-500  p-3 text-center text-lg font-semibold'>Add Case</div>
                        <form onSubmit={formsubmission}>
                            <div className="grid grid-cols-2 p-4">

                                <div className=''>

                                    {/* SuitNo */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Suit No</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"><BiHash/> </span>
                                                    <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="11685/2022"
                                                        onChange={(e) => setSuitNo(e.target.value)} value={Suitno} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Nature */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nature</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"> </span>
                                                    {/* <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="Nature" onChange={(e) => setNature(e.target.value)} value={nature} /> */}
                                                        <textarea className='w-full rounded p-2  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600' name="" id="" cols="3" rows="1"
                                                        onChange={(e) => setNature(e.target.value)} value={nature}></textarea>
                                                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Next */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Next hearing</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"> </span>
                                                    <input type="date" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="12/09/2012" onChange={(e) => setNextHearing(e.target.value)} value={nexthearing} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Progress report</label>
                                            <div className="mt-2">

                                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"> </span>
                                                <select onChange={(e)=>setProgressReport(e.target.value)} data-te-select-init className='w-full rounded ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 p-2 '>
                                                    <option value="">---Select---</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>

                                                </select>
                                            </div>

                                        </div>
                                    </div>




                                </div>

                                {/* Second -col  */}
                                <div className=' '>

                                    {/* Title */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"> </span>
                                                    <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Prev */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Previous hearing</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"> </span>
                                                    <input type="date" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="12/09/2012" onChange={(e) => setPrevHearing(e.target.value)} value={prevhearing} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Fact Sheet */}
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Fact sheet</label>
                                            <div className="mt-2">
                                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"> </span>
                                                    <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                        placeholder="Name" onChange={(e) => setFactSheet(e.target.value)} value={factsheet} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div>

                                    </div>
                                </div>


                            </div>
                            <div className='flex justify-center mt-10 '>
                                <button type='submit' className=' bg-blue-500 px-10 py-2 rounded hover:text-white'>Submit</button>
                            </div>
                            {message && (
                                <div className={`p-4 text-center ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {message}
                                </div>
                            )}
                        </form>


                    </div>
                </section>


            </main>
        </>
    )
}

export default Addcase