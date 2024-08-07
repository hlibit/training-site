import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './components/loginPage/Login';
import Register from './components/registerPage/Register';
import { ThemeProvider } from './components/theme/themeContext';
import { CssBaseline } from '@mui/material';
import './App.css';
import MainPage from './components/mainPage/mainPage';

function App() {

  return (
    <ThemeProvider>
    <CssBaseline />
    <div className="App">
    
      <Router>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route exact path= "/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
    </ThemeProvider>
  );
}



function NotFound() {
  return <h2>Not Found</h2>;
}

export default App;
