import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Addcase from '../Screens/Cases/Addcase'
import Home from '../Screens/Home'
import DataTable from '../Screens/Cases/Viewcases'
import History from '../Screens/Cases/History'
import Factsheet from '../Screens/Cases/Factsheet'
import Factsheetview from '../Screens/Cases/Factsheetview'
import Viewtodaycase from '../Screens/Cases/Viewtodaycase'
import Factsheetedit from '../Screens/Cases/Factsheetedit'
import Errorpage from '../Screens/Error/Errorpage'
import TodayHearings from '../Screens/Cases/Todayhearing'
import ViewcaseModal from './ViewcaseModal'
import Editcase from '../Screens/Editpages/Editcase'
import Editrequest from '../Screens/Editpages/Editrequest'
import Usersview from '../Screens/Userscreens/Usersview'
import Getusers from '../Screens/Users/Getusers'





const Router = () => {
  return (
   <>
   <Routes>
       <Route path='/' element={<Home/>}/>
       <Route path='/addcase' element={<Addcase/>}/>
       <Route path='/viewcases' element={<DataTable/>}/>
       <Route path='/viewdetails/:caseId/:title' element={<History/>}/>
       <Route path='/Factsheet/:caseId/:title' element={<Factsheet/>}/>
       <Route path='/factsheetview/:caseId' element={<Factsheetview/>}/>
       <Route path='/todaycase' element={<Viewtodaycase/>}/>
       <Route path='/factsheetedit/:id' element={<Factsheetedit/>}/>
       <Route path='/todayhearings' element={<TodayHearings/>}/>
       <Route path='/*' element={<Errorpage/>}/>
       <Route path='/vmodal' element={<ViewcaseModal/>}/>
       <Route path='/Editcase/:id' element={<Editcase/>}/>
       <Route path='/editreq' element={<Editrequest/>}/>
       <Route path='/user' element={<Usersview/>}/>
       <Route path='/getallusers' element={<Getusers/>}/>
      
      

   </Routes>
   </>
  )
}

export default Router