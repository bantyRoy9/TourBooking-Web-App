import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader'
import User from './Components/User/User';
import Home from './Views/HomeView/Home';
import Header from './Components/layout/Header/Header';
import Footer from './Components/layout/footer/Footer';
import Profile from './Components/User/Profile/Profile';
import ProfileInfo from './Components/User/Profile/ProfileInfo';
import ProfilePass from './Components/User/Profile/ProfilePass';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import Product from './Views/TourView/Tour';
import AllTour from './Views/TourView/AllTour';

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
        <Route exect path='' element={<Home/>}></Route>

        <Route exect path='/tours' element={<AllTour/>}></Route>
        <Route exect path='/tours/:keyword' element={<AllTour/>}></Route>
        <Route exect path='/tour/:id' element={<Product/>}></Route>

        {/* <Route  path='/search' element={<Search/>}></Route> */}
        <Route exect path='/login'  element={ <User isOpen={'openLoginModal'}/>}></Route>
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
