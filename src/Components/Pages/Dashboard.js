import React, { useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export const Dashboard = () => {
  const dashboardContext = useContext(GlobalContext);
  const { setQuizPassword } = useContext(
    GlobalContext
  );
  const history = useHistory();

  const handleClick = (e, password) => {
    e.preventDefault();
    setQuizPassword(password);
    history.push('/results');
  };
  return (
    <div>
      <div className="min-h-screen w-screen bg-gradient-to-r from-blue-400 via-blue-300 to-blue-900">
        <div className=" -mt-48 pt-60 w-5/6 flex justify-center ">
          <h1 className="font-semibold text-7xl p-2 rounded text-white bg-gradient-to-r from-green-400 via-blue-500 to-red-500 shadow-lg">
            {' '}
            Main
          </h1>
        </div>

        <div className="w-full flex justify-center">
          <h1 className="font-bold text-white text-7xl p-2 rounded bg-gradient-to-r from-blue-400 via-green-500 to-indigo-500 shadow-xl">
            Menu
          </h1>
        </div>

        <div className=" mt-20 flex justify-center ">
          <div
            type="box1"
            className=" -mt-30 group  w-11/12 lg:w-2/4 md:w-10/12 py-3 px-4 border-2 text-sm leading-5 font-medium rounded-md text-black bg-blue-500 border-white lg:flex-col  "
          >
            <p className="text-white text-3xl p-1 font-semibold">
              Let's get Started!{' '}
            </p>
            <div className=" p-2">
              <br />
              <Link
                to="/CreateQuiz"
                className="bg-white h-16 w-full flex rounded-md shadow-xl hover:bg-gray-200"
              >
                <svg
                  className="bg-indigo-400 left-4 w-10 h-10 relative mt-3 float-left border border-transparent rounded-md shadow-lg"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <span className="inline-block mt-5 px-8 font-medium float-left text-md text-gray-600">
                  {' '}
                  Create Quiz
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex py-10 mt-4 justify-center">
          <div
            type="box2"
            className=" -mt-9   w-11/12 lg:w-2/4 md:w-10/12 py-3 px-4 border-2 text-sm leading-5 font-medium rounded-md text-black bg-indigo-400 shadow-md border-white"
          >
            <p className="text-white text-lg font-normal"> Your Quizzes: </p>
            {dashboardContext.usersQuizzes &&
            dashboardContext.usersQuizzes.length > 0 ? (
              dashboardContext.usersQuizzes.map((quiz, i) => (
                <div key={i} className="px-2 w-full my-5">
                  <button
                    className="w-full"
                    onClick={(e) => handleClick(e, quiz.password)}
                  >
                    <div className="bg-white h-16 w-full flex rounded-md shadow-xl hover:bg-gray-200">
                      <svg
                        className="bg-indigo-400 left-4 w-10 h-10 relative mt-3 float-left border border-transparent rounded-md shadow-lg"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="inline-block mt-5 px-8 font-medium float-left text-md text-gray-600">
                        Quiz {i + 1} - Password - {quiz.password}
                      </span>
                    </div>
                  </button>
                </div>
              ))
            ) : (
              <>
                <p className="text-lg font-medium py-4">
                  You Have no quizzes yet. Create a quiz below
                </p>
                <Link
                  to="/CreateQuiz"
                  className="bg-white h-16 w-full flex rounded-md shadow-xl hover:bg-gray-200"
                >
                  <svg
                    className="bg-indigo-400 left-4 w-10 h-10 relative mt-3 float-left border border-transparent rounded-md shadow-lg"
                    fill="none"
                    stroke="white"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                  <span className="inline-block mt-5 px-8 font-medium float-left text-md text-gray-600">
                    {' '}
                    Create Quiz
                  </span>
                </Link>
              </>
            )}
            {/* <div className="px-2">
              <div className="bg-white h-16 w-full flex rounded-md shadow-xl hover:bg-gray-200">
                <svg
                  className="bg-indigo-400 left-4 w-10 h-10 relative mt-3 float-left border border-transparent rounded-md shadow-lg"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="inline-block mt-5 px-8 font-medium float-left text-md text-gray-600">
                  Quiz1
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
