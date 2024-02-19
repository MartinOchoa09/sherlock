import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import '../../assets/css/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoged, setIsLoged} = useContext(UserContext);
  const navigate = useNavigate();

  const users = [
    { username: 'CristianO', password: 'Cristian_10564' },
    { username: 'MartinO', password: 'Xiaomi8_pro' },
    { username: 'LAlfaro', password: 'Automat@10564' },
    { username: '1', password: '1' }

  ];

  const handleLogin = () => {
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setIsLoged(true);
      navigate("/home");
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

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
