import { useState, useEffect } from 'react';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Datepicker from '../components/Datepicker';
import {database} from "../firebase";
import {Link} from "react-router-dom";
import { ref, onValue, push, set, off, remove } from "firebase/database";
import { getAuth } from 'firebase/auth';


// import DashboardCard01 from '../partials/dashboard/DashboardCard01';
// import DashboardCard02 from '../partials/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';


function Dashboard({user}) {
const [sidebarOpen, setSidebarOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      setUserId(user.uid);
    }
  }, []);






  useEffect(() => {
    if (user) {
      const companiesRef = ref(database, `users/${user.uid}/companies`);
      const listener = onValue(companiesRef, (snapshot) => {
        const companiesData = snapshot.val();
        const companiesArray = companiesData ? Object.values(companiesData) : [];
        setCompanies(companiesArray);
      });
  
      return () => off(companiesRef, listener);
    }
  }, [user]);
  
  

  const handleAddCompany = (event) => {
    event.preventDefault(); // This line prevents the form from causing a page refresh.
    
    if (userId) {
      const newCompanyRef = push(ref(database, `users/${userId}/companies`));
      console.log("new company created");
      set(newCompanyRef, {
        id: newCompanyRef.key,
        name: newCompanyName,
      });
  
      setNewCompanyName('');
    }
  };
  

  const handleDeleteCompany = (companyId) => {
    
    const companyRef = ref(database, `users/${user.uid}/companies/${companyId}`);
    remove(companyRef);
  };
  




  

  return (
    <div className="flex h-screen overflow-hidden">

 
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">


              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                {/* Datepicker built with flatpickr */}
                <Datepicker />
       
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Create New Company Form */}



              {/* Companies */}
              {companies.map((company) => (
                <CompanyCard key={company.id} 
                company={company}
                onDelete = {()=> handleDeleteCompany(company.id)}
                
                />
              ))}

                <div className="bg-white rounded-lg p-4 shadow">
                <form onSubmit={handleAddCompany} className="flex flex-col">
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="Enter Company Name"
                    className="p-2 border rounded-lg mb-2"
                    />
                  <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded-lg">Add Company</button>
                 </form>
               </div>
            </div>
          </div>
        </main>


      </div>
    </div>
  );
}

export default Dashboard;



function CompanyCard({ company, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="font-bold text-xl">{company.name}</h2>
      <div className="flex justify-between items-center mt-4">
      <Link to={`/schedule/${company.id}`} className="text-blue-500">View Schedule</Link>
        <button onClick={onDelete} className="py-2 px-4 bg-red-500 text-white rounded-lg">Delete</button>
      </div>
    </div>
  );
}


