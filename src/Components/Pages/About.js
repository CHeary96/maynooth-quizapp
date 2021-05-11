import React from 'react';
import { useEffect, useState } from 'react';

export const About = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  useEffect(() => {
    setIsAnimated(true);
  }, []);
  return (
    <div>
      <div
        className="min-h-screen w-screen flex justify-center items-center flex-col lg:flex-row lg:justify-around
            bg-gradient-to-r from-blue-700 via-blue-400 to-blue-300 ...
            "
      >
        <div className=" text-center lg:text-top transform duration-1000 ease-in-out flex-col">
          <h1 className="font-semibold text-5xl text-left p-2 text-black">
            About <span className="font-thin text-white">us</span>
          </h1>
          <div className="mt-3 align-top container px-10  w-100">
            <p className=" shadow-lg text-sm font-thin absloute text-gray-800 text-current border-4 rounded-md p-2 max-w-200 bg-white">
              QuizApp is an application which allows users to participate in a
              quiz with their friends in real-time. Everyone can be in the same
              location or the quiz can be played via video conferencing such as{' '}
              <em>'Zoom'</em>. All the user needs is a unique password to login
              to their assigned quiz or register and become a quizmaster!
              <br />
              This app was made as part of a Group Project for CS353B. The
              development team is:
              <br />
              <b>Conor Walsh</b>, <b>Patrick Murphy</b>, <b>Luke Fogarty</b>,{' '}
              <b>Brendan Keaveney</b> and<b> Carl Heary</b> .
            </p>
          </div>
        </div>
        <img
          src={process.env.PUBLIC_URL + '/images/team.svg'}
          className={`${
            isAnimated ? 'scale-95' : 'translate-x-full'
          } w-3/5 lg:max-w-xl transform transition duration-1000 ease-in-out `}
        />
      </div>
    </div>
  );
};

export default About;
