import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../assets/goat.png";
import AIResponse from "./AIResponse";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const Chat = () => {
  const [chatting, setChatting] = useState(true);

  const [messages, setMessages] = useState([]);
  console.log("🚀 ~ file: Chat.js:17 ~ Chat ~ messages:", messages);

  useEffect(() => {
    const newMessage = {
      message: "Hello! Ask this GOAT anything that comes to your mind!",
      sentTime: "just now",
      sender: "Goat",
    };

    setMessages((messages) => [...messages, newMessage]);
  }, []);

  const handleSendMessage = (newMessage) => {
    const messageObject = {
      message: newMessage,

      sentTime: new Date().toLocaleTimeString(),
      sender: "Goat",
      direction: "outgoing",
      position: "single",
    };

    // Call AI that parses the message and gives a response
    // Now it's only cocktails
    const AIResponseObject = AIResponse(newMessage);

    if (messageObject.message)
      setMessages((messages) => [...messages, messageObject]);
    if (AIResponseObject.message)
      setMessages((messages) => [...messages, AIResponseObject]);
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
      <div style={{ position: "relative", height: "89vh" }}>
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
                    direction: msg.direction,
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
