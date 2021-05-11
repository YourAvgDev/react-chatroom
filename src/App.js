import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Channel from "./components/Channel";
import Header from "./components/Header";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./App.css";

firebase.initializeApp({
  apiKey: "AIzaSyDSv6qHzaRD0U1vkk6Osn0lNFSu6cTSUi4",
  authDomain: "react-chatroom-c7ef7.firebaseapp.com",
  projectId: "react-chatroom-c7ef7",
  storageBucket: "react-chatroom-c7ef7.appspot.com",
  messagingSenderId: "474147204325",
  appId: "1:474147204325:web:70cbd153b03967c65d780c",
});

const db = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user, setUser] = useState(() => firebase.auth.currentUser);
  // const [initializing, setInitializing] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // if(initializing)
    //   setInitializing(false);

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };

  // const signOut = async() =>{
  //   try{
  //     await auth.signOut();
  //   }
  //   catch(err){
  //     console.log(err.message);
  //   }
  // };

  // if(initializing) return "Loading...";
  return (
    <div>
      <Header auth={auth} user={user} />
      {user ? (
        <div>
          {/* <Button onClick={signOut}>Sign out</Button> */}
          <Channel user={user} db={db}></Channel>
        </div>
      ) : (
        <div>
          <Typography
            className="app-header"
            align="center"
            color="primary"
            variant="h4"
          >
            Welcome to ChatRoom
          </Typography>
          <Typography
            className="app-bodytext"
            varient="body2"
            align="center"
            color="textSecondary"
          >
            This is a simple chatroom application built in React and Firebase
            with some Material UI. Click Below to login with your google
            account. Do write some reviews.
          </Typography>
          <div className="container">
            <Button
              onClick={signInWithGoogle}
              variant="outlined"
              color="primary"
              size="medium"
            >
              Sign In With Google
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
