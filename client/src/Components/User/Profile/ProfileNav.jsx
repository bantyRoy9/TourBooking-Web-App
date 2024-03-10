import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
const ProfileNav = () => {

  const { user } = useSelector(state=> state.user);

  return (
    <>
    <div className="profiles-nav">
            <div className="profile-user">
                    <img src={`/img/users/${user.photo}`} alt="" />
                <div className="profile-name">
                    <p>Hello,</p>
                    <strong>{user.name}</strong>
                </div>
            </div>
            <div className="profile-nav">
                <nav>
                    <ul>
                         <li> <i className="fa-solid fa-gears"></i>accounts settings</li>
                        <NavLink to='/account'> <li><i className="fa-solid fa-user-pen"></i>Personal Settings</li><i className="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/address'> <li><i className="fa-solid fa-address-book"></i>Address Settings</li><i className="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/password'>  <li><i className="fa-solid fa-key"></i>Password Settings</li><i className="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/my-booking'> <li><i className="fa-solid fa-bus"></i>My Bookings</li><i className="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/settings'> <li><i className="fa-solid fa-user-gear"></i>Account Settings</li><i className="fa-solid fa-angle-right"></i></NavLink>
                    </ul>
                </nav>
            </div>
        </div>
    </>
  )
}

export default ProfileNav