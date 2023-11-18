import React, { useState, useEffect } from 'react'
import { urlapi } from '../../Components/Menu';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Editcase = () => {
    const { id } = useParams()
    const [caseedit, setCaseedit] = useState([])
    const [title, setTitle] = useState('')
    const [Suitno, setSuitNo] = useState('');
    const [nature, setNature] = useState('');
    const [prevhearing, setPrevHearing] = useState('');
    const [nexthearing, setNextHearing] = useState('');
    const [factsheet, setFactSheet] = useState('');
    const [progressreport, setProgressReport] = useState('');
    const [isError, setIsError] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');


     const user = sessionStorage.getItem('user')
     const token = user? JSON.parse(user).token : null
    const Updatecasehandler = async (e) => {
        e.preventDefault();
    
        const updateddata = {
            title: title
        };
    
        try {
            let response = await axios.put(`${urlapi}/api/v1/auth/editentries/${id}`, updateddata , {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the header
                }
            });
            // Update the message extraction here
            setResponseMessage(response.data.message || "Entry updated successfully");
            
        } catch (error) {
            console.error('Error updating data:', error);
            // Update this part to handle errors more gracefully
            if (error.response && error.response.data) {
                // If the backend sends a specific message, display it
                setResponseMessage(error.response.data.message);
            } else {
                // Generic message for other types of errors
                setResponseMessage('Failed to update entry');
            }
        }
    };
    




    useEffect(() => {
        const fetchData = async () => {
            try {
                // Build the URL dynamically based on whether 'id' is available
                let apiUrl = `${urlapi}/api/v1/auth/getentries`;
                if (id) {
                    apiUrl += `/${id}`;
                }

                const response = await axios.get(apiUrl);
                const data = response.data;

                // Assuming 'setCaseedit' and 'setTitle' are state setters
                setCaseedit(data);
                if (Array.isArray(data) && data.length > 0) {
                    setTitle(data[0].title);
                } else if (data.title) {
                    // This assumes that if a single object is returned, it has a 'title' property
                    setTitle(data.title);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchData();
    }, [id]); // Include 'id' in the dependency array if it's expected to change

    const titlehandler = (e) => {
        // Replace any forward slashes with an empty string
        const updatedValue = e.target.value.replace(/\//g, '');
        setTitle(updatedValue);
    }


    const Adminrequest = async() => {
        try {
            
            const response = await fetch(`http://localhost:8082/api/v1/auth/reqedit/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            const data = await response.json();
    
            if (response.status === 200) {
                alert('Edit request submitted successfully');
            } else {
                alert(data.message || 'Error submitting edit request');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send edit request');
        }
    }



    return (
        <>
            <body className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
                <div className='w-[1000px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
                    <h2 class="text-2xl font-semibold mb-4 text-center">Edit Case</h2>
                   


                        <div className=' flex  justify-evenly mt-3'>
                            <TextField className=' w-1/3' id="standard-basic" label="Title" variant="standard"
                                onChange={titlehandler} value={title} />



                            <TextField className=' w-1/3' id="standard-basic" label="Suit No" variant="standard"
                                onChange={(e) => setSuitNo(e.target.value)} value={Suitno} />
                        </div>


                        <div className=' flex  justify-evenly mt-3'>
                            <TextField className=' w-1/3' id="standard-basic" label="Nature" variant="standard"
                                onChange={(e) => setNature(e.target.value)} value={nature} multiline />
                            <TextField className=' w-1/3' id="standard-basic" label="Previous hearing" variant="standard"
                                onChange={(e) => setPrevHearing(e.target.value)} value={prevhearing} />
                        </div>
                        <div className=' flex  justify-evenly mt-3'>
                            <TextField className=' w-1/3' id="standard-basic" label="Next hearing" variant="standard"
                                onChange={(e) => setNextHearing(e.target.value)} value={nexthearing} />
                            <TextField className=' w-1/3' id="standard-basic" label="Factsheet" variant="standard"
                                onChange={(e) => setFactSheet(e.target.value)} value={factsheet} />
                        </div>
                        <div className=' flex justify-start ml-[100px]'>
                            <FormControl variant="standard" sx={{ m: 1, minWidth: 190 }}>
                                <InputLabel className=' w-full' id="demo-simple-select-standard-label">Progress Report</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={progressreport}
                                    label="Age"
                                    onChange={(e) => setProgressReport(e.target.value)}
                                >

                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>

                                </Select>
                            </FormControl>
                        </div>
                        <div className=' flex justify-center mt-10'>
                            <button className=' bg-purple-300 px-10 py-2 rounded hover:text-white' type='button' onClick={Updatecasehandler}>Update</button>
                           
                        </div>
                        <div className=' flex justify-center mt-10'>
                            <button className=' bg-amber-300 px-10 py-2 rounded hover:text-white' type='button' onClick={Adminrequest}>Request For Admin to Allow you to Edit</button>
                           
                        </div>
                     <div className='flex justify-center mt-5 text-lg '>   {responseMessage && responseMessage}</div>
                    
                </div>

            </body>
        </>
    )
}

export default Editcase