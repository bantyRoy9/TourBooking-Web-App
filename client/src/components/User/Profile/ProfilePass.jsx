import React from 'react'
// import { NavLink } from 'react-router-dom'
import ProfileNav from './ProfileNav'
import { useSelector } from 'react-redux';


const ProfilePass = () => {
    
  const { user } = useSelector(state=> state.user)

  return (
    <>{user && 
    <div className="profile-container">
    <div>
       <ProfileNav user={user}/>
    </div>
    <div className="profile-info">
                        <div className="profile-info-container">
                            <strong>Change PassWord</strong>
                            <form action="">
                            <label htmlFor="name">Current Password</label>
                            <div className="user-name">
                                <i className='fa-solid fa-lock'></i>
                                <input type="password" name='password' value={user.password}  placeholder='*************' disabled />
                            </div>
                            <label htmlFor="name">New password</label>
                            <div className="user-email">
                                <i className='fa-solid fa-lock'></i>
                                <input type="password" name='password' value={user.password}  placeholder='*********' />
                            </div>
                            <label htmlFor="name">Confirm New password</label>
                            <div className="user-email">
                                <i className='fa-solid fa-lock'></i>
                                <input type="password" name='confirmpasswod'   placeholder='*********' />
                            </div>
                          
                            <div className="profile-user-botton right">
                                <button className='btn btn-small btn--green'>Save settings</button>
                            </div>
                            </form>
                        </div>
                    </div>
</div>}
    </>
  )
}

export default ProfilePass