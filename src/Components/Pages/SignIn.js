import React, { useEffect, useState, useContext, useRef } from 'react';
import Video from './videos/video.mp4';
import './style.css';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalState';
import $ from 'jquery';

export const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [rPassword, setResetPassword] = useState();
  const [password, setPassword] = useState();

  const { signInUser, resetPassword } = useContext(GlobalContext);

  const firebaseLogin = async (e) => {
    e.preventDefault();
    await signInUser(email, password);

    history.push('/');
  };

  const submitReset = (e) => {
    e.preventDefault();
    resetPassword(rPassword);
    history.push('/SignIn');
  };

  const videoRef = useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 0.78;
  };

  useEffect(() => {
    const visiablityToggle = document.querySelector('.visibility');
    const input = document.querySelector('.input-container input');

    var password = true;

    visiablityToggle.addEventListener('click', function () {
      if (password) {
        input.setAttribute('type', 'text');
      } else {
        input.setAttribute('type', 'password');
      }
      password = !password;
    });
  });

  useEffect(() => {
    var modelBtn = document.querySelector('.model-btn');
    var modelBg = document.querySelector('.model-bg');
    var modelClose = document.querySelector('.model-close');

    modelBtn.addEventListener('click', function () {
      modelBg.classList.add('bg-active');
    });

    modelClose.addEventListener('click', function () {
      modelBg.classList.remove('bg-active');
    });
  });

  useEffect(() => {
    $('#submitBtn').on('click', () => {
      $('.model-bg').hide();
    });

    $('#forgotPassword').on('click', () => {
      $('.model-bg').show();
    });
  });
  return (
    <div>
      <div className="w-full h-screen">
        <video
          ref={videoRef}
          onCanPlay={() => setPlayBack()}
          className="bgVideo"
          autoPlay
          muted
          loop
          style={{
            position: 'fixed',
            width: '100%',
            left: '50%',
            top: '50%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: '-1',
          }}
        >
          <source src={Video} type="video/mp4" />
        </video>

        <div className="p-10">
          <h2 className="text-center text-4xl leading-9 font-thin text-blue-300">
            Sign In to your account
          </h2>
          <br />

          <p className="text-center text-sm leading-5 text-gray-400 ">
            Or
            <a href="/Register" className="text-white hover:text-yellow-500">
              {' '}
              Create an account
            </a>{' '}
            It's quick and easy! <br />{' '}
          </p>
          <br />
          <form onSubmit={firebaseLogin}>
            <div className="flex justify-center">
              <div className="lg:w-1/3 md:w-2/3 w-full">
                <label
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
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
                  className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="input-container">
                  <input
                    onChange={({ target }) => setPassword(target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="***********"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 "
                    required
                  />
                  <span>
                    <svg
                      className=" visibility w-8 h-8 inline-block float-right transform -translate-y-9 -translate-x-6 cursor-pointer "
                      fill="none"
                      stroke="gray"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <button
                  id="forgotPassword"
                  href="Popup"
                  className="model-btn font-light float-right pt-1 text-white hover:text-yellow-500"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="group w-full lg:w-1/3 md:w-2/3 py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-600 focus:outline-none focus:border-blue-200 focus:shadow-outline-teal active:bg-blue-200 active:outline-none transition duration-180 ease-in-out mt-8"
              >
                Sign In
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
          <div className="model-bg">
            <div className="model">
              <form onSubmit={submitReset}>
                <h2 className="text-lg px-2 font-semibold mt-6 text-center">
                  Enter your email address to reset your password
                </h2>
                <p className="p-3 text-sm font-light text-center px-10">
                  You will recieve a conformation email in your inbox
                </p>
                <input
                  onChange={({ target }) => setResetPassword(target.value)}
                  type="email"
                  className="border rounded-lg w-full p-2 mt-2 tracking-wide"
                  placeholder="Email"
                ></input>
                <button
                  id="submitBtn"
                  type="submit"
                  className="border rounded-lg bg-blue-400 hover:bg-blue-600 w-full mt-1 p-2"
                >
                  Submit
                </button>
                <span className="model-close cursor-pointer">X</span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
