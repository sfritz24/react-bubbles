import React, {useState} from "react";
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const initialValues = {
  username: '',
  password: ''
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(initialValues);
  const {push} = useHistory();

  const handleChange = event =>{
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event =>{
    event.preventDefault();

    axios.post('http://localhost:5000/api/login', login)
      .then(response =>{
        localStorage.setItem('token', response.data.payload);
      })
      .catch(error =>{
        console.log(error);
      })
      .finally(() =>{
        setLogin(initialValues);
      });
  };

  return (
    <>
      <form>
        <label>Username:&nbsp;
          <input
            type='text'
            name='username'
            onChange={handleChange}
            value={login.username}
          />
        </label>
        <label>Password:&nbsp;
          <input
            type='password'
            name='password'
            onChange={handleChange}
            value={login.password}
          />
        </label>
      </form>
    </>
  );
};

export default Login;
