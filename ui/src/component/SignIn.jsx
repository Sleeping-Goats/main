import React, { useState,  } from "react";
//import {useNavigate} from "react-router-dom";
import {Button, TextField, Grid, Paper } from "@mui/material";


const SignIn = () => {
   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const paperStyle={padding :20,height:'40vh',width:500, margin:"20px auto"}
  

  
   //const navigate = useNavigate();
    function handleClick(){
        alert("Welcome")
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
         <Paper elevation={10} style={paperStyle}>
    <div>
      <h2>Welcome</h2>
      <h3>Please enter your email & password to sign in</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>

        <TextField
          type="email"
          id="standard-basic"
          variant="standard"
          size="small"
          InputProps={{
            style: { borderBottomColor: 'lightblue' },
            classes: { underline: 'custom-underline-class' },
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <TextField
          type="password"
          id="standard-basic"
          variant="standard"
          size="small"
          InputProps={{
            style: { borderBottomColor: 'lightblue' },
            classes: { underline: 'custom-underline-class' },
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="rememberMe">Remember Me:</label>
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        <br />
        <Button onClick={handleClick} variant="contained" >Sign in</Button>
        
      </form>
      <p>
        Forget password? Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
    </Paper>
    </Grid>
  );
};

export default SignIn;

