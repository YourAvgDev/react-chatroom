import React, { useState, useEffect } from "react";

import Channel from "./components/Channel";
import Header from "./components/Header";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import firebase from "./firebase";

import "./App.css";

const db = firebase.firestore();
const auth = firebase.auth();

function App() {
  const [user, setUser] = useState(() => firebase.auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

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

  return (
    <div>
      <Header auth={auth} user={user} />
      {user ? (
        <div>
          <Channel user={user} db={db}></Channel>
        </div>
      ) : (
        <div className="app-content">
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
