import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { urlapi } from '../../Components/Menu';

const TodayHearings = () => {
  const [hearings, setHearings] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to fetch today's hearings
    axios
      .get(`${urlapi}/api/v1/auth/gettodayhearings`)
      .then((response) => {
        setHearings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

  console.log(hearings)

  return (
    <div className=' w-full mt-20'>
      <h2 className="text-2xl font-semibold mb-4 text-center">Today's Hearings</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Suit No
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Nature
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Next Hearing
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              View case
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {hearings.length > 0 ? hearings.map((hearing) => (
            <tr key={hearing._id}>
              <td className="px-6 py-4 whitespace-no-wrap">{hearing.Suitno}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{hearing.title}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{hearing.nature}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{hearing.nexthearing}</td>
              <td className="px-6 py-4 whitespace-no-wrap"><Link to={`/viewdetails/${hearing._id}/${hearing.title}`}>View</Link></td>
              {/* Add other fields as needed */}
            </tr>
          ))
        :
      <div className=' relative left-[550px] mt-20 text-red-500 font-semibold text-xl'>No Data Available</div>}
        </tbody>
      </table>
    </div>
  );
};

export default TodayHearings;
