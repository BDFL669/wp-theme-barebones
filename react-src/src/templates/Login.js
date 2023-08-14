import React, { useState, useEffect } from 'react';
//import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import Loader from '../partials/Loader';
import axios from 'axios';
//import clientConfig from '../client-config';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userNiceName, setUserNiceName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const siteUrl = 'http://localhost/wordpress';

  const createMarkup = (data) => ({ __html: data });

  const onFormSubmit = (event) => {
   // event.preventDefault();

    const loginData = {
      username: username,
      password: password,
    };

    setLoading(true);

    axios
      .post(`${siteUrl}/wp-json/jwt-auth/v1/token`, loginData)
      .then((res) => {
        if (undefined === res.data.token) {
          setError(res.data.message);
          setLoading(false);
          return;
        }

        const { token, user_nicename, user_email } = res.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userName', user_nicename);

        setLoading(false);
        setLoggedIn(true);
        setUserNiceName(user_nicename);
      })
      .catch((err) => {
        setError(err.response.data.message);
        setLoading(false);
      });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
  };

  const user = userNiceName ? userNiceName : localStorage.getItem('userName');

  useEffect(() => {
    if (loggedIn || localStorage.getItem('token')) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  if (loggedIn) {
    return <Navigate to={`/wordpress/dashboard/${user}`} replace={true} />;
  } else {
    return (
      <>
        <div className="jumbotron" style={{ height: '100vh' }}>
          <h4>Login</h4>
          {error && (
            <div
              className="alert alert-danger"
              dangerouslySetInnerHTML={createMarkup(error)}
            />
          )}
          <form onSubmit={onFormSubmit}>
            <label className="form-group">
              Username:
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <label className="form-group">
              Password:
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </label>
            <br />
            <button className="btn btn-primary mb-3" type="submit">
              Login
            </button>
            
          </form>
        </div>
      </>
    );
  }
};

export default Login;
