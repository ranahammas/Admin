import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../views/login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };
  const navigate=useNavigate()
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/admins', { email, password });
      const { fname } = response.data

      console.log('Response:', response.data);
      
      alert("login Success")
      navigate("/admin/*" && "/admin/user-page",  {state: { fname: fname }}
      
    )
      // history.push({admin
      //   pathname: '/destination',
      //   state: { fnae: fname }
      // });
      // console.log("data in state is --->",state);
    } catch (error) {
      console.error('Error:', error.message);
      alert("Wrong Credentials login failed")
      // windows.reload()
      // Handle login error here
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login </h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleUsernameChange}
            className="form-control"
            placeholder='Enter Email'
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter Pasword'
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
