import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import * as firebase from 'firebase/app';
import "firebase/auth";

import './App.css';

import Header from "./components/Header";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  let firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "dynamic-final.firebaseapp.com",
    databaseURL: "https://dynamic-final.firebaseio.com",
    projectId: "dynamic-final",
    storageBucket: "dynamic-final.appspot.com",
    messagingSenderId: "380304267255",
    appId: "1:380304267255:web:4d40ff39c670071d5b80f2"
  };
  function nameFunction(name, userId) {
    axios.get(`/api/create-user?name=${name}&userId=${userId}`)
        .then(function(response) {
            console.log("it's working my gggg", response);
            return response;
        })
        .catch(function(error) {
            console.log("error", error);
            return error;
        })
  }
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
  }, [firebaseConfig])

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setLoggedIn(true);
        setUser(user);
        setLoading(false);
        // console.log("heyyyyaya", user);
      } else {
        // No user is signed in.
        setLoggedIn(false);
        setUser({});
        setLoading(false);
        // console.log("heyyyyaya", user);
      }
    });
  }, [])

  function signupFunction(e) {
    e.preventDefault();

    let email = e.currentTarget.createEmail.value;
    let password = e.currentTarget.createPassword.value;
    let name = e.currentTarget.createName.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function(response) {
        console.log(response);
        setLoggedIn(true);
        nameFunction(name, response.user.uid);
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
          <Feed user={user}/>
        </Route>
        <Route exact path="/profile">
          {!loading && loggedIn ? <UserProfile user={user} /> : <Login loginFunction={loginFunction}/> }
        </Route>
        <Route exact path="/signup">
          {!loading && loggedIn ? <Redirect to="/" /> : <Signup signupFunction={signupFunction} /> }
        </Route>
        <Route exact path="/login">
          {!loading && loggedIn ? <Redirect to="/" /> : <Login loginFunction={loginFunction}/> }
        </Route>
      </Router>
    </div>
  );
}

export default App;
