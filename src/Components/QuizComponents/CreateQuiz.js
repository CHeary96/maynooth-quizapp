import React from 'react';
import { ShowCreateQuiz } from './ShowCreateQuiz';

export const CreateQuiz = () => {
  return (
    <div
      className="min-h-screen w-screen flex justify-center items-center flex-col lg:flex-row lg:justify-around
        bg-gradient-to-r from-blue-300 via-blue-400 to-blue-800 ...
        "
    >
      <div className={'w-full'}>{ShowCreateQuiz()}</div>
    </div>
  );
};

export default CreateQuiz;
