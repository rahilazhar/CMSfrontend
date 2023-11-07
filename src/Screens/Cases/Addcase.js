import React, { useState } from 'react'
import { BiHash } from 'react-icons/bi'
import { urlapi } from '../../Components/Menu';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
    const [age, setAge] = React.useState('');




    const formsubmission = async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        try {
            const response = await fetch(`${urlapi}/api/v1/auth/entries`, {
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
            <body className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
                <div className='w-[1000px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
                    <h2 class="text-2xl font-semibold mb-4 text-center">Add Case</h2>
                    <form onSubmit={formsubmission}>
                    <div className=' flex  justify-evenly mt-3'>
                        <TextField className=' w-1/3' id="standard-basic" label="Title" variant="standard"
                        onChange={(e)=>setTitle(e.target.value)} value={title} />
                        <TextField className=' w-1/3' id="standard-basic" label="Suit No" variant="standard" 
                        onChange={(e)=>setSuitNo(e.target.value)} value={Suitno}/>
                    </div>
                    <div className=' flex  justify-evenly mt-3'>
                        <TextField className=' w-1/3' id="standard-basic" label="Nature" variant="standard"
                        onChange={(e)=>setNature(e.target.value)}  value={nature} multiline/>
                        <TextField className=' w-1/3' id="standard-basic" label="Previous hearing" variant="standard"
                        onChange={(e)=>setPrevHearing(e.target.value)} value={prevhearing} />
                    </div>
                    <div className=' flex  justify-evenly mt-3'>
                        <TextField className=' w-1/3' id="standard-basic" label="Next hearing" variant="standard"
                        onChange={(e)=>setNextHearing(e.target.value)} value={nexthearing} />
                        <TextField className=' w-1/3' id="standard-basic" label="Factsheet" variant="standard"
                        onChange={(e)=>setFactSheet(e.target.value)} value={factsheet} />
                    </div>
                    <div className=' flex justify-start ml-[100px]'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                            <InputLabel className=' w-full' id="demo-simple-select-standard-label">Progress Report</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={progressreport}
                                label="Age"
                                onChange={(e)=>setProgressReport(e.target.value)}
                            >
                                
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                               
                            </Select>
                        </FormControl>
                    </div>
                    <div className=' flex justify-center mt-10'>
                    <button className=' bg-purple-300 px-10 py-2 rounded hover:text-white' type='submit'>Submit</button>
                    {message && (
                                <div className={`p-4 text-center ${isError ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {message}
                                </div>
                            )}
                    </div>
                    </form>
                </div>

            </body>
        </>
    )
}

export default Addcase