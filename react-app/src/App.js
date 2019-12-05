import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import * as firebase from 'firebase/app';
import "firebase/auth";

import './App.css';

import Header from "./components/Header";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

let firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "exercise-five-e7ed8.firebaseapp.com",
  databaseURL: "https://exercise-five-e7ed8.firebaseio.com",
  projectId: "exercise-five-e7ed8",
  storageBucket: "exercise-five-e7ed8.appspot.com",
  messagingSenderId: "806229689552",
  appId: "1:806229689552:web:ee55aebb11119943b3cad5"
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    //initialize firebase
    if(!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .catch(function(error) {
        console.log('error', error);
      });
  }, [])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setLoggedIn(true);
        setUser(user);
      } else {
        // No user is signed in.
        setLoggedIn(false);
        setUser({});
      }
    });
  }, [])

  function signupFunction(e) {
    e.preventDefault();

    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log('error', error);       
    });
  }

  function loginFunction(e) {
    e.preventDefault();
    let email = e.currentTarget.loginEmail.value;
    let password = e.currentTarget.loginPassword.value;
    
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(response) {
        setLoggedIn(true);
      })
      .catch(function(error) {
        console.log('error', error);       
    });
  }

  function logoutFunction() {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        setLoggedIn(false);
      })
      .catch(function(error) {
        console.log('error', error);
      });
  }
  
  return (
    <div className="App">
      <Header loggedIn={loggedIn} logoutFunction={logoutFunction}/>
      <Router>
        <Route exact path="/">
          <Feed />
        </Route>
        <Route exact path="/profile">
          { loggedIn ? <UserProfile user={user} /> : <Redirect to="/login" /> }
        </Route>
        <Route exact path="/signup">
          { loggedIn ? <Redirect to="/" /> : <Signup signupFunction={signupFunction} /> }
        </Route>
        <Route exact path="/login">
          { loggedIn ? <Redirect to="/" /> : <Login loginFunction={loginFunction}/> }
        </Route>
      </Router>
    </div>
  );
}

export default App;
