import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { urlapi } from '../../Components/Menu';
import { Navigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate()



  const { login } = useAuth(); // Use the login function from the AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Replace with your actual login API endpoint
      const response = await axios.post(`http://localhost:8082/api/v1/auth/login`, { email, password });
      const { token, id, role, name } = response.data;

      // Use the login function from AuthContext to set the user as logged in
      login({ email, role, id, name, token }); // Pass the response data to the login context method
      if (role === 0) {
        navigate('/user')
      } else if (role === 1) {
        navigate('/')
      } else {
        navigate('/*') // Redirect to a login page or other appropriate route
      }
      // After successful login, redirect to the desired page
      // Redirect to the homepage or dashboard as per your routing setup
      alert('Login Successful');
      console.log(role, 'Role_______')




    } catch (error) {
      console.error('Login Failed:', error.response ? error.response.data : error.message);
      // You can alert or show error to the user here
      alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/01/22/71/96/1000_F_122719641_V0yw2cAOrfxsON3HeWi2Sf4iVxhv27QO.jpg')",
      }}
    >

      <div className="flex items-center justify-center h-full">

        <div
          className="w-full max-w-xs p-8 bg-gray-100   bg-opacity-50 rounded-lg shadow-xl"
          style={{
            backgroundImage: "url('https://example.com/your-login-section-background.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >

          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className=' text-center bg-amber-500 p-4 text-xl bg-opacity-90 text-white font-bold'>ZIA & SHAH</div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
