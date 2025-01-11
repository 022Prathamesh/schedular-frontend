import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration';
import Login from './components/Login';
import AddInterviewSlots from './components/AddInterviewSlots';
import GetInterviewSlots from './components/GetInterviewSlots';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-slots" element={<AddInterviewSlots />} />
          <Route path="/get-slots" element={<GetInterviewSlots />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
