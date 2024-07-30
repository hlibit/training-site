import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3101/api/login', {
        email,
        password,
        typeUser: "Sportsman"
      });

      if (response.data.Status) {
        navigate("/home");
      } else {
        console.log(response.data.message || "Login 1 failed. Please check your credentials and try again.");
      }
    } catch (error) {
      const keys = Object.keys(error.response.data);
      const hasKey = keys.includes('findErrors');
      if (!hasKey) {
        setError(error.response.data);
      } else {
        const errorMessages = error.response.data.findErrors.map( (err) => err)
        setError(errorMessages);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
