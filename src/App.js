import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import Content from './components/Content';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import '../src/components/style.css';
 
 
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        {/* <Body />
        <Content /> */}
        <div className="main-content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
             <Route path="/" element={
              <>
               
                
              </>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
