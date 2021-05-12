import React, { useEffect, useState, useRef } from "react";
import firebase from "firebase/app";
import Message from "./Message";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import "../App.css";
const Channel = ({ user = null, db = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { uid, displayName, photoURL } = user;
  const dummy = useRef();
  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMessages(data);
        });

      return unsubscribe;
    }
  }, [db]);
  const handleOnChange = (e) => {
    setNewMessage(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });

      setNewMessage("");
    }
  };
  useEffect(() => {
    if (messages) {
      const scrollDown = () =>
        dummy.current.scrollIntoView({ behavior: "smooth" });
      return scrollDown();
    }
  }, [messages]);

  return (
    <div>
      <Container maxWidth="sm" className="channel-container">
        <div>
          {messages.map((message) => (
            <div key={message.id} className="channel-message">
              <Message {...message} />
            </div>
          ))}
          <div ref={dummy}></div>
        </div>
      </Container>
      <form
        onSubmit={handleOnSubmit}
        className="channel-form"
        autoComplete="off"
      >
        <TextField
          className="channel-text"
          id="standard-basic"
          type="text"
          value={newMessage}
          onChange={handleOnChange}
          placeholder="Type your message here"
        />
        <IconButton type="submit" disabled={!newMessage}>
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};

export default Channel;
