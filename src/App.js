import React from 'react'
import Sidebar from './Components/Sidebar'
import { CaseHistoryProvider } from './Context/CaseHistoryContext';
import { AuthProvider , useAuth } from './Context/AuthContext';
import LoginPage from './Screens/Auth/Login';


const App = () => {
  
  return (
    <>

    <AuthProvider>

      <MainComponent/>
     
    </AuthProvider>
       
  
    </>
  )
}

const MainComponent = () => {
  const { authData } = useAuth();
  return (
    <CaseHistoryProvider>
      {authData ? <Sidebar /> : <LoginPage />}
    </CaseHistoryProvider>
  );
};

export default App