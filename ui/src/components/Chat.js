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
// import axios from "axios";

import axios from "axios";


const Chat = () => {
  const [chatting, setChatting] = useState(true);

  const [messages, setMessages] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [userWords, setUserWords] = useState([]);

  const onChangeKeywords = (event) => {
    setKeywords(event.target.value.split(",").map((word) => word.trim()));
    console.log(keywords);
  };

  const sendReq = async () => {
    console.log("usermessages", userMessages);
    // ['stainless', 'corrosion', 'steel', 'welding', 'Passivation', 'environment']
    console.log("userwords", userWords);
    let result = await axios.post(
      "http://94.237.38.133:8080/data-sources/keywords",
      keywords
    );
    console.log(result);
  };

  useEffect(() => {
    console.log("Fetching keywords")

    try {
      axios.get(
        "http://94.237.38.133:8080/data-sources/keywords"
      ).then(
        res => {
          setKeywords(res.data); 
          console.log("Fetched: " + res.data)
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    const newMessage = {
      message: "Hello! Ask this GOAT anything that comes to your mind!",
      sentTime: "just now",
      sender: "Goat",
    };

    setMessages([...messages, newMessage]);
  }, []);

  const sendDataToInvoke = async (exampleSendData) => {

    const result = await axios.post(
      "http://94.237.38.133:8000/v1/free/invoke",
      exampleSendData
    );

    const newMessage = {
      message: result.data.output.content,
      sentTime: "just now",
      sender: "Goat",
    };

    setMessages((messages) => [...messages, newMessage]);

    console.log("yolo", result);
  };

  const handleSendMessage = (newMessage) => {
    const messageObject = {
      message: newMessage,
      sentTime: new Date().toLocaleTimeString(),
      sender: "User",
      direction: "outgoing",
      position: "single",
    };

    if (messageObject.message) {
      setMessages((prevMessages) => {
        const userMsgs = prevMessages.filter((msg) => msg.sender === "User");

        const mergedMessages = userMsgs.map((msg) => msg.message).join(" ");

        console.log("merged", mergedMessages);
        getSystemMsg().then(systemMsg => {
          console.log(systemMsg);
          const exampleSendData = {
            input: {
              chat_history: mergedMessages,
              system: systemMsg,
              text: messageObject.message,
            }};
            sendDataToInvoke(exampleSendData);
          })
        const updatedMessages = [...prevMessages, messageObject]
        return updatedMessages;
      });
    }
  };

  const getSystemMsg = (userMsg) => {
    //if (userMsg.toUpperCase().contains("PATENT")) {
    return fetch("/systemMsg.txt")
      .then(r => r.text());
    //}
  }


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
            <Typography variant="h5">Data sources</Typography>
            News <Checkbox checked/>
            <br />
            Financial <Checkbox checked/>
            <br />
            Patents <Checkbox checked/>
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
          </List>
          <Button
            onClick={sendReq}
            style={{ backgroundColor: "#40acf5" }}
            variant="contained"
          >
            update settings
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
