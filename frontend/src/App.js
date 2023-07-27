import React from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home"

function App() {

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  }, [])
  
  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
