import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Backdrop } from '@mui/material';
import { userLogout } from '../../../Redux';
const UserOption = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const [ open , setOpen] = useState(false);

    const option = [
        {name:'My Bookings',icon:<i className="fa-solid fa-bus"></i>,func:bookings},
        {name:'Account',icon:<i className="fa-solid fa-gear"></i>,func:account},
        {name:'Logout',icon:<i className="fa-solid fa-arrow-right-from-bracket"></i>,func:logoutUser}
    ];
    if(user && user.role === "admin"){
        option.unshift({name:'DashBoard',icon:<i className="fa-solid fa-grip"></i>,func:dashbord})
    };

    function dashbord(){
        navigate('/admin/dashboard')
    }
    function bookings(){
        navigate('/my-bookings')
        
    }
    function account(){
        navigate('/account')
        
    }
    function logoutUser(){
        dispatch(userLogout())
        navigate('/')
    }

  return (
    <>
    <Backdrop open={open} style={{ zIndex: "10"}}/>
    <SpeedDial
    ariaLabel="SpeedDial tooltip example"
    onClose={()=> setOpen(false)}
    onOpen={()=> setOpen(true)}
    className="speedDial"
    direction="down"
    open={open}
    style={{ zIndex: "11"}}
    icon={
        <img className='speedDialIcon' src={`/img/users/${user.photo}`} alt='profile'/>
    }
    >
        {option.map((item,idx)=>(
            <SpeedDialAction
            key={`header${idx}`} 
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            />
            ))}
    </SpeedDial>
    </>
    )
}

export default UserOption