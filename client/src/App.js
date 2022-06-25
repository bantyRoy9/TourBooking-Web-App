import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
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

import store from './store'
import { loadUser } from './actions/userAction';
import ProfileInfo from './components/User/Profile/ProfileInfo';
import { useSelector } from 'react-redux';

function App() {
  const { isAuthenticated , user } = useSelector(state=>state.user)
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
      <Header/>
      <Routes>
        <Route exect path='/' element={<Home/>}></Route>
        <Route exect path='/tours' element={<AllTour/>}></Route>
        <Route path='/tours/:keyword' element={<AllTour/>}></Route>
        <Route exect path='/tour/:id' element={<Product/>}></Route>
        <Route  path='/search' element={<Search/>}></Route>
        <Route exect path='/login' element={<User/>}></Route>
        <Route exect path='/account' element={<Profile/>}></Route>
        <Route exect path='/address' element={<ProfileInfo user={user}/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
