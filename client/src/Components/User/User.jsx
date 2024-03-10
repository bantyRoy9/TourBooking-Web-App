import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import './user.css'
import { login, signUp } from '../../actions/userAction'
import Loader from '../Loader/Loader'

const User = ({isOpen,openModal}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const switcherTab = useRef(null);
    const signupTab = useRef(null);
    const loginTab = useRef(null);
    
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [avatar, setAvatar] = useState("/Profile.png");
    const [styles,setStyles] = useState('none');

    const { loading,isAuthenticated } = useSelector((state) => state.user)
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
        setStyles('block')
        dispatch(login(loginEmail, loginPassword))
    }
    const signupSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.set('name', name);
        data.set('email', email);
        data.set('password', password);
        data.set('passwordconfirm', passwordconfirm);
        setStyles('block')
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
            openModal('close')
            setStyles('none')
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

    const closeModal = () =>{
        // console.log('dsaff',window.location.href.includes('login'));
        if(window.location.href.includes('login')){
            navigate('/')
        }else{
            openModal('close')
            setStyles('none')
        }
    }
    //console.log(loading);
    return (
         <>
            <Loader propStyle = {styles}/> 
            <div className={`loginSignupContainer ${isOpen}`}>
            <div className="close"><i className='fa-solid fa-xmark' onClick={closeModal}></i></div>

                {/* <div className="bg"></div> */}
                {/* <div className="bg bg2"></div> */}
                {/* <div className="bg bg3"></div> */}
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
                            <label htmlFor="email">Email</label>
                            {/* <i className='fa-solid fa-envelope'></i> */}
                            <input type="email" name='email' onChange={(e) => setLoginEmail(e.target.value)} required />
                        </div>
                        <div className="loginPassword">
                            <label htmlFor="password">Password</label>
                            {/* <i className='fa-solid fa-unlock'></i> */}
                            <input type="password" name="password" onChange={(e) => setLoginPassword(e.target.value)} required />
                        </div>
                        <Link to='/forget/password'>forget password</Link>
                        <input type="submit" value="Login" className='loginbtn' />
                    </form>


                    <form className='signupForm' ref={signupTab} encType='multipart/form-data' onSubmit={signupSubmit}>
                        <div className="signupName">
                            <label htmlFor="name">Name</label>
                            {/* <i className='fa-solid fa-user'></i> */}
                            <input type="text"  name='name' onChange={signupChangeHandler} required />
                        </div>
                        <div className="signupEmail">
                            <label htmlFor="email">Email</label>
                            {/* <i className='fa-solid fa-envelope'></i> */}
                            <input type="email"  name='email' onChange={signupChangeHandler} required />
                        </div>
                        <div className="signupPassword">
                            <label htmlFor="password">Password</label>
                            {/* <i className='fa-solid fa-lock'></i> */}
                            <input type="password"  name='password' onChange={signupChangeHandler} required />
                        </div>
                        <div className="signupPassword">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            {/* <i className='fa-solid fa-lock'></i> */}
                            <input type="password" name='passwordconfirm' onChange={signupChangeHandler} required />
                        </div>
                        {/* <div id="signupImage">
                            <img src={avatarPreview} alt="avatarPreview" />
                            <input type="file" name="avatar" accept='image/*' onChange={signupChangeHandler} />
                        </div> */}

                        <input type="submit" value="SignUp" className='signupbtn' />

                    </form>
                </div>



                {/* <div>
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
                </div> */}
            </div>
        </>
        
            
    )
}

export default User