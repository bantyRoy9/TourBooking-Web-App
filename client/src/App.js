import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/layout/Header/Header';
import webFont from 'webfontloader'
import React from 'react';
import Product from './components/Tour/Tour';
import Footer from './components/layout/footer/Footer';
import AllTour from './components/Tour/AllTour';
import Search from './components/layout/Search/Search';
import User from './components/User/User';
import Profile from './components/User/Profile/Profile';
import ProfileInfo from './components/User/Profile/ProfileInfo';
import ProfilePass from './components/User/Profile/ProfilePass';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';

import { loadUser } from './actions/userAction';

import store from './store'
import './App.css';

function App() {

  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto","Droid sans","Chilanka"]
      }
    })
    store.dispatch(loadUser())
  },[])

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exect path='/' element={<Home/>}></Route>

        <Route exect path='/tours' element={<AllTour/>}></Route>
        <Route path='/tours/:keyword' element={<AllTour/>}></Route>
        <Route exect path='/tour/:id' element={<Product/>}></Route>

        <Route  path='/search' element={<Search/>}></Route>

        <Route exect path='/login'  element={ <User/>}></Route>
        <Route exect path='/account' element={<ProtectRoute Component={Profile}/>}></Route>
        <Route exect path='/address' element={<ProtectRoute Component={ProfileInfo}/>}></Route>
        <Route exect path='/password' element={<ProtectRoute Component={ProfilePass}/>}></Route>
        <Route exect path='/my-booking' element={<ProtectRoute Component={ProfileInfo}/>}></Route>
        <Route exect path='/settings' element={<ProtectRoute Component={ProfileInfo}/>}></Route>
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
    </>
  );
}

export default App;
