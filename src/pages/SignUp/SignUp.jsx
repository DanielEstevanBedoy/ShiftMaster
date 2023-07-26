import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";



function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // We will use this to redirect after successful signup



  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }



    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    // add to database
    const db = getDatabase();
    set(ref(db, 'users/' + user.uid), {
      firstName: firstName,
      email: user.email,
      uid: user.uid,
    }).then(() => {
      // handle successful registration, such as redirecting the user to a dashboard page
      navigate("/dashboard"); 
    })
    .catch((error) => {
      console.error("Error writing to database: ", error);
    });

    })
    .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    // show error to user
    alert(`Error: ${errorMessage}`);
    });

    // You can access form data using the state values (firstName, email, password, etc.)
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          ShiftMaster
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create a free account
            </h1>
         
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                className="w-full p-4 text-black tracking-tight bg-white placeholder-gray-400 outline-none border border-gray-300 rounded-lg focus:border-indigo-500 transition duration-200"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
              <input
                className="w-full p-4 text-black tracking-tight bg-white placeholder-gray-400 outline-none border border-gray-300 rounded-lg focus:border-indigo-500 transition duration-200"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                className="w-full p-4 text-black tracking-tight bg-white placeholder-gray-400 outline-none border border-gray-300 rounded-lg focus:border-indigo-500 transition duration-200"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <input
                className="w-full p-4 text-black tracking-tight bg-white placeholder-gray-400 outline-none border border-gray-300 rounded-lg focus:border-indigo-500 transition duration-200"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
             
              <button
                className="mb-7 px-5 py-4 w-full text-white text-center font-semibold tracking-tight bg-indigo-500 hover:bg-indigo-600 rounded-lg focus:ring-4 focus:ring-indigo-300 transition duration-200"
                type="submit"
              >
                Create Free Account
              </button>



              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
