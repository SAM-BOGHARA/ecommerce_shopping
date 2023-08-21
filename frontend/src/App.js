import React from 'react';
import './App.css';
import Header from './component/layout/Header/Header.js';
import {BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home"
import Loader from "./component/layout/Loader/Loader"
import ProductDetails from "./component/Product/ProductDetails.js"
import Products from "./component/Product/Products.js"
import Search from "./component/Product/Search.js"
import LoginSignUp from './component/User/LoginSignUp';


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
        <Route exact path='/product/:id' element={<ProductDetails />}></Route>
        <Route exact path='/products' element={<Products />}></Route>
        <Route exact path='/products/:keyword' element={<Products />}></Route>
        <Route exact path='/search' element={<Search />}></Route>
        <Route exact path='/login' element={<LoginSignUp />}></Route>
        <Route exact path='/sad' element={<Loader />}></Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
