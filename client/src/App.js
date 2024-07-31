import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './components/loginPage/Login';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [greetings, setGreetings] = useState(""); // Использование useState для управления состоянием

  useEffect(() => {
    const enterFunc = async () => {
      try {
        const response = await axios.get('http://localhost:3101/api/main', { withCredentials: true });
        setGreetings(response.data.message); // Обновление состояния с помощью setGreetings
        console.log(response);
      } catch (error) {
        if (error.response  && error.response.data.unLogged) {
          navigate("/login");
        } else {
          console.error(error);
        }
      }
    };

    enterFunc();
  }, [navigate]);

  return (
    <div>
      <h2>Home Page</h2>
      <h3>{greetings}</h3> {/* Отображение состояния */}
    </div>
  );
}

function NotFound() {
  return <h2>Not Found</h2>;
}

export default App;
