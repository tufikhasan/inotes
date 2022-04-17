import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      //Save token and redirect home
      localStorage.setItem('token', json.authtoken);
      navigate({ pathname: '/' });
    } else {
      alert('Invalid credentials');
    }
    console.log(json);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="app__login">
      <div className="app__login-form">
        <h3 className="head-text">
          Login <span>your</span> account
        </h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              autoComplete="on"
              type="password"
              minLength={5}
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>

          <input
            disabled={credentials.password.length < 5}
            type="submit"
            className="primary_button"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
