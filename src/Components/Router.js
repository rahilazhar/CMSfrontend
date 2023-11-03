import React from 'react'
import { Route , Routes } from 'react-router-dom'
import Addcase from '../Screens/Cases/Addcase'
import Home from '../Screens/Home'
import DataTable from '../Screens/Cases/Viewcases'
import History from '../Screens/Cases/History'
import Factsheet from '../Screens/Cases/Factsheet'
import Factsheetview from '../Screens/Cases/Factsheetview'


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

   </Routes>
   </>
  )
}

export default Router