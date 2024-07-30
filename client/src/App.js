import LoginPage from "./components/loginPage/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  return <h2>Home Page</h2>;
}

function NotFound() {
  return <h2>Not Found</h2>;
}

export default App;