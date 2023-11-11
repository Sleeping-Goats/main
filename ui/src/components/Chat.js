import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import logo from "../assets/goat.png";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

const Chat = () => {
  const [chatting, setChatting] = useState(true);

  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ file: Chat.js:17 ~ Chat ~ messages:", messages);

  // Example of adding a new message (you might get these from an API or user input)
  useEffect(() => {
    const newMessage = {
      message: "Hello, this is a test message!",
      sentTime: "just now",
      sender: "Joe",
    };
    setMessages([...messages, newMessage]);
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleSendMessage = (newMessage) => {
    const messageObject = {
      message: newMessage, // the message text
      sentTime: new Date().toLocaleTimeString(), // current time
      sender: "User", // hardcoded sender name, you can change this based on your application's logic
    };
    console.log(
      "🚀 ~ file: Chat.js:34 ~ handleSendMessage ~ messageObject:",
      messageObject
    );

    setMessages((messages) => [...messages, messageObject]); // Update the messages array
  };
  return chatting ? (
    <Box>
      <Box height={10} />
      <Typography variant="h4">Sleeping Goats Chat</Typography>
      <Box>
        <img src={logo} width={200} alt="logo" />
      </Box>
      <Typography variant="h5">Wake up the Goat! ⏰</Typography>

      <Box height={20} />
      <Button onClick={() => setChatting(false)} variant="contained">
        Start
      </Button>
    </Box>
  ) : (
    <Box>
      <Box height={20} />
      <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((msg, index) => (
                <Message
                  avata
                  key={index}
                  model={{
                    message: msg.message,
                    sentTime: msg.sentTime,
                    sender: msg.sender,
                  }}
                >
                  <Avatar src={logo} name={"Goat"} />
                </Message>
              ))}
            </MessageList>

            <MessageInput
              placeholder="Type message here"
              onSend={handleSendMessage}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </Box>
  );
};

export default Chat;
