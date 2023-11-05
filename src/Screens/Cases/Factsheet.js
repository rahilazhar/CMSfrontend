import React, { useState, useEffect , useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CaseHistoryContext } from '../../Context/CaseHistoryContext';
import toast, { Toaster } from 'react-hot-toast'
import { urlapi } from '../../Components/Menu';

const Factsheet = () => {
const {entry , fetchHistoryentry } = useContext(CaseHistoryContext);


var lengthOfHistoryString = entry ?  entry.history.length.toString() : "0"
const natureOfCase = entry && entry.nature ? entry.nature : '';


  const { caseId } = useParams();
  const { title } = useParams();
  const [message , setMessage]  = useState('')
  const [isLimitExceeded, setIsLimitExceeded] = useState(false);
  const [formData, setFormData] = useState({
    facts: '',
    caseinstituted: '',
    hearings: entry && entry.history ? entry.history.length.toString() : "0", // Guarded access,
    Natureofcase: natureOfCase,
    defendants: '',
    lastdateofhearing: '',
  });

  useEffect(() => {
    fetchHistoryentry(caseId)
  }, [caseId])

  


  



  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${urlapi}/api/v1/auth/factsheet/${caseId}`, formData);

      console.log('Factsheet created:', response.data);

      setFormData({
        facts: '',
        caseinstituted: '',
        hearings: '',
        Natureofcase: '',
        defendants: '',
        lastdateofhearing: '',
      });

      setMessage(response.data.Message)
      toast.success("Added Successfully")
    } catch (error) {
      console.error('Error creating factsheet:', error);
    }
  };
  const maxLetters = 1000;
  const handleFactsChange = (e) => {
    const inputValue = e.target.value;
    const letterCount = inputValue.length; // count the number of letters directly

    if (letterCount <= maxLetters) {
      setFormData({ ...formData, facts: inputValue });
      setIsLimitExceeded(false);
    } else {
      setIsLimitExceeded(true);
      // If you still want to allow the user to type but just not add over the limit
      // you could implement a logic to trim the value to the maxLetters count
      setFormData({ ...formData, facts: inputValue.slice(0, maxLetters) });
    }
  };

  const letterCount = formData.facts.length; // Update to count letters
  const remainingLetters = maxLetters - letterCount; // Update to reflect remaining letters

  console.log(message)

  return (
    <>
      <body class="bg-gray-100 min-h-screen w-full flex items-center justify-center">
        <div class="w-[700px] mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-semibold mb-4">Create a Factsheet of {title}</h2>
          <form onSubmit={handleSubmit} class="space-y-4">
          <div>
      <label htmlFor="facts" className="block text-sm font-medium text-gray-700">
        Facts (Max 1000 letters):
      </label>
      <textarea
        id="facts"
        name="facts"
        value={formData.facts}
        onChange={handleFactsChange}
        required
        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
      ></textarea>
      {isLimitExceeded && (
        <p className="text-red-500 text-sm mt-2">
          Letter limit exceeded! Please limit your text to 1000 letters.
        </p>
      )}
      {!isLimitExceeded && (
        <p className="text-gray-500 text-sm mt-2">
          {remainingLetters} letters remaining.
        </p>
      )}
    </div>

           
            <div>
              <label for="caseinstituted" class="block text-sm font-medium text-gray-700">When the case instituted:</label>
              <input
                type="text"
                id="caseinstituted"
                name="caseinstituted"
                value={formData.caseinstituted}
                onChange={(e) => setFormData({ ...formData, caseinstituted: e.target.value })}
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label for="hearings" class="block text-sm font-medium text-gray-700">No of hearings:</label>
              <input
                type="text"
                id="hearings"
                name="hearings"
                value={formData.hearings}
                readOnly
                onChange={(e) => setFormData({ ...formData, hearings: e.target.value })}
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label for="Natureofcase" class="block text-sm font-medium text-gray-700">Nature of Case:</label>
              <input
                type="text"
                id="Natureofcase"
                name="Natureofcase"
                value={formData.Natureofcase}
                onChange={(e) => setFormData({ ...formData, Natureofcase: e.target.value })}
                readOnly
                
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label for="defendants" class="block text-sm font-medium text-gray-700">How many defendants:</label>
              <input
                type="text"
                id="defendants"
                name="defendants"
                value={formData.defendants}
                onChange={(e) => setFormData({ ...formData, defendants: e.target.value })}
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div>
              <label for="lastdateofhearing" class="block text-sm font-medium text-gray-700">Last Date of Hearing:</label>
              <input
                type="text"
                id="lastdateofhearing"
                name="lastdateofhearing"
                value={formData.lastdateofhearing}
                onChange={(e) => setFormData({ ...formData, lastdateofhearing: e.target.value })}
                required
                class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
              />
            </div>
            <div class="mt-4">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Create Factsheet</button>
            </div>
          </form>
          <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
        </div>
      </body>
    </>
  );
};

export default Factsheet;
