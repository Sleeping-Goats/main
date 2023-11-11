import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import logo from "../assets/goat.png";


const Chat = () => {
  const [chatting, setChatting] = useState(true);
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
      {/* Content for else case goes here */}
      <Box height={20} />

      <Button onClick={() => setChatting(true)} variant="contained">
        back
      </Button>
    </Box>
  );
};

export default Chat;

