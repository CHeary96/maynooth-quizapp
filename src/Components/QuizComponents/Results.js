import React, { useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Results = () => {
  const { getResults, quizPassword, results, quiz } = useContext(GlobalContext);
  useEffect(() => {
    getResults(quizPassword);
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-300 via-blue-400 to-blue-500 p-4">
      <div className="w-2/3 flex flex-col  mx-auto items-center justify-center flex-wrap bg-gray-200 p-6 rounded-lg shadow-xl">
        <div className="w-full flex justify-start border-b-2 border-gray-800">
          <div className="w-3/4 text-2xl font-black">Player</div>
          <div className="w-1/4 text-2xl font-black">%</div>
        </div>
        {results
          .sort((a, b) => {
            return a.score < b.score;
          })
          .map((res, i) => (
            <div key={i} className="w-full flex justify-start py-2">
              <div className="w-3/4 text-lg font-bold">{res.player}</div>
              <div className="w-1/4 text-lg font-bold">{res.score}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Results;
