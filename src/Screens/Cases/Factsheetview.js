import React, { useEffect, useState, useContext } from 'react';
import { CaseHistoryContext } from '../../Context/CaseHistoryContext';
import { Link, useParams } from 'react-router-dom';

const Factsheetview = () => {
  const { factview, loading, fetchfactsheet } = useContext(CaseHistoryContext);
  const { caseId } = useParams();

  useEffect(() => {
    fetchfactsheet(caseId);
  }, [caseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(factview, 'factview');
  return (
    <>
      <main className='w-full'>
        <div className='grid grid-cols-1'>
          <div className='bg-purple-300 p-4 flex justify-center text-2xl font-bold'>Fact Sheet</div>
          {factview.length > 0 ? (
            factview.map((item, index) => ( // Added index here for key prop
              <React.Fragment key={index}> {/* Added React.Fragment with key */}
                <div className='text-lg p-4 font-bold mt-2'>Facts:</div>
                <div className='px-4 text-justify'>{item.facts}</div>
                <div className='text-lg p-4 font-bold mt-2'>When the case instituted:</div>
                <div className='px-4 text-justify'>{item.caseinstituted}</div>
                <div className='text-lg p-4 font-bold mt-2'>No of hearings:</div>
                <div className='px-4 text-justify'>{item.hearings}</div>
                <div className='text-lg p-4 font-bold mt-2'>Nature of case:</div>
                <div className='px-4 text-justify'>{item.Natureofcase}</div>
                <div className='text-lg p-4 font-bold mt-2'>How many defendants:</div>
                <div className='px-4 text-justify'>{item.defendants}</div>
                <div className='text-lg p-4 font-bold mt-2'>Last date of hearing:</div>
                <div className='px-4 text-justify'>{item.lastdateofhearing}</div>
              </React.Fragment>
            ))
          ) : (
            <div className='p-4 text-center'>No data available.</div>
          )}
        </div>
        <Link to={`/factsheetedit/${caseId}`}>
          <div className=' w-52 rounded p-3 relative left-[550px] bg-purple-300 flex justify-center mb-3'>
            <button className=' hover:text-white'>Edit</button>
          </div>
        </Link>



      </main>


    </>


  );
};

export default Factsheetview;
