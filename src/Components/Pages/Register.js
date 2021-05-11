import React, { useState, useContext, useRef } from 'react';
import './style.css';
import { useHistory, Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export const Register = () => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { addUser } = useContext(GlobalContext);

  const firebaseRegister = (e) => {
    e.preventDefault();
    addUser(email, password);
    history.push('/');
  };
  return (
    <div
      className="p-10 w-full h-screen"
      style={{
        background: 'linear-gradient(to bottom, grey, white',
      }}
    >
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center text-3xl leading-9 font-thin text-yellow-300">
        Create Account
      </h2>
      <p className="text-center text-sm leading-5 text-gray-100">
        Please fill in your information! <br />{' '}
      </p>
      <br />
      <form onSubmit={firebaseRegister}>
        <Link to="/Home">
          <button
            type="return"
            className="justify-items-auto group w-20 lg:w-20 md:w-20 py-1.5 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-black hover:bg-gray-400 focus:outline-none focus:border-blue-200 focus:shadow-outline-teal active:bg-blue-200 active:outline-none transition duration-180 ease-in-out mt-8"
          >
            <svg
              className="w-5 h-5 m-0.5 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              ></path>
            </svg>
            <span className="m-0.5">Return</span>
          </button>
        </Link>

        <br />
        <div className="flex justify-center">
          <div className="lg:w-1/3 md:w-2/3 w-full">
            <label
              className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={({ target }) => setEmail(target.value)}
              type="email"
              name="email"
              id="email"
              placeholder="test@youremail.com"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 "
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <div className="lg:w-1/3 md:w-2/3 w-full">
            <label
              className="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              name="password"
              id="password"
              placeholder="New password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 "
              required
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="group w-full lg:w-1/3 md:w-2/3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:border-blue-200 focus:shadow-outline-teal active:bg-blue-200 active:outline-none transition duration-180 ease-in-out mt-8"
          >
            Sign Up
            <svg
              className="w-6 h-6 mx-2  inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
          {/* LogOut Button */}
        </div>
      </form>
    </div>
  );
};
export default Register;
