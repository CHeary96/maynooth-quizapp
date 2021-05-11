import React, { useState, useContext } from 'react';
import { shuffle } from './utils';
import PropTypes from 'prop-types';
import { CATEGORIES, DIFFICULTY, QUESTIONS_TYPE } from './Constants';
import { Link, useHistory } from 'react-router-dom';
import { Item, Dropdown, Button, Message, Input } from 'semantic-ui-react';
import { GlobalContext } from '../../context/GlobalState';
import { countiesOfIrelandArray } from '../countiesOfIrelandArray'; //for image round

///context will be helpful for this part
export var questionArray = [];
export var questionsNumber = 0;
export var roundsNumber = 0;
export var questionTime = 0;
export var imageRound = false;

export function ShowCreateQuiz() {
  const [updater, updateScreen] = useState(null); // this is a cheat, to update values with a state change
  const [numOfRounds, setNumOfRounds] = useState(1);
  const [numOfQuestions, setNumOfQuestions] = useState(1);
  const [countdownTime, setCountdownTime] = useState(10);
  const [quizPassword, setQuizPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [offline, setOffline] = useState(false);
  const [helpInfo, showHelp] = useState(false);
  const { addQuiz, user, globalError, newError } = useContext(GlobalContext);

  //round categories -0, difficulties - 0, and type -2
  const [roundSettings, setRoundSettings] = useState([]);
  //create the object and push it to the settings array
  for (var r = 0; r < 10; r++) {
    var round = {
      category: null,
      difficulty: null,
      type: null,
      custom: false,
      categoryCustom: 'Custom',
      imageRound: false,
      customCurrent: 0,
      customQuestions: [],
    };
    roundSettings.push(round);
    for (var q = 0; q < 20; q++) {
      var question = {
        category: '0',
        correct_answer: '',
        difficulty: '0',
        incorrect_answers: ['', '', ''],
        question: '',
        type: '0',
      };
      roundSettings[r].customQuestions.push(question);
    }
  }
  //making sure the quiz can be sent only if it is filled out correctly
  let roundFilled = 0;
  let allFieldsSelected = false;
  for (var i = 0; i < numOfRounds; i++) {
    if (
      roundSettings[i].custom === false &&
      roundSettings[i].category &&
      roundSettings[i].difficulty &&
      roundSettings[i].type
    ) {
      roundFilled++;
    } else if (roundSettings[i].custom === true) {
      //check if there is at least a question and an answer
      let customFilled = 0;
      for (var j = 0; j < numOfQuestions; j++) {
        if (
          roundSettings[i].customQuestions[j].question.length > 0 &&
          roundSettings[i].customQuestions[j].correct_answer.length > 0
        )
          customFilled++;
      }
      if (customFilled === numOfQuestions) {
        roundFilled++;
      }
    } else {
      roundFilled--;
    }
  }
  if (roundFilled === numOfRounds) {
    allFieldsSelected = true;
  }

  const fetchData = () => {
    setProcessing(true);
    if (error) setError(null);

    var allQuestions = [];

    for (var q = 0; q < numOfRounds; q++) {
      const API = `https://opentdb.com/api.php?amount=${numOfQuestions}&category=${roundSettings[q].category}&difficulty=${roundSettings[q].difficulty}&type=${roundSettings[q].type}`;

      fetch(API)
        .then((respone) => respone.json())
        .then((data) =>
          setTimeout(() => {
            const { response_code, results } = data;

            if (response_code === 1) {
              const message = (
                <p>
                  The API doesn't have enough questions for your query. (Ex.
                  Asking for 50 Questions in a Category that only has 20.)
                  <br />
                  <br />
                  Please change the <strong>No. of Questions</strong>,{' '}
                  <strong>Difficulty Level</strong>, or{' '}
                  <strong>Type of Questions</strong>.
                </p>
              );

              setProcessing(false);
              setError({ message });

              return;
            }

            results.forEach((element) => {
              element.answers = shuffle([
                element.correct_answer,
                ...element.incorrect_answers,
              ]);
            });

            for (var i = 0; i < results.length; i++) {
              allQuestions.push(results[i]);
            }

            setProcessing(false);
            //start the quiz when the number of questions equals what was requested
            if (allQuestions.length === numOfQuestions * numOfRounds) {
              //set the answers for image rounds here, and put in the correct answer now!
              for (var x = 0; x < numOfRounds; x++) {
                if (roundSettings[x].imageRound === true) {
                  //we only change the correct answer and the question
                  var image = Math.floor(Math.random() * 32); //pick a random answer from our image map
                  allQuestions[numOfQuestions * (x + 1) - 1].question =
                    countiesOfIrelandArray[image].question;
                  allQuestions[numOfQuestions * (x + 1) - 1].correct_answer =
                    countiesOfIrelandArray[image].answer;
                  allQuestions[numOfQuestions * (x + 1) - 1].category =
                    'Image Round';
                  allQuestions[numOfQuestions * (x + 1) - 1].type =
                    'IMAGE_ROUND';
                }
              }
              //set custom rounds here! Placing them inside like this puts them in the correct order.
              //doing this outside the API call made the custom answers go out of founr order - LF
              for (var x = 0; x < numOfRounds; x++) {
                if (roundSettings[x].custom === true) {
                  //we only change the answers and the question
                  var customQ = roundSettings[x].customQuestions;
                  for (
                    var y = numOfQuestions * x;
                    y < numOfQuestions * (x + 1);
                    y++
                  ) {
                    allQuestions[y].question =
                      customQ[y % numOfQuestions].question;
                    allQuestions[y].correct_answer =
                      customQ[y % numOfQuestions].correct_answer;
                    allQuestions[y].incorrect_answers =
                      customQ[y % numOfQuestions].incorrect_answers;
                    allQuestions[y].category = roundSettings[x].categoryCustom;
                    allQuestions[y].type = 'Custom';
                    allQuestions[y].answers = [];

                    //the order here is important. Start from the back so as not to change the order as you remove empty answers
                    if (
                      customQ[y % numOfQuestions].incorrect_answers[2] === ''
                    ) {
                      customQ[y % numOfQuestions].incorrect_answers.splice(
                        2,
                        1
                      );
                    }
                    if (
                      customQ[y % numOfQuestions].incorrect_answers[1] === ''
                    ) {
                      customQ[y % numOfQuestions].incorrect_answers.splice(
                        1,
                        1
                      );
                    }
                    if (
                      customQ[y % numOfQuestions].incorrect_answers[0] === ''
                    ) {
                      customQ[y % numOfQuestions].incorrect_answers.splice(
                        0,
                        1
                      );
                    }

                    //shuffle remaining answers
                    var answersShuffled = shuffle([
                      customQ[y % numOfQuestions].correct_answer,
                      ...customQ[y % numOfQuestions].incorrect_answers,
                    ]);
                    allQuestions[y].answers = [...answersShuffled];
                  }
                }
              }

                           const answers = allQuestions.map((q) => {
                return q.correct_answer;
              });
              //startQuiz(allQuestions, countdownTime);
              if (quizPassword.length > 5) {
                addQuiz(
                  allQuestions,
                  countdownTime,
                  user.email,
                  numOfRounds,
                  numOfQuestions,
                  countdownTime,
                  answers,
                  quizPassword
                );
                history.push('/');
              } else {
                newError('You need to enter a password!');
              }
            }
          }, 1000)
        )
        .catch((error) =>
          setTimeout(() => {
            if (!navigator.onLine) {
              setOffline(true);
            } else {
              setProcessing(false);
              setError(error);
            }
          }, 1000)
        );
    }
    //start the quiz when the number of questions equals what was requested
    if (allQuestions.length >= numOfQuestions * numOfRounds) {
      console.log(allQuestions);
      startQuiz(allQuestions, countdownTime);
    }
  };

  const history = useHistory();
  //if (offline) return <Offline />;
  function startQuiz(results, countdownTime) {
    questionArray = [];
    questionArray = questionArray.concat(results);
    roundsNumber = numOfRounds;
    questionsNumber = results.length;
    questionTime = countdownTime;
    history.push('/currentQuiz');
  }

  var rounds = new Array(numOfRounds).fill(0);
  //changing the round's settings
  function setThisCategory(value, num) {
    roundSettings[num].category = value;
    updateScreen(value + Math.random() * 1000); //this, for some reason, updates the changes in the round. State changes are easy ways to update changes! - LF
  }
  function setThisDifficulty(value, num) {
    roundSettings[num].difficulty = value;
    updateScreen(value + Math.random() * 1000); //this, for some reason, updates the changes like above
  }
  function setThisQuestionsType(value, num) {
    roundSettings[num].type = value;
    updateScreen(value + Math.random() * 1000); //this, for some reason, updates the changes like above
  }
  function setNumberOfQuestions(num) {
    var newNum = numOfQuestions;
    if (num === '+' && numOfQuestions < 20) {
      setNumOfQuestions(++newNum);
    }
    if (num === '-' && numOfQuestions > 1) {
      setNumOfQuestions(--newNum);
    }
    updateScreen(num + Math.random() * 1000);
  }
  function setNumberOfSeconds(num) {
    var newNum = countdownTime;
    if (countdownTime < 5) newNum = 5;
    if (num === '+' && countdownTime < 30) {
      setCountdownTime(++newNum);
    }
    if (num === '-' && countdownTime > 5) {
      setCountdownTime(--newNum);
    }
    updateScreen(num + Math.random() * 1000);
  }
  function setThisCustom(num) {
    //the check box to let us know if this is a custom round or not
    if (roundSettings[num].custom === true) {
      roundSettings[num].custom = false;
      roundSettings[num].category = null;
      roundSettings[num].difficulty = null;
      roundSettings[num].type = null;
      updateScreen(num + Math.random() * 1000);
    } else {
      roundSettings[num].custom = true;
      roundSettings[num].imageRound = false;
      roundSettings[num].category = 0;
      roundSettings[num].difficulty = 0;
      roundSettings[num].type = 0;
      updateScreen(num + Math.random() * 1000);
    }
    //this, for some reason, updates the changes like above
  }
  function setThisCustomQuestion(value, type, current, num) {
    //so this takes the value from the input box and sets the correct round's custom questions and answers to that value
    //using 'type' as a string like this saves on having multiple different functions, but theres probably an even cleaner way to do it - LF
    if (type === 'Question') {
      roundSettings[num].customQuestions[current].question = value;
    }
    if (type === 'Right') {
      roundSettings[num].customQuestions[current].correct_answer = value;
    }
    if (type === 'Wrong1') {
      roundSettings[num].customQuestions[current].incorrect_answers[0] = value;
    }
    if (type === 'Wrong2') {
      roundSettings[num].customQuestions[current].incorrect_answers[1] = value;
    }
    if (type === 'Wrong3') {
      roundSettings[num].customQuestions[current].incorrect_answers[2] = value;
    }

    updateScreen(value + Math.random() * 1000); //this, for some reason, updates the changes like above
  }

  function setThisCustomCategory(value, num) {
    //same as above, but sets the category for the whole round
    for (var i = 0; i < numOfQuestions; i++) {
      roundSettings[num].categoryCustom = value;
    }
    updateScreen(value + Math.random() * 1000); //this, for some reason, updates the changes like above
  }

  function setCurrentCustom(value, num) {
    //this lets us cycle between the current custom round's questions, much like adding seconds or questions to the quiz
    var newNum = roundSettings[num].customCurrent;
    if (
      value === '+' &&
      roundSettings[num].customCurrent < numOfQuestions - 1
    ) {
      ++newNum;
    }
    if (value === '-' && roundSettings[num].customCurrent > 0) {
      --newNum;
    }
    roundSettings[num].customCurrent = newNum;
    updateScreen(value + Math.random() * 1000);
  }

  function setThisImageRound(num) {
    //the check box to let us know if this is a custom round or not
    if (roundSettings[num].imageRound === true) {
      roundSettings[num].imageRound = false;
      updateScreen(num + Math.random() * 1000);
    } else {
      roundSettings[num].imageRound = true;
      updateScreen(num + Math.random() * 1000);
    }
    //this, for some reason, updates the changes like above
  }
  var size = 0;
  //setting up rounds
  var roundMap = rounds.map((current, i) => {
    ++i;
    var answerSize =
      'row-span-1 col-span-1 transform scale-90 bg-blue-600 uppercase text-lg text-white rounded-lg p-3 hover:bg-blue-500 transition duration-180 ease-in-out relative z-30';
    ++size;
    //this makes the final column of an odd number of answers stretch the full way, looks a little nicer
    //move two rounds over slightly, to centre them better.
    if (
      (((size % 3 === 2 && i === rounds.length) ||
        (size % 3 === 1 && i === rounds.length - 1)) &&
        roundSettings[i - 1].custom === false) ||
      (((size % 3 === 2 && i === rounds.length - 1) ||
        (size % 3 === 1 && i === rounds.length - 2)) &&
        roundSettings[rounds.length - 1].custom === true) ||
      (size % 3 === 2 &&
        i + 1 < rounds.length &&
        roundSettings[i].custom === true &&
        roundSettings[i - 1].custom === false) ||
      (size % 3 === 1 &&
        i + 2 < rounds.length &&
        roundSettings[i].custom === false &&
        roundSettings[i + 1].custom === true &&
        roundSettings[i - 1].custom === false)
    ) {
      answerSize =
        ' transform scale-90 bg-blue-600 uppercase text-lg text-white rounded-lg p-3 hover:bg-blue-500 transition duration-180 ease-in-out z-10 hover:z-50 ';
    }
    //move a single round on a row to middle
    if (
      (size % 3 === 1 &&
        i === rounds.length &&
        roundSettings[i - 1].custom === false) ||
      (size % 3 === 1 &&
        i + 1 < roundSettings.length &&
        roundSettings[i - 1].custom === false &&
        roundSettings[i].custom === true)
    ) {
      answerSize =
        'transform scale-90  bg-blue-600 uppercase text-lg text-white rounded-lg p-3 hover:bg-blue-500 transition duration-180 ease-in-out z-10 hover:z-50 ';
    }
    //if a custom round, expand to take up whole row
    if (roundSettings[i - 1].custom === true) {
      answerSize =
        'transform scale-90 bg-blue-600 uppercase text-lg text-white rounded-lg p-3 hover:bg-blue-500 transition duration-180 ease-in-out z-10 hover:z-50 ';
      size = 0; //this helps with the ordering of the rounds. essentially, it is telling the order to begin as if there is no rounds behind it.
    }
    return (
      <div key={i} className={answerSize}>
        Round {i}
        <hr />
        <Item.Group divided>
          <Item>
            <Item.Content>
              {error && (
                <Message error onDismiss={() => setError(null)}>
                  <Message.Header>Error!</Message.Header>
                  {error.message}
                </Message>
              )}
              <Item.Meta>
                <div
                  onClick={() => setThisCustom(i - 1)}
                  className={
                    roundSettings[i - 1].custom === false
                      ? 'flex cursor-pointer justify-center transform -translate-y-4 text-white bg-blue-800 py-3 rounded-full relative z-10 hover:bg-blue-600'
                      : 'flex cursor-pointer justify-center transform -translate-y-4 text-white bg-yellow-500 py-3 rounded-full relative z-10 hover:bg-yellow-400'
                  }
                >
                  Custom Round
                </div>
                <br />
                {
                  //if this is not a custom round, let the user select the usual random questions
                  !roundSettings[i - 1].custom && (
                    <div>
                      <div
                        onClick={() => setThisImageRound(i - 1)}
                        className={
                          roundSettings[i - 1].imageRound === false
                            ? 'flex cursor-pointer justify-center transform -translate-y-4 text-white bg-blue-800 py-3 rounded-full relative z-10 hover:bg-blue-600'
                            : 'flex cursor-pointer justify-center transform -translate-y-4 text-white bg-yellow-500 py-3 rounded-full relative z-10 hover:bg-yellow-400 '
                        }
                      >
                        Image Question
                      </div>
                      <Dropdown
                        fluid
                        selection
                        name="category"
                        placeholder="Select Quiz Category"
                        options={CATEGORIES}
                        value={roundSettings[i - 1].category}
                        onChange={(e, { value }) =>
                          setThisCategory(value, i - 1)
                        }
                        disabled={processing}
                      />
                      <br />
                      <Dropdown
                        fluid
                        selection
                        name="difficulty"
                        placeholder="Select Difficulty Level"
                        options={DIFFICULTY}
                        value={roundSettings[i - 1].difficulty}
                        onChange={(e, { value }) =>
                          setThisDifficulty(value, i - 1)
                        }
                        disabled={processing}
                      />
                      <br />
                      <Dropdown
                        fluid
                        selection
                        name="type"
                        placeholder="Select Questions Type"
                        options={QUESTIONS_TYPE}
                        value={roundSettings[i - 1].questionsType}
                        onChange={(e, { value }) =>
                          setThisQuestionsType(value, i - 1)
                        }
                        disabled={processing}
                      />
                      <br />
                    </div>
                  )
                }
                {
                  //if this IS a custom round, let the user make some questions
                  roundSettings[i - 1].custom && (
                    <div className="block justify-center transform -translate-y-6 text-white px-4 py-3 rounded-md relative z-40 ">
                      <Input
                        fluid
                        label="Category:"
                        value={roundSettings[i - 1].categoryCustom}
                        onChange={(e, { value }) =>
                          setThisCustomCategory(value, i - 1)
                        }
                        placeholder="Name this Round..."
                      />
                      <span />
                      <div className="block justify-center transform scale-100 -translate-y-2 text-white px-6 py-2 rounded-lg text-lg relative z-40">
                        <button
                          className="relative justify-center transform translate-x-3 scale-110 text-white py-1 px-5 rounded-l-full relative z-40 bg-yellow-400 hover:bg-yellow-600"
                          onClick={() => setCurrentCustom('-', i - 1)}
                        >
                          {' '}
                          -{' '}
                        </button>
                        <b className="relative items-center justify-center transform translate-y-4 scale-200 text-white py-3 px-4 rounded-full relative z-50 bg-blue-400 hover:bg-blue-600">
                          Question {roundSettings[i - 1].customCurrent + 1}
                        </b>
                        <button
                          className="relative justify-center transform -translate-x-3 scale-110 text-white py-1 px-5 rounded-r-full relative z-40 bg-yellow-400 hover:bg-yellow-600"
                          onClick={() => setCurrentCustom('+', i - 1)}
                        >
                          {' '}
                          +{' '}
                        </button>
                      </div>
                      <Input
                        fluid
                        label="Question:"
                        value={
                          roundSettings[i - 1].customQuestions[
                            roundSettings[i - 1].customCurrent
                          ].question
                        }
                        onChange={(e, { value }) =>
                          setThisCustomQuestion(
                            value,
                            'Question',
                            roundSettings[i - 1].customCurrent,
                            i - 1
                          )
                        }
                        placeholder="What do you want to ask?"
                      />
                      <br />
                      <Input
                        fluid
                        label="Right:"
                        value={
                          roundSettings[i - 1].customQuestions[
                            roundSettings[i - 1].customCurrent
                          ].correct_answer
                        }
                        onChange={(e, { value }) =>
                          setThisCustomQuestion(
                            value,
                            'Right',
                            roundSettings[i - 1].customCurrent,
                            i - 1
                          )
                        }
                        placeholder="The correct answer."
                      />
                      <hr className="transform translate-y-2 py-2" />
                      <Input
                        fluid
                        label="Wrong:"
                        value={
                          roundSettings[i - 1].customQuestions[
                            roundSettings[i - 1].customCurrent
                          ].incorrect_answers[0]
                        }
                        onChange={(e, { value }) =>
                          setThisCustomQuestion(
                            value,
                            'Wrong1',
                            roundSettings[i - 1].customCurrent,
                            i - 1
                          )
                        }
                        placeholder="A wrong answer. Fill in at least one."
                      />
                      <Input
                        fluid
                        label="Wrong:"
                        value={
                          roundSettings[i - 1].customQuestions[
                            roundSettings[i - 1].customCurrent
                          ].incorrect_answers[1]
                        }
                        onChange={(e, { value }) =>
                          setThisCustomQuestion(
                            value,
                            'Wrong2',
                            roundSettings[i - 1].customCurrent,
                            i - 1
                          )
                        }
                        placeholder="Another wrong answer."
                      />
                      <Input
                        fluid
                        label="Wrong:"
                        value={
                          roundSettings[i - 1].customQuestions[
                            roundSettings[i - 1].customCurrent
                          ].incorrect_answers[2]
                        }
                        onChange={(e, { value }) =>
                          setThisCustomQuestion(
                            value,
                            'Wrong3',
                            roundSettings[i - 1].customCurrent,
                            i - 1
                          )
                        }
                        placeholder="The final wrong answer."
                      />
                    </div>
                  )
                }
              </Item.Meta>
            </Item.Content>
          </Item>
        </Item.Group>
      </div>
    );
  });

  return (
    <div className="my-24 mx-4 ">
      <div className=" -mt-60 pt-60 w-5/6 flex justify-center ">
        <h1 className="font-semibold text-7xl p-2 rounded text-white bg-gradient-to-r from-green-400 via-blue-500 to-red-500 shadow-lg">
          {' '}
          Create
        </h1>
      </div>

      <div className="w-full flex justify-center">
        <h1 className="font-bold text-white text-7xl p-2 rounded bg-gradient-to-r from-blue-400 via-green-500 to-indigo-500 shadow-xl">
          Quiz
        </h1>
      </div>
      <div className="block justify-center transform scale-100 translate-y-6 text-white px-6 py-2 rounded-lg text-lg relative z-40">
        <Item.Group divided>
          <div className="flex justify-center">
            <div className="block justify-center transform scale-100 translate-y-6 text-white px-6 py-2 rounded-lg text-lg relative z-40">
              <p className="block justify-center transform -translate-x-6">
                {' '}
                Questions per Round:{' '}
              </p>
              <br />
              <button
                className="relative cursor-pointer justify-center transform translate-x-2 scale-110 text-white py-1 px-5 rounded-l-full relative z-40 bg-blue-600 hover:bg-blue-700"
                onClick={() => setNumberOfQuestions('-')}
              >
                {' '}
                -{' '}
              </button>
              <b className="relative items-center justify-center transform translate-y-4 scale-200 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500">
                {numOfQuestions}
              </b>
              <button
                className="relative cursor-pointer justify-center transform -translate-x-4 scale-110 text-white py-1 px-5 rounded-r-full relative z-40 bg-blue-600 hover:bg-blue-700"
                onClick={() => setNumberOfQuestions('+')}
              >
                {' '}
                +{' '}
              </button>
            </div>

            <div className="block justify-center transform scale-100 translate-y-6 text-white px-6 py-2 rounded-lg text-lg relative z-40">
              <p className="block justify-center transform -translate-x-6">
                Seconds per Question:{' '}
              </p>
              <br />
              <button
                className="relative cursor-pointer justify-center transform translate-x-2 scale-110 text-white py-1 px-5 rounded-l-full relative z-40 bg-blue-600 hover:bg-blue-700"
                onClick={() => setNumberOfSeconds('-')}
              >
                {' '}
                -{' '}
              </button>
              <b className="relative items-center justify-center transform translate-y-4 scale-200 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500">
                {countdownTime}
              </b>
              <button
                className="relative cursor-pointer justify-center transform -translate-x-3 scale-110 text-white py-1 px-5 rounded-r-full relative z-40 bg-blue-600 hover:bg-blue-700"
                onClick={() => setNumberOfSeconds('+')}
              >
                {' '}
                +{' '}
              </button>
            </div>
          </div>
          <div className="flex justify-center z-50">
            <p className="block justify-center transform -translate-x-3 translate-y-8">
              Number of Rounds:{' '}
            </p>
          </div>
          <div className="flex justify-center transform translate-y-4 scale-100 text-white px-6 py-2 rounded-lg text-lg relative z-40">
            <button
              className={
                numOfRounds === 1
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(1)}
            >
              {' '}
              1
            </button>
            <button
              className={
                numOfRounds === 2
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(2)}
            >
              {' '}
              2
            </button>
            <button
              className={
                numOfRounds === 3
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(3)}
            >
              {' '}
              3
            </button>
            <button
              className={
                numOfRounds === 4
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(4)}
            >
              4
            </button>
            <button
              className={
                numOfRounds === 5
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(5)}
            >
              {' '}
              5
            </button>
            <button
              className={
                numOfRounds === 6
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(6)}
            >
              6
            </button>
            <button
              className={
                numOfRounds === 7
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(7)}
            >
              {' '}
              7
            </button>
            <button
              className={
                numOfRounds === 8
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(8)}
            >
              8
            </button>
            <button
              className={
                numOfRounds === 9
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(9)}
            >
              {' '}
              9
            </button>
            <button
              className={
                numOfRounds === 10
                  ? 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-yellow-400 hover:bg-yellow-500'
                  : 'relative cursor-pointer justify-center transform translate-y-4 mx-1 text-white py-3 px-4 rounded-full relative z-50 bg-blue-600 hover:bg-blue-700'
              }
              onClick={() => setNumOfRounds(10)}
            >
              10
            </button>
          </div>
          <div className="flex flex-col justify-center items-center z-50">
            <h2 className="my-2 pt-10 justify-center ">Quiz Password</h2>
            <input
              onChange={({ target }) => setQuizPassword(target.value)}
              type="text"
              minLength="5"
              name="password"
              id="password"
              placeholder="password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 "
              required
            />
            {globalError && (
              <>
                <div className="flex items-center justify-center px-4 lg:px-0 py-12">
                  <div
                    id="alert"
                    className="transition duration-150 ease-in-out lg:w-11/12 mx-auto py-3 px-4  dark:bg-gray-800 bg-red-800 md:flex items-center justify-between shadow rounded "
                  >
                    <div className="sm:flex sm:items-start lg:items-center">
                      <div className="flex items-end">
                        <div className="mr-2 text-red-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={20}
                            height={20}
                            fill="currentColor"
                          >
                            <path
                              className="heroicon-ui"
                              d="M4.93 19.07A10 10 0 1 1 19.07 4.93 10 10 0 0 1 4.93 19.07zm1.41-1.41A8 8 0 1 0 17.66 6.34 8 8 0 0 0 6.34 17.66zM13.41 12l1.42 1.41a1 1 0 1 1-1.42 1.42L12 13.4l-1.41 1.42a1 1 0 1 1-1.42-1.42L10.6 12l-1.42-1.41a1 1 0 1 1 1.42-1.42L12 10.6l1.41-1.42a1 1 0 1 1 1.42 1.42L13.4 12z"
                            />
                          </svg>
                        </div>
                        <p className="mr-2 text-sm lg:text-base font-bold text-white dark:text-gray-100">
                          Error
                        </p>
                      </div>
                      <div className="h-1 w-1 bg-gray-300 dark:bg-gray-700 rounded-full mr-2 hidden xl:block" />
                      <p className="text-sm lg:text-base text-white pt-2 sm:pt-0 pb-2 sm:pb-0">
                        {globalError}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <span></span>
            {/*the help section, just to explain the quiz creation to new users*/}
            <div className="relative justify-center transform scale-50 text-white px-6 py-2 rounded-lg text-lg  z-40">
              <b className="relative items-center justify-center transform -translate-y-4 scale-200 text-white py-4 px-2 rounded-full relative z-50 bg-blue-100">
                <b
                  onClick={() => showHelp(true)}
                  className="relative cursor-pointer items-center justify-center transform -translate-y-4 scale-300 text-white py-2 px-4 rounded-full relative z-50 bg-blue-400 hover:bg-blue-500"
                >
                  ?
                </b>
              </b>
            </div>
            <div
              className={
                helpInfo === true
                  ? 'absolute justify-center transform scale-75 text-white px-8 py-4 rounded-lg text-md z-40 bg-blue-400 opacity-100 transition duration-200 ease-in-out'
                  : 'absolute justify-center transform scale-0 text-white px-8 py-4 rounded-lg text-md z-40 bg-blue-300 opacity-0 transition duration-200 ease-in-out'
              }
            >
              <div
                onClick={() => showHelp(false)}
                className="cursor-pointer absolute justify-center transform -translate-x-16 -translate-y-8 text-white py-2 px-4 rounded-full z-50"
              >
                <span
                  onClick={() => showHelp(false)}
                  className="cursor-pointer items-center justify-center transform translate-x-full scale-75 text-white py-2 px-4 rounded-full z-50 bg-blue-500 hover:bg-red-500"
                >
                  X
                </span>
              </div>
              <b>Welcome to the Quiz Creator!</b>
              <br />
              Here is a quick run-down of the controls:
              <br />
              <br />
              Toggle the '+' and '-' buttons to increase the number of questions
              per round, and the number of seconds you have to answer each
              question.
              <br />
              Click on the numbered bubbles to select that number of rounds for
              each quiz. This will add an option to set-up for that number of
              rounds.
              <br />
              <br /> The Category, Difficulty and Question Type menus allow you
              to choose various options to customise your quiz.
              <br />
              For example, a round with the 'History' category would be
              generated from random History questions, and so on.
              <br />
              <br />
              Click on the 'Custom Round' bubble to make your own questions for
              the round. No need to fill out all the wrong answers!
              <br /> Each custom round has the same number of questions set
              above, and these can be checked and changed using the '+' and '-'
              buttons.
              <br />
              You can even give your custom questions they're own custom round
              name by changing the 'Category' box.
              <br />
              But remember, you need to fill in every Question and Correct
              Answer to save your quiz.
              <br />
              <br /> 'Image Question' adds a special image question as the last
              question in a round!
              <br />
              <br /> Enter a password into the 'Quiz Password' box. This will be
              the key to your quiz, and will allow you and your friends to play
              togehter!
              <br />
              <br /> Enjoy making and playing your own quizzes!
              <br />
            </div>
          </div>
        </Item.Group>

        <div className={'w-full flex flex-wrap justify-center items-center'}>
          {roundMap}
        </div>
      </div>
      <div
        className={
          'flex cursor-pointer justify-center transform scale-125 translate-y-6 text-white py-8 text-lg relative z-10'
        }
      >
        <Button
          primary
          size="big"
          icon="play"
          labelPosition="left"
          content={processing ? 'Processing...' : 'Play Now'}
          onClick={fetchData}
          disabled={!allFieldsSelected || processing}
        />
      </div>
    </div>
  );
}

ShowCreateQuiz.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};
