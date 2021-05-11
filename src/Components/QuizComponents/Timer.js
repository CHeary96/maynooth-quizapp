import React from 'react';

export function Timer(props) {
  const [advanceQuiz] = [props.advanceQuiz]; //this gets the function that moves the quiz forward
  const [turnLength] = [props.turnLength]; //this get the roundlength from the quiz
  const [currentQuestion] = [props.currentQuestion]; //this get the roundlength from the quiz
  const [timeLeft, setTime] = React.useState(turnLength);

  React.useEffect(() => {
    const timer = setInterval(() => setTime(timeLeft - 1), 1000);
    if (timeLeft < 0) {
      var nextQuestion = currentQuestion + 1;
      advanceQuiz(nextQuestion);
      setTime(turnLength);
    }
    return () => clearInterval(timer);
  });

  return (
    <div className="transform scale-105 -translate-y-5 text-white bg-yellow-500 px-6 py-5 rounded-full text-lg duration-500 animate-pulse">
      {timeLeft < 10 ? '0' : ''}
      {timeLeft}
    </div>
  );
}
