import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Loading from '../../layout/Loading/Loading';
import './profile.css'
import { NavLink } from 'react-router-dom';
import ProfileNav from './ProfileNav';

const Profile = () => {
    const navigate = useNavigate();

    const { loading, user, isAuthenticated } = useSelector(state => state.user);

    const [users, setUsers] = useState({})
    useEffect(() => {
        if (isAuthenticated === false) {
            // navigate('/login')

        }
        setUsers(user)
    }, [isAuthenticated, navigate])

    const changeHandler = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }
    // console.log(users)\


    return (
        <>
            {loading ? <Loading /> : users &&
                <div className="profile-container">
                    <div>
                        <ProfileNav user={user} />
                    </div>
                    <div className="profile-info">
                        <div className="profile-info-container">
                            <strong>Personal Information</strong>
                            <form action="">
                            <label htmlFor="name">Name</label>
                            <div className="user-name">
                                <i className='fa-solid fa-user'></i>
                                <input type="text" name='name' value={users.name} onChange={changeHandler} placeholder='user name' />
                            </div>
                            <label htmlFor="name">Email Address</label>
                            <div className="user-email">
                                <i className='fa-solid fa-envelope'></i>
                                <input type="text" name='email' value={users.email} onChange={changeHandler} placeholder='user email' />
                            </div>
                            <div className="profile-user">
                                <img className='form__user-photo' src={`/img/users/${users.photo}`} alt="" />
                                <input className='form__upload' type="file" name='photo' accept='image/*' onChange={changeHandler} id='photo'/>
                                <label htmlFor="photo"> Choose new photo</label>
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

export default Profile