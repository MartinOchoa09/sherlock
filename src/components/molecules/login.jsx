import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../../assets/css/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const users = [
    { username: 'CristianO', password: '10564' },
    { username: 'MartinO', password: 'Xiaomi8pro' },
    { username: 'Alfaro', password: 'automata' }
  ];

  const handleLogin = () => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setLoggedIn(true);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <div className="card-container">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="container">
          <div className="log-card">
            <p className="heading">BIENVENIDO SHERLOCK</p>
            <div className="input-group">
              <p className="text">Username</p>
              <input
                className="input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="text">Password</p>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn" onClick={handleLogin}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
