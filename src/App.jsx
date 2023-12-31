import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Routes, Route, useLocation} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
// Import pages
import Dashboard from './pages/Dashboard';
import SignUpPage from './pages/SignUp/SignUp';
import SignInPage from './pages/SignIn/SignIn';
import SchedulePage from './pages/Schedule/SchedulePage';
import Album from './pages/landingPage';
import Forgot from './pages/SignIn/forgotPass';
import CreateNewSchedulePage from './pages/Schedule/createNewSchedule';
import ModifyCurrentSchedulePage from './pages/Schedule/modifyCurrentSchedule';
import Exmployees from './pages/Schedule/Employees';
import NextWeekSchedulePage from './pages/Schedule/nextWeekSchedule';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in.
        setUser(authUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  


  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path = "/" element = {<Album/>}/>
        <Route path = "/dashboard" element = {<Dashboard user = {user}/>}/>
        <Route path ="/signup" element={<SignUpPage/>}/>
        <Route path = "/signin" element={<SignInPage/>}/>
        <Route path = "/forgot" element = {<Forgot/>}/>
        <Route exact path='/schedule/:companyId' element={<SchedulePage />} />
        <Route path='/schedule/:companyId/create-new-schedule' element={<CreateNewSchedulePage />} />
        <Route path='/schedule/:companyId/modify-current-schedule' element={<ModifyCurrentSchedulePage />} />
        <Route path='/schedule/:companyId/employees' element={<Exmployees />} />
        <Route path='/schedule/:companyId/next-week-schedule' element={<NextWeekSchedulePage />} />


      </Routes>
    </>
  );
}

export default App;
