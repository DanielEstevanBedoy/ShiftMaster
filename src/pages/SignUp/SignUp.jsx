import React, { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";



function SignUpPage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

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

  const handleAgreeTermsChange = (e) => {
    setAgreeTerms(e.target.checked);
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
          Schedule.io
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
              <div className="relative flex p-px bg-transparent overflow-hidden rounded-lg mb-6">
                <input
                  className="form-input opacity-0 absolute top-px z-10 h-5 w-5"
                  type="checkbox"
                  name="confirm"
                  value="yes"
                  checked={agreeTerms}
                  onChange={handleAgreeTermsChange}
                />
                <div className="mr-2.5 text-transparent border border-gray-500 w-5 h-5 relative top-px flex justify-center items-center rounded">
                  <svg className="w-2.5 h-2.5" width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.604248 3.77081L2.68758 5.85415L7.89591 0.645813" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <label className="select-none text-gray-400 tracking-tight">
                  <span>I agree to the</span>
                  <a className="text-black hover:text-gray-700" href="#">
                    Terms &amp; Conditions &amp; Privacy Policy
                  </a>
                </label>
              </div>
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
