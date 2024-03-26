import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
import Loading from '../../layout/Loading/Loading';
import './profile.css'
// import { NavLink } from 'react-router-dom';
import ProfileNav from './ProfileNav';

const Profile = () => {
    // const navigate = useNavigate();

    const { loading, user, isAuthenticated } = useSelector(state => state.user);

    const [users, setUsers] = useState("")
    const [userPhoto, setUserPhoto] = useState()

    const changeHandler = (e) => {
        setUsers({ ...users, [e.target.name]: e.target.value })
    }

    const submithandler = (e) => {
        e.preventDefault();

        let myForm = new FormData();

        myForm.set("name", users.name);
        myForm.set("email", users.email);
        myForm.set("photo", users.photo);

      //  console.log(myForm);
        for (var pair of myForm.entries()) {
           // console.log(pair[0] + ', ' + pair[1]);
        }
        // console.log(users.name,users.email);

    }

    const updateProfileDataChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setUserPhoto(reader.result);
                // setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    useEffect(() => {
        // if (isAuthenticated === false) {
        //     // navigate('/login')

        // }
        setUsers(user)
        setUserPhoto(user.photo)
    }, [isAuthenticated, user])

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
                            <form encType="multipart/form-data" onSubmit={submithandler}>
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
                                    {users.photo ?
                                        <img className='form__user-photo' src={`/img/users/${users.photo}`} alt="" />
                                        :
                                        <img className='form__user-photo' src={userPhoto.photo} alt="" />

                                    }
                                    <input className='form__upload' type="file" name='photo' accept='image/*' onChange={updateProfileDataChange} id='photo' />
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