import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './form.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
const sortInitialize = {
    search:'',
    difficulty:'',
    createAt:'',
    gtePrice:'',
    ltePrice:''
}
const Form = ({styles}) => {
    const [ sorted , setSorted] = useState(sortInitialize);
    const [selectDate, setSelectDate] = useState(new Date());
    const navigate = useNavigate();
    const changehandle =(e)=> {
        setSorted({...sorted, [e.target.name]: e.target.value})
    }
    const submithandler =(e)=>{
        e.preventDefault();
        navigate(`/tours/search=${sorted.search}&difficulty=${sorted.difficulty}&price[gte]=${sorted.gtePrice}&price[lte]=${sorted.ltePrice}`)
    }

  return (
    <>  
        <div className={`form-container ${styles}`}>
            <form onSubmit={submithandler}>
                <input type="text" name='search' placeholder='Tours Keyword' onChange={changehandle}/>
                <input type="text" name='difficulty' placeholder='select your destination' onChange={changehandle}/>
                <input type='text' name='createAt'  placeholder='departure date' onFocus={(e)=>e.target.type='month'} onBlur={(e)=>e.target.type='text'} onChange={changehandle}/>
                <input type="number" name='gtePrice' placeholder='price from' onChange={changehandle}/>
                <input type="number" name='ltePrice' placeholder='price to' onChange={changehandle}/>
                <input type="submit" placeholder='find your tour' value='Find Your Tour' />
            </form>
        </div>
    </>
    )
}

export default Form