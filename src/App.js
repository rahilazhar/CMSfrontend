import React from 'react'
import Sidebar from './Components/Sidebar'
import { CaseHistoryProvider } from './Context/CaseHistoryContext';

const App = () => {
  return (
    <>
      <CaseHistoryProvider>
        <Sidebar />
      </CaseHistoryProvider>
    </>
  )
}

export default App