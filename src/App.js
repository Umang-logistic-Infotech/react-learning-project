import React from 'react';
import Program1 from './Pages/Program1';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Program2 from './Pages/Program2';
import Program3 from './Pages/Program3';
import Program4 from './Pages/Program4';
import Program5 from './Pages/Program5';
import Program6 from './Pages/Program6';
import Program7 from './Pages/Program7';
import Program8 from './Pages/Program8';
import Program9 from './Pages/Program9';
import TheMovieDB from './Pages/TheMovieDB';
import UserContextProvider from './context/UserContextProvider';
import MovieDetail from './Pages/MovieDetail';
import { ThemeContextProvider } from './context/ThemeContextProvider';
import Footer from './components/Footer';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <Router>
          <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <Header />
            <div className="d-flex flex-grow-1" style={{ overflow: 'hidden' }}>
              <Sidebar />
              <main 
                className="flex-grow-1" 
                style={{ 
                  overflowY: 'auto', 
                  overflowX: 'hidden',
                  height: 'calc(100vh - 73px)'
                }}
              >
                <Routes>
                  <Route path='/' element={<Program1 />} />
                  <Route path='/Program1' element={<Program1 />} />
                  <Route path='/Program2' element={<Program2 />} />
                  <Route path='/Program3' element={<Program3 />} />
                  <Route path='/Program4' element={<Program4 />} />
                  <Route path='/Program5' element={<Program5 />} />
                  <Route path='/Program6' element={<Program6 />} />
                  <Route path='/Program7' element={<Program7 />} />
                  <Route path='/Program8' element={<Program8 />} />
                  <Route path='/Program9' element={<Program9 />} />
                  <Route path='/TheMovieDB' element={<TheMovieDB />} />
                  <Route path='/TheMovieDB/:movieId' element={<MovieDetail />} />
                </Routes>
              </main>
            </div>
              
          {/* <div className="d-flex flex-column">
            <div><Footer/></div>
        </div> */}
          </div>
        </Router>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;