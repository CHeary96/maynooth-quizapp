import React, { useState, useContext } from 'react';

import { GlobalContext } from '../../context/GlobalState';
import { Timer } from './Timer.js';
import { ImageMap } from '../ImageMap.js';
import Answer from './Answer';
import { Link } from 'react-router-dom';

const ActiveQuiz = (props) => {
  const questionArray = props.questionArray;
  const quizLength = props.questionsNumber * props.roundsNumber;
  const roundsNumber = props.roundsNumber;
  const turnLength = props.questionTime;
  const correctAnswers = props.correctAnswers;

  const { addAnswers, addAnswersEnd, currentPlayer } = useContext(
    GlobalContext
  );

  const [answer, setAnswer] = useState('--');
  const [laoding, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [answersArray, setAnswersArray] = useState([]);
  const [roundBreak, setRoundBreak] = useState(false);

  //this removes html entities from the API
  const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  const advanceQuiz = (current) => {
    setAnswersArray((answersArray) => [...answersArray, answer]);

    if (current >= quizLength) {
      setQuizEnded(true);
    } else {
      if (current % (quizLength / roundsNumber) === 0) {
        setRoundBreak(true);
      }
      setCurrentQuestion(current);
      setAnswer('--');
    }
  };

  //this simply changes the answer
  const selectAnswer = (a) => {
    if (a !== answer) {
      setAnswer(a);
    }
  };

  const getResults = () => {
    let grade = 0;
    for (var i = 0; i < quizLength; i++) {
      //checking regular answers
      if (answersArray[i].toUpperCase() === correctAnswers[i].toUpperCase()) {
        grade++;
      }
    }
    //return percentage of correct answers
    return Math.ceil((grade / quizLength) * 100);
  };
  if (!questionArray) {
    return <div />;
  }

  //the answers to be displayed
  let answersShuffled = questionArray[currentQuestion].answers;

  let qMap = answersShuffled.map((current, i) => {
    let answerSize = 'row-span-1 col-span-1 ';
    //this puts the answers on top of one another if there's only two
    if (answersShuffled.length === 2) {
      answerSize = 'row-span-2 sm:col-span-2';
    }
    //this makes the final column of an odd number of answers stretch the full way, looks a little nicer
    if (answersShuffled.length % 2 === 1 && i === answersShuffled.length - 1) {
      answerSize = 'row-span-1 col-span-1 transform sm:translate-x-1/2';
    }
    if (!questionArray[currentQuestion].type.includes('IMAGE_ROUND'))
      return (
        <div key={i} className={answerSize}>
          <Answer
            key={current}
            selectAnswer={selectAnswer}
            thisAnswer={current}
            currentAnswer={answer}
          />
        </div>
      );
    else if (
      questionArray[currentQuestion].type.includes('IMAGE_ROUND') &&
      i === 0
    )
      return (
        //getting the image map instead of the answer boxes
        <div key={i} className={'row-span-2 col-span-2'}>
          <ImageMap
            selectAnswer={selectAnswer}
            currentQuestion={currentQuestion}
            questionID={questionArray[currentQuestion].question}
          />
        </div>
      );
  });

  //just to refer to the question more readably
  const question = questionArray[currentQuestion].question;
  if (quizEnded === false && roundBreak === false) {
    return (
      <div className="relative my-24 mx-12 max-w-screen-lg sm:mx-24 md:mx-36 lg:mx-64">
        <span className="absolute transform -translate-y-2  translate-x-8 text-white bg-blue-500 px-6 py-1 rounded-full z-30 text-lg ">
          Round {Math.floor(currentQuestion / (quizLength / roundsNumber)) + 1}:{' '}
          {
            questionArray[currentQuestion].category.replace(
              'Entertainment: ',
              ''
            ) /*I just think it  looks better withour Entertainment: before hand.*/
          }
        </span>
        <span className="absolute transform -translate-y-2 scale-110 text-white bg-blue-400 px-2 py-1 rounded-full z-30 text-lg ">
          Q{(currentQuestion % (quizLength / roundsNumber)) + 1}
        </span>
        <div className="flex  transform scale-105 my-4 justify-center text-white bg-blue-600 px-6 py-4 rounded-full z-30 text-lg ">
          <div className="absolute transform -translate-x-0 -translate-y-24 text-white bg-blue-600 px-6 py-8 rounded-full z-30 text-lg ">
            <Timer
              advanceQuiz={advanceQuiz}
              quizLength={quizLength}
              turnLength={turnLength}
              currentQuestion={currentQuestion}
            />
          </div>
          <div className=" text-white z-30 text-center text-lg ">
            {
              htmlDecode(
                question
              ) /*replace all codes for punctuation in questions with the symbols like " and ' - LF */
            }
          </div>
        </div>{' '}
        <div className={'grid grid-cols-1 sm:grid-cols-2 gap-3 mx-12 '}>
          {qMap}
        </div>
      </div>
    ); // end of return statement
  } else if (roundBreak === true) {
    addAnswers(answersArray, currentPlayer);
    //this is at the end of the round, giving a small break before the next one
    return (
      <div
        className="flex justify-center cursor-pointer text-white bg-blue-500 px-8 py-4 rounded-xl shadow-md uppercase text-lg tracking-wide mt-3 transform scale-1  hover:scale-105  hover:bg-yellow-500 transition duration-180 ease-in-out"
        onClick={() => setRoundBreak(false)}
      >
        End of Round {Math.floor(currentQuestion / (quizLength / roundsNumber))}
        ! Ready for Round{' '}
        {Math.floor(currentQuestion / (quizLength / roundsNumber)) + 1}?
      </div>
    );
  } else {
    //this is at the end of the quiz, returning the answer array and results
    addAnswersEnd(answersArray, currentPlayer, getResults());
    return (
      <div>
        <div className="flex transform scale-105 my-4 justify-center text-white bg-blue-600 px-6 py-4 rounded-full z-30 ">
          <div className=" text-white z-30 text-center text-lg ">
            You got {getResults()}%!
          </div>
        </div>

        <div className="flex flex-wrap mx-10">
          {answersArray.map((current, i) => {
            i++;
            return (
              <div
                key={i}
                className={
                  current === correctAnswers[i - 1]
                    ? 'flex justify-center cursor-pointer text-white bg-blue-500 px-8 py-4 rounded-xl shadow-md uppercase tracking-wide mt-3 transform scale-90  hover:scale-100 hover:bg-green-500 transition duration-180 ease-in-out'
                    : 'flex justify-center cursor-pointer text-white bg-red-500 px-8 py-4 rounded-xl shadow-md uppercase tracking-wide mt-3 transform scale-90  hover:scale-100  hover:bg-yellow-500 transition duration-180 ease-in-out'
                }
              >
                {htmlDecode(current)}
              </div>
            );
          })}
        </div>
        <Link to="/results">
          <div className="flex transform scale-105 mx-20 my-4 justify-center text-white bg-blue-600 px-6 py-4 rounded-full z-30 ">
            <div className=" text-white z-30 text-center text-lg ">
              View The Quiz Leaderboard
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default ActiveQuiz;
