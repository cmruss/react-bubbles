import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";


const Login = (props) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    isFetching: false
  });

  const handleChange = e => {
    setCredentials({
          ...credentials,
          [e.target.name]: e.target.value
      })
  };

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const submit = e => {
    e.preventDefault();
    setCredentials({
      ...credentials,
      isFetching: true
    })

    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubble-page')
      })
      .catch(err => console.log('No Dice.', err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={submit}>
        <input 
          type='text'
          name='username'
          placeholder='username'
          value={credentials.username}
          onChange={handleChange}
        />
        <input 
          type='password'
          name='password'
          placeholder='password'
          value={credentials.password}
          onChange={handleChange}
        />
        <button value='submit'>submit</button>
      </form>
    </>
  );
};

export default Login;
