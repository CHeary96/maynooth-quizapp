// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: null,
      };
    case 'LOGIN_USER':
      return { ...state, user: action.payload };
    case 'LOAD_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'ADD_QUIZ_PW':
      return { ...state, quizPassword: action.payload };
    case 'ADD_PLAYER':
      return { ...state, currentPlayer: action.payload };
    case 'ADD_RESULTS':
      return { ...state, results: action.payload };
    case 'NEW_ERROR':
      return { ...state, globalError: action.payload };
    case 'LOAD_USER_QUIZZES':
      return { ...state, usersQuizzes: action.payload };
    case 'LOGOUT':
      return {
        ...state,
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
    case 'LOAD_QUIZ':
      return {
        ...state,
        quiz: {
          ...state.quiz,
          questionArray: action.payload.questions,
          questionsNumber: action.payload.noQuestions,
          questionTime: action.payload.countdownTime,
          roundsNumber: action.payload.noRounds,
          answers: action.payload.answers,
        },
      };
    default:
      return state;
  }
};
