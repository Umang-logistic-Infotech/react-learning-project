import React, { useState } from 'react';
import Program1 from './components/Program1';
import Sidebar from './components/SideeBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Program2 from './components/Program2';
import Program3 from './components/Program3';
import Program4 from './components/Program4';
import Program5 from './components/Program5';
import Program6 from './components/Program6';

function App() {


  return (<>
  <Router>
    <Routes>
      <Route path='/Program1' element={<Program1/>}/>
      <Route path='/Program2' element={<Program2/>}/>
      <Route path='/Program3' element={<Program3/>}/>
      <Route path='/Program4' element={<Program4/>}/>
      <Route path='/Program5' element={<Program5/>}/>
      <Route path='/Program6' element={<Program6/>}/>
      <Route path='/Program7' element={<Program4/>}/>
      <Route path='/Program8' element={<Program4/>}/>
      <Route path='/Program9' element={<Program4/>}/>
    </Routes>
  </Router>
    <Sidebar/>

  </>
  );
}

export default App;
