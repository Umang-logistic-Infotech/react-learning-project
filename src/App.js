import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Program1 from './Pages/Program1';
import Program2 from './Pages/Program2';
import Program3 from './Pages/Program3';
import Program4 from './Pages/Program4';
import Program5 from './Pages/Program5';
import Program6 from './Pages/Program6';
import Program7 from './Pages/Program7';
import Program8 from './Pages/Program8';
import Program9 from './Pages/Program9';
import TheMovieDB from './Pages/TheMovieDB';
import MovieDetail from './Pages/MovieDetail';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import HomePage from "./Pages/HomePage";
import Labs from "./Pages/Labs";
import TextField from "./Pages/TextField";
import Select from "./Pages/Select";
import CheckBox from "./Pages/CheckBox";
import RadioButton from "./Pages/RadioButton";
import { ToastContainer } from 'react-toastify';


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/Login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <ThemeContextProvider>
            <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar 
        newestOnTop 
        closeButton 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover stacked
      />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>}>
            <Route path="Home" element={<div><h1>Home Page</h1></div>} />
            <Route path="Program1" element={<Program1 />} />
            <Route path="Program2" element={<Program2 />} />
            <Route path="Program3" element={<Program3 />} />
            <Route path="Program4" element={<Program4 />} />
            <Route path="Program5" element={<Program5 />} />
            <Route path="Program6" element={<Program6 />} />
            <Route path="Program7" element={<Program7 />} />
            <Route path="Program8" element={<Program8 />} />
            <Route path="Program9" element={<Program9 />} />
            <Route path="TheMovieDB" element={<TheMovieDB />} />
            <Route path="TheMovieDB/:movieId" element={<MovieDetail />} />
            <Route path="labs" element={<Labs />} />
            <Route path="textfield" element={<TextField/>} />
            <Route path="select" element={<Select/>} />
            <Route path="checkbox" element={<CheckBox/>} />
            <Route path="radio" element={<RadioButton />} />
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;