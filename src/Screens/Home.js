import React, { useState, useEffect , useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { BsFill0SquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { urlapi } from '../Components/Menu';
import TodayHearings from './Cases/Todayhearing';
import { CaseHistoryContext } from '../Context/CaseHistoryContext';
import { UserContext } from '../Context/Usercontext';

const Home = () => {

  const {logout} = useAuth()

  const [entries, setEntries] = useState([]);
  const [todayCases, setTodayCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  
  const userRole = JSON.parse(sessionStorage.getItem('user'))
 

  const {editget , Editrequestget } = useContext(CaseHistoryContext);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlapi}/api/v1/auth/getentries`);
        setEntries(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
   Editrequestget()
    fetchData();
   
  }, []);

  


useEffect(() => {
  const fetchTodayCases = async () => {
    try {
      const response = await axios.get(`${urlapi}/api/v1/auth/gettodayentries`);
      setTodayCases(response.data);
    } catch (error) {
      console.error('Error fetching today cases: ', error);
    } finally {
      setLoading(false);
    }
  };
   
  fetchTodayCases();
}, []);

const logouthandler = () =>{
    logout()
}
   

     

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(userRole ,  'userrole')
  
  return (
    <>
     
      <main className=' w-full'>
        <section className='p-4 text-center'>
          <div className=' font-semibold text-2xl'>Dashboard</div>
        </section>
        <section>
          <div className=' grid grid-cols-4 gap-3 p-3 max-sm:grid-cols-1'>

            {/* Primary */}
          
            <div className='w-full pb-4 text-white p-4 bg-[#0d6efd] rounded'>
              <div className="flex justify-between">
                <div>Total Cases</div>
                <div>{entries.length}</div>
              </div>
              <hr className='mt-8  shadow-2xl' style={{ borderColor: 'black' }} />
              <div className='shadow-2xl relative top-2'>
              <Link to='/viewcases'>View Details</Link>
              </div>
            </div>
        
            


            {/* Warning */}
            <div className='w-full pb-4 text-white p-4 bg-[#ffc107] rounded'>
              <div className="flex justify-between">
                <div>Today's Case</div>
                <div>{Array.isArray(todayCases) ? todayCases.length : '0'}</div>
              </div>
              <hr className='mt-8 shadow-2xl' style={{ borderColor: 'black' }} />
              <div className='shadow-2xl relative top-2'>
                <Link to="/todaycase">View Details</Link>
              </div>
            </div>
            

            {/* Success */}
            <div className='w-full pb-4 text-white p-4 bg-[#198754] rounded'>
              <div className="flex justify-between">
                <div>Pending Approvals</div>
                <div>{editget.length > 0 ? editget.length : "0"}</div>
              </div>
              <hr className='mt-8 shadow-2xl' style={{ borderColor: 'black' }} />
              <div className='shadow-2xl relative top-2'>
                <Link to="/editreq">View Details</Link>
              </div>
            </div>


            {/* Danger */}
            <div className='w-full pb-4 text-white p-4 bg-[#dc3545] rounded'>
              <div className="flex justify-between">
                <div>Danger Card</div>
                <div>0</div>
              </div>
              <hr className='mt-8 shadow-2xl' style={{ borderColor: 'black' }} />
              <div className='shadow-2xl relative top-2'>
                <a href="viewdetails">View Details</a>
              </div>
            </div>
          </div>
        </section>

        <section className=' flex flex-col justify-center items-center h-[200px]'>
          <div className=' text-[50px] font-semibold'>WELCOME TO CMS SYSTEM</div>
          <Link to="/addcase"> <span className=' text-lg text-blue-600'>Click here to Add your Case</span></Link>
          <button className=' bg-purple-300 px-6 py-2 rounded mt-5'  onClick={logouthandler}>Logout</button>
        </section>


        <section>
          <TodayHearings/>
        </section>

      </main>
    

    </>
  )
}

export default Home