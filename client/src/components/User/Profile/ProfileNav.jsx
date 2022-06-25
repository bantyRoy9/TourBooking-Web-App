import React from 'react'
import { NavLink } from 'react-router-dom'
const ProfileNav = ({user}) => {
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
                         <li> <i class="fa-solid fa-gears"></i>accounts settings</li>
                        <NavLink to='/account'> <li><i class="fa-solid fa-user-pen"></i>Personal Settings</li><i class="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/address'> <li><i class="fa-solid fa-address-book"></i>Address Settings</li><i class="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/account/password'>  <li><i class="fa-solid fa-key"></i>Password Settings</li><i class="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='/my-booking'> <li><i class="fa-solid fa-bus"></i>My Bookings</li><i class="fa-solid fa-angle-right"></i></NavLink>
                        <NavLink to='settings'> <li><i class="fa-solid fa-user-gear"></i>Account Settings</li><i class="fa-solid fa-angle-right"></i></NavLink>
                    </ul>
                </nav>
            </div>
        </div>
    </>
  )
}

export default ProfileNav