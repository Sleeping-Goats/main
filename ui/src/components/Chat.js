import {
  Avatar,
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slider,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../assets/goat.png";
import AIResponse from "./AIResponse";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Textarea } from "@mui/joy";
import DeleteIcon from "@mui/icons-material/Delete";
import person from "../assets/person.png";
import axios from "axios";

const Chat = () => {
  const [chatting, setChatting] = useState(true);

  const [messages, setMessages] = useState([]);
  const [keywords, setKeywords] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [userWords, setUserWords] = useState([]);
  const onChangeKeywords = (event) => {
    setKeywords(event.target.value);
    console.log(keywords);
  };

  const sendReq = async () => {
    console.log("asdasdasdasds");
    // setUserMessages(messages.filter((msg) => msg.sender === "User"));
    // .flatMap((msg) => msg.message.split(/\s+/));

    console.log("usermessages", userMessages);

    console.log('userwords', userWords)
    // let result = await axios.post('/api/new/predict', { keywords, userMessages })
  };

  useEffect(() => {
    const newMessage = {
      message: "Hello! Ask this GOAT anything that comes to your mind!",
      sentTime: "just now",
      sender: "Goat",
    };

    setMessages([...messages, newMessage]);
  }, []);

  // const extractKeywords = () => {
  //   const userMessages = messages
  //     .filter((msg) => msg.sender === "User")
  //     .flatMap((msg) => msg.message.split(/\s+/));

  //   const uniqueWords = new Set(userMessages);
  //   return Array.from(uniqueWords).map((word, index) => (
  //     <Box key={index}>
  //       <ListItem>
  //         <ListItemText primary={word} />
  //         <IconButton edge="end" aria-label="delete">
  //           <DeleteIcon />
  //         </IconButton>
  //       </ListItem>
  //       <Divider />
  //     </Box>
  //   ));
  // };

  const handleSendMessage = (newMessage) => {
    const messageObject = {
      message: newMessage,

      sentTime: new Date().toLocaleTimeString(),
      sender: "User",
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

    console.log('messages of user:', messages.filter((msg) => msg.sender === "User"))
    console.log('words of user:', messages.filter((msg) => msg.sender === "User").flatMap((msg) => msg.message.split(/\s+/)))
    setUserMessages(messages.filter((msg) => msg.sender === "User"));
setUserWords(messages.filter((msg) => msg.sender === "User").flatMap((msg) => msg.message.split(/\s+/)))
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
    <Box style={{ display: "flex", height: "88vh", marginTop: "12px" }}>
      <Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            height: "85vh",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            margin: "2px 5px 5px 5px",
            padding: "10px",
            width: 260,
          }}
        >
          <List
            dense={true}
            style={{
              flex: 1,
              overflowY: "auto",
            }}
          >
            <Typography variant="h5">Settings</Typography>
            Reliability: <Slider />
            Experimental: <Checkbox />
            <br />
            Active sources: <Checkbox />
            <Divider />
            <Typography variant="h5" style={{ marginTop: 20 }}>
              Keywords
            </Typography>
            <Textarea
              value={keywords}
              onChange={onChangeKeywords}
              aria-label="minimum height"
              minRows={3}
              placeholder="Add keywords separated with comma"
            />
            {/* {extractKeywords()} */}
          </List>
          <Button
            onClick={sendReq}
            style={{ backgroundColor: "#40acf5" }}
            variant="contained"
          >
            Instant update
          </Button>
        </Box>
      </Box>
      <div style={{ flex: 4, position: "relative" }}>
        <MainContainer
          style={{
            borderRadius: "10px", // Rounded corners
            border: "1px solid rgba(0, 0, 0, 0.12)", // Grey border
            margin: "2px 5px 5px 5px", // Add some space around the list
            padding: "10px", // Add some padding inside the list
          }}
        >
          <ChatContainer>
            <MessageList>
              {messages.map((msg, index) => (
                <Message
                  key={index}
                  model={{
                    message: msg.message,
                    sentTime: msg.sentTime,
                    sender: msg.sender,
                    direction: msg.direction,
                  }}
                >
                  <Avatar
                    src={msg.sender === "Goat" ? logo : person}
                    name={"Goat"}
                  />
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
