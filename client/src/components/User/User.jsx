import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import './user.css'
import { login, signUp } from '../../actions/userAction'

const User = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const switcherTab = useRef(null);
    const signupTab = useRef(null);
    const loginTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [avatar, setAvatar] = useState("/Profile.png");

    const { isAuthenticated } = useSelector((state) => state.user)
   // console.log(isAuthenticated, avatar, avatarPreview);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        passwordconfirm: ''
    });

    const { name, email, password, passwordconfirm } = user

    const loginSubmit = (e) => {
        e.preventDefault();
        //console.log(loginEmail, loginPassword);
        dispatch(login(loginEmail, loginPassword))

    }
    const signupSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.set('name', name);
        data.set('email', email);
        data.set('password', password);
        data.set('passwordconfirm', passwordconfirm);
        dispatch(signUp(user));
        navigate('/');
    }

    const signupChangeHandler = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader();
            //console.log('avatar');
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            };
            reader.readAsDataURL(e.targer.files[0])
        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [isAuthenticated, navigate])
    const switchTab = (e, tab) => {
        if (tab === 'login') {
            switcherTab.current.classList.add('shiftToNormal')
            switcherTab.current.classList.remove('shiftToRight')

            signupTab.current.classList.remove('signupFormNormal')
            loginTab.current.classList.remove('shiftToLeft');
        }
        if (tab === 'signup') {
            switcherTab.current.classList.add('shiftToRight')
            switcherTab.current.classList.remove('shiftToNormal')


            loginTab.current.classList.add('shiftToLeft');
            signupTab.current.classList.add('signupFormNormal')
        }
    }

    return (
        <>
            <div className='loginSignupContainer'>

                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
                <div className="loginSignup-box">
                    <div>
                        <div className="loginSignup-toggle">
                            <p onClick={(e) => switchTab(e, 'login')}>Login</p>
                            <p onClick={(e) => switchTab(e, 'signup')}>Register</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <i className='fa-solid fa-envelope'></i>
                            <input type="email" name='email' onChange={(e) => setLoginEmail(e.target.value)} placeholder='Email' required />
                        </div>
                        <div className="loginPassword">
                            <i className='fa-solid fa-unlock'></i>
                            <input type="password" name="password" onChange={(e) => setLoginPassword(e.target.value)} placeholder='Password' required />
                        </div>
                        <Link to='/forget/password'>forget password</Link>
                        <input type="submit" value="Login" className='loginbtn' />
                    </form>


                    <form className='signupForm' ref={signupTab} encType='multipart/form-data' onSubmit={signupSubmit}>
                        <div className="signupName">
                            <i className='fa-solid fa-user'></i>
                            <input type="text" placeholder='Name' name='name' onChange={signupChangeHandler} required />
                        </div>
                        <div className="signupEmail">
                            <i className='fa-solid fa-envelope'></i>
                            <input type="email" placeholder='Email' name='email' onChange={signupChangeHandler} required />
                        </div>
                        <div className="signupPassword">
                            <i className='fa-solid fa-lock'></i>
                            <input type="password" placeholder='Password' name='password' onChange={signupChangeHandler} required />
                        </div>
                        <div className="signupPassword">
                            <i className='fa-solid fa-lock'></i>
                            <input type="password" placeholder='Confirm Password' name='passwordconfirm' onChange={signupChangeHandler} required />
                        </div>
                        {/* <div id="signupImage">
                            <img src={avatarPreview} alt="avatarPreview" />
                            <input type="file" name="avatar" accept='image/*' onChange={signupChangeHandler} />
                        </div> */}

                        <input type="submit" value="SignUp" className='signupbtn' />

                    </form>
                </div>



                <div>
                    <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax">
                            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                        </g>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default User