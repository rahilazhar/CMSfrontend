import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { urlapi } from '../../Components/Menu';

const Factsheetedit = () => {
  const [caseEntry, setCaseEntry] = useState('');
  const [facts, setFacts] = useState('');
  const [caseinstituted, setCaseInstituted] = useState('');
  const [hearings, setHearings] = useState('');
  const [natureOfCase, setNatureOfCase] = useState('');
  const [defendants, setDefendants] = useState('');
  const [lastdateofhearing, setLastDateOfHearing] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams()
  const navigate = useNavigate()

  // Modify this part to send JSON instead of FormData
  const updateData = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    let updateObject = {
      caseEntry: caseEntry,
      facts: facts,
      caseinstituted: caseinstituted,
      hearings: hearings,
      natureOfCase: natureOfCase,
      defendants: defendants,
      lastdateofhearing: lastdateofhearing
    };

    try {
      let result = await fetch(`${urlapi}/api/v1/auth/editfactsheet/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateObject),
      });
      result = await result.json();
      console.log(result);
      toast.success('Successfully updated');

      // Set a timeout before navigating
      setTimeout(() => {
        navigate(`/factsheetview/${id}`);
      }, 1000); // waits 2 seconds before navigating

    } catch (error) {
      console.error(error);
      toast.error('An error occurred during the update');
      setIsLoading(false); // stop loading, but don't navigate away in case of error
    }

  };

  // Rest of your code remains unchanged


  useEffect(() => {
    const getAllStaffData = async () => {
      const response = await fetch(`${urlapi}/api/v1/auth/factsheet/caseentry/${id}`);
      const responseData = await response.json();
      console.log(responseData[0].facts);

      setFacts(responseData[0].facts)
      setCaseInstituted(responseData[0].caseinstituted)
      setHearings(responseData[0].hearings)
      setNatureOfCase(responseData[0].Natureofcase)
      setDefendants(responseData[0].defendants)
      setLastDateOfHearing(responseData[0].lastdateofhearing)


    };

    getAllStaffData();
  }, [id]);

  return (
    <>
      <body className='bg-gray-100 min-h-screen w-full flex items-center justify-center'>
        <div className='w-[1000px] mx-auto bg-white p-6 rounded-lg shadow-lg'>
          <h2 class="text-2xl font-semibold mb-4 text-center">Edit Case</h2>

          <div className=' flex  justify-evenly mt-3'>
            <TextField className=' w-full' id="standard-basic" label="Facts" variant="standard"
              onChange={(e) => setFacts(e.target.value)} value={facts} multiline />

          </div>
          <div className=' flex  justify-evenly mt-3'>

            <TextField className=' w-1/4' id="standard-basic" label="Case Instituted" variant="standard"
              onChange={(e) => setCaseInstituted(e.target.value)} value={caseinstituted} />

            <TextField className=' w-1/4' id="standard-basic" label="Defendants" variant="standard"
              onChange={(e) => setDefendants(e.target.value)} value={defendants} />

            <TextField className=' w-1/4' id="standard-basic" label="Last date of hearing" variant="standard"
              onChange={(e) => setLastDateOfHearing(e.target.value)} value={lastdateofhearing} />
          </div>

          <div className=' flex justify-center mt-10'>
            {/* <button onClick={updateData} className=' bg-blue-400 px-10 py-2 rounded hover:text-white' type='button'>Update</button> */}
            <button onClick={updateData} className=' bg-purple-300 px-10 py-2 rounded hover:text-white' type='button' disabled={isLoading}>
              {isLoading ? (
                <Bars
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                'Update'
              )}
            </button>
          </div>

        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>

    </>
  )
}

export default Factsheetedit
