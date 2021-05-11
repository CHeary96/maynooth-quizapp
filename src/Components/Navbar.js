import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import $ from 'jquery';

export default function Navbar() {
  const { user, logOut } = useContext(GlobalContext);
  const handleLogout = (e) => {
    e.preventDefault();
    logOut();
  };
  // function to toggle mobile menu visibility 
  useEffect(() => {
    $('#hamburgerbtn').on('click', () => {
      $('#mobileMenu').toggle();
    });
    //just stops an error in the terminal below
    // eslint-disable-next-line no-restricted-globals
    if (screen.width > 1024) {
      $('#mobileMenu').show();
    }
  });
  return (
    <nav
      id="navBar"
      className=" z-50 sticky top-0 font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-blue-500 shadow sm:items-baseline w-screen"
    >
      {/* div for home button, hamburger button, player icons */}
      <div className="mb-2 sm:mb-0">
        {/* home button */}

        <Link
          to="/Home"
          className="text-2xl no-underline text-black hover:text-white"
        >
          {/* home icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="28"
            width="28"
            className="inline mr-1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </Link>

        {/* hamburger button */}
        <p id="hamburgerbtn" className="hover:text-white inline">
          {/* hamburger button icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            height="28"
            width="28"
            className="inline mr-1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </p>
      </div>
      {/* mobile menu div */}
      <div className="inline-block" id="mobileMenu">
        {/* about button */}
        <Link
          to="/About"
          className="text-md no-underline text-black hover:text-white ml-2 pr-4 navIcon"
 
        >
          {/* about icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            height="28"
            width="28"
            className="inline mr-1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          About
        </Link>
        {user ? (
          <>
            <Link
              to="/QuizDashBoard"
              className="text-lg no-underline text-black hover:text-white ml-2 pr-4 inl navIcon"

            >
              {/* quiz dashboard icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="28"
                width="28"
                className="inline mr-1"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              QuizDashBoard
            </Link>
            <div className="inline-block">
              <button
                onClick={handleLogout}
                className="flex text-lg no-underline text-black hover:text-white ml-2 pr-4"
              >
                <p className="ml-2 text-xl  py-1">
                  <span>
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-10 inline-block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  Logout
                </p>
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/Register"
              className="text-md no-underline text-black hover:text-white ml-2 pr-4 navIcon"
     
            >
              {/* register icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="28"
                width="28"
                className="inline mr-1"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clipRule="evenodd"
                />
              </svg>
              Register
            </Link>

            <Link
              to="/SignIn"
              className="text-md no-underline text-black hover:text-white ml-2 pr-4"
            >
              {' '}
              {/* sign in icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                height="28"
                width="28"
                className="inline mr-1"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                  clipRule="evenodd"
                />
              </svg>
              SignIn
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
