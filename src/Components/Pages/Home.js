import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';

export const Home = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [quizPassword, setQuizPassword] = useState('');
  const [playerName, setPlayerName] = useState('');
  const { findQuiz, user, getUsersQuizzes } = useContext(GlobalContext);

  const history = useHistory();

  useEffect(() => {
    setIsAnimated(true);
    if (user) {
      getUsersQuizzes(user.email);
    }
  }, []);

  const handleJoinClick = async (e) => {
    e.preventDefault();
    await findQuiz(quizPassword, playerName);
    history.push('/currentQuiz');
  };
  return (
    <div>
      <div
        className="min-h-screen w-screen flex justify-center items-center flex-col lg:flex-row lg:justify-around
        bg-gradient-to-r from-blue-300 via-blue-400 to-blue-800 
        "
      >
        <img
          src={process.env.PUBLIC_URL + '/images/quiz.png'}
          alt="devices"
          className={`${
            isAnimated ? 'scale-75' : 'translate-x-full'
          } w-3/5 lg:max-w-xl transform transition duration-1000 ease-in-out `}
        />

        <div
          className={`${
            isAnimated ? 'scale-x-100' : 'scale-x-0'
          } m-10 text-center lg:text-center transform duration-1000 ease-in-out`}
        >
          <h1 className="font-semibold text-4xl text-black">
            Connecting <span className="font-thin text-white">together</span>
          </h1>
          <div className="mt-3 items-center text-white font-thin">
            <li>
              Play against friends in
              <span className="font-bold">real time</span>
            </li>
            <li>
              Topics for <span className="font-bold">every</span> interest
            </li>
            <li>
              And it's <span className="font-bold">FREE</span> to play!
            </li>
          </div>
          <div className="flex flex-col">
            <Link
              to="/About"
              className="inline-block text-white bg-blue-500 px-8 py-4 rounded-full shadow-lg uppercase text-lg tracking-wide mt-3  hover:bg-indigo-600 focus:outline-none focus:border-blue-200 focus:shadow-outline-teal active:bg-blue-200 active:outline-none transition duration-180 ease-in-out"
            >
              Learn More
              <svg
                className="w-10 h-6 inline-block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </Link>
            <div className="">
              <input
                onChange={({ target }) => setQuizPassword(target.value)}
                type="text"
                name="quizCode"
                id=""
                placeholder="Quiz Password"
                className="px-3 py-2 rounded-xl shadow-xl"
              />
              <input
                onChange={({ target }) => setPlayerName(target.value)}
                type="text"
                name="playerName"
                id=""
                placeholder="Your Name"
                className="px-3 py-2 rounded-xl shadow-xl m-2"
              />
              <button
                onClick={handleJoinClick}
                className="Learn More"
                className="inline-block text-white bg-blue-500 px-8 py-4 rounded-full shadow-lg uppercase text-lg tracking-wide mt-3  hover:bg-indigo-600 focus:outline-none focus:border-blue-200 focus:shadow-outline-teal active:bg-blue-200 active:outline-none transition duration-180 ease-in-out"
              >
                Join Quiz
                <svg
                  className="w-10 h-6 inline-block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
