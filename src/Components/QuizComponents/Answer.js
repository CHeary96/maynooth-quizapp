import React, { Component } from 'react';

//this removes html entities from the API
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent;
}

export default class Answer extends Component {
  render() {
    const selectAnswer = this.props.selectAnswer;
    const thisAnswer = this.props.thisAnswer;
    const currentAnswer = this.props.currentAnswer;
    return (
      <div
        className={
          thisAnswer === currentAnswer
            ? 'flex justify-center cursor-pointer text-white bg-green-500 px-8 py-4 rounded-xl shadow-md uppercase text-lg tracking-wide mt-3 transform scale-105 hover:bg-yellow-500 transition duration-180 ease-in-out'
            : 'flex justify-center cursor-pointer text-white bg-blue-500 px-8 py-4 rounded-xl shadow-md uppercase text-lg tracking-wide mt-3 transform scale-1  hover:scale-105  hover:bg-indigo-600 transition duration-180 ease-in-out'
        }
        id={thisAnswer}
        onClick={() => selectAnswer(thisAnswer)}
      >
        {htmlDecode(thisAnswer)}
      </div>
    ); // end of return statement
  }
}
