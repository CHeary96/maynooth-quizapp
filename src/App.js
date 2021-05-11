import About from './Components/Pages/About';
import { Home } from './Components/Pages/Home';
import Register from './Components/Pages/Register';
import { SignIn } from './Components/Pages/SignIn';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GlobalProvider } from './context/GlobalState';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ImageMap } from './Components/ImageMap';
import QuizDashBoard from './Components/Pages/Dashboard';
import CreateQuiz from './Components/QuizComponents/CreateQuiz';
import CurrentQuiz from './Components/QuizComponents/CurrentQuiz';
import Results from './Components/QuizComponents/Results';


function App() {
  const [loggedInUser, setLoggedInUser] = useState('');

  // useEffect(() => {
  //   // firebase.auth().onAuthStateChanged(function (user) {
  //   //   setLoggedInUser(user);
  //   // });
  // }, []);

  return (
    <GlobalProvider>
      <div className="">
        <BrowserRouter>
          <Navbar></Navbar>
          <section className="">
            <Switch>
              <Route path="/ImageMap">
                <ImageMap />
              </Route>
              <Route path="/About">
                <About />
              </Route>
              <Route path="/Register">
                <Register />
              </Route>
              <Route path="/SignIn">
                <SignIn />
              </Route>
              <Route path="/QuizDashboard">
                <QuizDashBoard />
              </Route>
              <Route path="/CreateQuiz">
                <CreateQuiz />
              </Route>
              <Route path="/currentQuiz">
                <CurrentQuiz />
              </Route>
              <Route path="/results">
                <Results />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </section>
          <Footer></Footer>
        </BrowserRouter>
      </div>
    </GlobalProvider>
  );
}

export default App;
