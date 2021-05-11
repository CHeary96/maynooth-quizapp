import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { auth, firebase, db } from '../firebase';
import { useHistory } from 'react-router-dom';

// Setup initial state
const initialState = {
  user: null,
  quizPassword: null,
  quiz: {
    questionArray: [],
    questionsNumber: null,
    questionTime: null,
    roundsNumber: null,
  },
  currentPlayer: null,
  results: [],
  globalError: '',
  usersQuizzes: [],
};

// Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addUser = async (email, password) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });

    dispatch({
      type: 'ADD_USER',
    });
  };
  const logOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });

    dispatch({
      type: 'LOGOUT',
    });
  };

  const signInUser = async (email, password) => {
    let user;

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        user = userCredential.user;

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        console.log(errorCode);
      });
    dispatch({
      type: 'LOGIN_USER',
      payload: user,
    });
  };

  const resetPassword = (email) => {
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
        console.log(error);
      });
  };

  const addQuiz = async (
    questions,
    countdownTime,
    email,
    noRounds,
    noQuestions,
    time,
    answers,
    password
  ) => {
    await db.collection('quizzes').add({
      questions,
      countdownTime,
      user: email,
      password,
      noRounds,
      noQuestions,
      time,
      answers,
    });
  };

  const findQuiz = async (password, player) => {
    // Create a reference to the cities collection
    const quizRef = db.collection('quizzes');
    const playerRef = db.collection('players');

    // Create a query against the collection
    const quiz = await quizRef.where('password', '==', password).get();

    if (quiz.empty) {
      console.log('No matching documents.');
      return;
    }
    let data;
    let quizID;
    let playerID;
    quiz.forEach(async (doc) => {
      quizID = doc.id;
      data = doc.data();
    });

    await playerRef.add({ player, quizID }).then((playerDoc) => {
      playerID = playerDoc.id;
    });

    dispatch({
      type: 'LOAD_QUIZ',
      payload: data,
    });
    dispatch({
      type: 'ADD_PLAYER',
      payload: playerID,
    });
    dispatch({
      type: 'ADD_QUIZ_PW',
      payload: password,
    });
  };

  const setQuizPassword = (password) => {
    dispatch({
      type: 'ADD_QUIZ_PW',
      payload: password,
    });
  };

  const addAnswers = async (answersArray, playerID) => {
    const playerRef = await db
      .collection('players')
      .doc(playerID)
      .update({ answers: answersArray });
  };
  const addAnswersEnd = async (answersArray, playerID, score) => {
    const playerRef = await db
      .collection('players')
      .doc(playerID)
      .update({ answers: answersArray, score });
  };

  const getResults = async (password) => {
    // Create a reference to the cities collection
    const quizRef = db.collection('quizzes');
    const playerRef = db.collection('players');

    // Create a query against the collection
    const quiz = await quizRef.where('password', '==', password).get();

    if (quiz.empty) {
      console.log('No matching documents.');
      return;
    }
    let data = [];
    let quizID;
    let playerID;
    quiz.forEach((doc) => {
      quizID = doc.id;
    });

    const players = await playerRef.where('quizID', '==', quizID).get();
    players.forEach((doc) => {
      data.push(doc.data());
    });

    dispatch({
      type: 'ADD_RESULTS',
      payload: data,
    });
  };

  const getUsersQuizzes = async (email) => {
    // Create a reference to the cities collection
    const quizRef = db.collection('quizzes');

    // Create a query against the collection
    const quiz = await quizRef.where('user', '==', email).get();

    if (quiz.empty) {
      console.log('No matching documents.');
      return;
    }

    let quizArray = [];
    quiz.forEach((doc) => {
      quizArray.push(doc.data());
    });

    dispatch({
      type: 'LOAD_USER_QUIZZES',
      payload: quizArray,
    });
  };

  const newError = (message) => {
    dispatch({
      type: 'NEW_ERROR',
      payload: message,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        user: state.user,
        quiz: state.quiz,
        quizPassword: state.quizPassword,
        currentPlayer: state.currentPlayer,
        results: state.results,
        usersQuizzes: state.usersQuizzes,
        globalError: state.globalError,
        addUser,
        signInUser,
        resetPassword,
        addQuiz,
        findQuiz,
        addAnswers,
        addAnswersEnd,
        getResults,
        newError,
        getUsersQuizzes,
        logOut,
        setQuizPassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
