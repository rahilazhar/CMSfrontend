import React from 'react'
import Sidebar from './Components/Sidebar'
import { CaseHistoryProvider } from './Context/CaseHistoryContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import LoginPage from './Screens/Auth/Login';
import { UserProvider } from './Context/Usercontext';


const App = () => {

  return (
    <>
      <UserProvider>
        <AuthProvider>

          <MainComponent />

        </AuthProvider>
      </UserProvider>


    </>
  )
}

const MainComponent = () => {
  const { authData } = useAuth();
  return (
    <CaseHistoryProvider>
      {authData ? <Sidebar /> : <Sidebar />}
    </CaseHistoryProvider>
  );
};

export default App