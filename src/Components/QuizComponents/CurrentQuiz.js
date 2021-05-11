import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import ActiveQuiz from './ActiveQuiz';

export const CurrentQuiz = () => {
  //there is a conditional render here for if the quiz has a length of zero, meaning a quiz is not loaded currently.
  const { quiz } = useContext(GlobalContext);
  return (
    <div
      className="w-screen h-screen bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 ..."
      style={{}}
    >
      {quiz.questionArray.length > 0 ? (
        <div className={'grid justify-items-center'}>
          <ActiveQuiz
            questionArray={quiz.questionArray}
            questionsNumber={quiz.questionsNumber}
            questionTime={quiz.questionTime}
            roundsNumber={quiz.roundsNumber}
            correctAnswers={quiz.answers}
          />
        </div>
      ) : (
        <div className={'grid justify-items-center'}>
          Something went wrong here... <br />
          Go to the Quiz Dashboard to take a new quiz.
        </div>
      )}
    </div>
  );
};

export default CurrentQuiz;
