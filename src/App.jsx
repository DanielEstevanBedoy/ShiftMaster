import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUp/SignUp';
import SignInPage from './pages/SignIn/SignIn';
import SchedulePage from './pages/Schedule/SchedulePage';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path = "/dashboard" element = {<Dashboard/>}/>
        <Route path ="/signup" element={<SignUpPage/>}/>
        <Route path = "/signin" element={<SignInPage/>}/>
        { <Route path ="/schedulepage" element ={<SchedulePage/>}/> }

      </Routes>
    </>
  );
}

export default App;
