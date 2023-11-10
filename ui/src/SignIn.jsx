import React, {useState} from 'react';

const SignIn = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [rememberMe, setRememberMe] = useState(false);

 const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
 };

 return (
    <div>
      <h2>Welcome back</h2>
      <h3>Please enter your email & password to sign in</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <label htmlFor="rememberMe">Remember Me:</label>
        <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        <br />
        <button type="submit">Sign in</button>
      </form>
      <p>Forget password? Don't have an account? <a href="/signup">Sign up</a> or continue with</p>
      <p><a href="/continue-with">(f)ilil</a></p>
    </div>
 );
};

export default SignIn;