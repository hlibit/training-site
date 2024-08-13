import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/loginPage/Login";
import Register from "./components/registerPage/Register";
import { ThemeProvider } from "./components/theme/themeContext";
import { CssBaseline } from "@mui/material";
import "./App.css";
import MainPage from "./components/mainPage/mainPage";
import ProfilePage from "./components/mainPage/profilePage/profilePage";
import Security from "./components/mainPage/securityPage.jsx/securityPage";
import CreateTraining from "./components/mainPage/createTraining/createTraining";
import FindTraining from "./components/mainPage/findTraining/findTraining";

function NotFound() {
  return <h2>Not Found</h2>;
}

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/main/profile" element={<ProfilePage />} />
            <Route path="/main/security" element={<Security />} />
            <Route path="/main/create" element={<CreateTraining />} />
            <Route path="/main/find-training" element={<FindTraining />}/>
            <Route exact path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
