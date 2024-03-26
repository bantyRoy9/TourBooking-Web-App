import React, { useEffect,lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { load } from 'webfontloader'
import { loadUser } from './actions/userAction';
import store from './store'
import './App.css';
import { Page404 } from './Views/PageNotFound';
import { useSelector } from 'react-redux';

const User = lazy(()=> import('./Components/User/User'));
const Home = lazy(()=>import('./Views/HomeView/Home'));
const Header = lazy(()=>import('./Components/layout/Header/Header'));
const Footer = lazy(()=>import('./Components/layout/footer/Footer'));
const Profile = lazy(()=>import('./Components/User/Profile/Profile'));
const ProfileInfo = lazy(()=>import('./Components/User/Profile/ProfileInfo'));
const ProfilePass = lazy(()=>import('./Components/User/Profile/ProfilePass'));
const ProtectRoute = lazy(()=>import('./Components/Routes/ProtectRoute'));
const Product = lazy(()=>import('./Views/TourView/Tour'));
const AllTour = lazy(()=>import('./Views/TourView/AllTour'));



function App() {
  useEffect(()=>{
    load({
      google:{
        families:["Roboto","Droid sans","Chilanka","Craftworkgrotesk","sans-serif"]
      }
    })
    store.dispatch(loadUser())
  },[])
  const { isAuthenticated } = useSelector(state=> state.user);

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exect path='*' element={<Page404 />}></Route>
        <Route exect path='/' element={<ProtectRoute Component={Home} isProtected={true}/>}></Route>
        <Route exect path='/tours' element={<ProtectRoute Component={AllTour} isProtected={true}/>}></Route>
        <Route exect path='/tours/:keyword' element={<ProtectRoute Component={AllTour} isProtected={true}/>}></Route>
        <Route exect path='/tour/:id' element={<ProtectRoute Component={Product} isProtected={true}/>}></Route>
        <Route exect path='/login'  element={<ProtectRoute Component={User} isProtected={true} isOpen={'openLoginModal'}/>}></Route>
        <Route exect path='/account' element={<ProtectRoute Component={Profile} isProtected={isAuthenticated}/>}></Route>
        <Route exect path='/address' element={<ProtectRoute Component={ProfileInfo} isProtected={isAuthenticated}/>}></Route>
        <Route exect path='/password' element={<ProtectRoute Component={ProfilePass} isProtected={isAuthenticated}/>}></Route>
        <Route exect path='/my-booking' element={<ProtectRoute Component={ProfileInfo} isProtected={isAuthenticated}/>}></Route>
        <Route exect path='/settings' element={<ProtectRoute Component={ProfileInfo} isProtected={isAuthenticated}/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
