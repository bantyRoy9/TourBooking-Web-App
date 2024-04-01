import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Input, Loader as Loading } from "../../Components";
import { login, signUp } from "../../Redux";
import "./user.css";
const User = ({ isOpen, openModal }) => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    switcherTab = useRef(null),
    signupTab = useRef(null),
    loginTab = useRef(null),
    [loginEmail, setLoginEmail] = useState(""),
    [loginPassword, setLoginPassword] = useState(""),
    [avatarPreview, setAvatarPreview] = useState("/Profile.png"),
    [avatar, setAvatar] = useState("/Profile.png"),
    [user, setUser] = useState({}),
    { loading, isAuthenticated, error } = useSelector((state) => state.user);

    
  useEffect(() => {
    isAuthenticated && openModal("close");
    error && Alert(error, "E");
  }, [isAuthenticated]);

  const submitHandler = (e,submitType)=>{
    e.preventDefault();
    if(submitType === "Login"){
      dispatch(login(user.email, user.password));
    }else{
      const data = new FormData();
      Object.keys(user).forEach(key=>{
          data.set([key], user[key]);
      });
      dispatch(signUp(user));
    } 
  }
  const changeHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.targer.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const switchTab = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNormal");
      switcherTab.current.classList.remove("shiftToRight");
      signupTab.current.classList.remove("signupFormNormal");
      loginTab.current.classList.remove("shiftToLeft");
    };
    if (tab === "signup") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNormal");
      loginTab.current.classList.add("shiftToLeft");
      signupTab.current.classList.add("signupFormNormal");
    };
    setUser({});
  };

  const closeModal = () => {
    window.location.href.includes("login") ? navigate("/") : openModal("close");
  };
  return (
    <>
      <Loading propStyle={loading ? "block" : "none"} />
      <div className={`loginSignupContainer ${isOpen}`}>
        <div className="close">
          <i className="fa-solid fa-xmark" onClick={closeModal}></i>
        </div>
        <div className="loginSignup-box">
          <div className="col-md-12">
            <div className="loginSignup-toggle">
            <div className="text-center pointer" onClick={(e) => switchTab(e, "login")}>Login</div>
              <div className="text-center pointer" onClick={(e) => switchTab(e, "signup")}>Register</div>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm row" ref={loginTab} onSubmit={(e)=>submitHandler(e,"Login")}>
            <div className="col-md-12">
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={changeHandler}
                    required={true}
                    className="form-control padPlaceHolder"
                    leftIcon="fa-solid fa-envelope"
                    value={user?.email??""}
                    errorMsg="Email required!"
                    pattern={/^([\w-!#$%&.]+@([\w-]+\.)+[\w-]{1,4})?$/}
                />
              </div>
            <div className="col-md-12">
                <Input
                  label="Password"
                  placeholder="Enter your password"  
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={changeHandler}
                  required={true}
                  leftIcon="fa-solid fa-lock"
                  value={user?.password??""}
                  errorMsg="Password Required!"
                  pattern={/^[ A-Za-z0-9_@./#&+-].{7,}$/}
                />
            </div>
            <div className="col-md-12">
                <button type="submit"  style={{width:"100%"}} className="btn btn-primary col-md-12">Login</button>
            </div>
          </form>
          <form className="signupForm" ref={signupTab} onSubmit={(e)=>submitHandler(e)}>
            <div className="col-md-12">
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                className="form-control"
                type="text"
                name="name"
                onChange={changeHandler}
                leftIcon="fa-solid fa-user"
                value={user?.name??""}
                required
              />
            </div>
            <div className="col-md-12">
              <Input
                label="Email"
                placeholder="example@gmail.com"
                className="form-control"
                type="email"
                name="email"
                onChange={changeHandler}
                leftIcon="fa-solid fa-envelope"
                value={user?.email??""}
                errorMsg="Email required!"
                pattern={/^([\w-!#$%&.]+@([\w-]+\.)+[\w-]{1,4})?$/}
                required
              />
            </div>
            <div className="col-md-12">
              <Input
                label="Choose Password"
                className="form-control"
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                onChange={changeHandler}
                required={true}
                leftIcon="fa-solid fa-lock"
                value={user?.password??""}
                errorMsg="Password Required!"
                pattern={/^[ A-Za-z0-9_@./#&+-].{7,}$/}
              />
            </div>
            <div className="col-md-12">
              <Input
                label="Confirm Password"
                className="form-control"
                type="password"
                name="passwordconfirm"
                placeholder="Minimum 8 characters"
                onChange={changeHandler}
                required={true}
                leftIcon="fa-solid fa-lock"
                value={user?.passwordconfirm??""}
                errorMsg="Password Required!"
                pattern={/^[ A-Za-z0-9_@./#&+-].{7,}$/}
              />
            </div>
            <div className="col-md-12" style={{width:"100%"}} >
                <button type="submit" style={{width:"100%"}} className="btn btn-primary col-md-12 blink">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default User;
