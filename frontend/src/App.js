import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage';

import Login from './Login';


function App() {


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="mainpagehome" element={<MainPage />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
