import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Manager_login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '123') { // replace 'your_password_here' with your desired password
      navigate('/Manager');
    } else {
      alert('Incorrect password!');
    }
  };

  return (
    <div style={{ backgroundColor: '#a93439', color: '#fff', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#d13239', padding: '3rem' }}>
        <h1 style={{ margin: 0 }}>Manager Dashboard</h1>
      </header>
      <div style={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Manager_login;
