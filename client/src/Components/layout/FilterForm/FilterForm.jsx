import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './form.css'
import "react-datepicker/dist/react-datepicker.css";
import Button from '../Button/Button';
import Input from '../Input/Input';
const sortInitialize = {
    search:'',
    difficulty:'',
    createAt:'',
    gtePrice:'',
    ltePrice:''
}
const Form = ({styles}) => {
    const [ sorted , setSorted] = useState(sortInitialize);
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
                <Input type="text" name='search' placeholder='Tours keyword' onChange={changehandle}/>
                <Input type="text" name='difficulty' placeholder='Select your destination' onChange={changehandle}/>
                <Input type='text' name='createAt'  placeholder='Departure date' onFocus={(e)=>e.target.type='month'} onBlur={(e)=>e.target.type='text'} onChange={changehandle}/>
                <Input type="number" name='gtePrice' placeholder='Price from' onChange={changehandle}/>
                <Input type="number" name='ltePrice' placeholder='Price to' onChange={changehandle}/>
                <Input type="number" name='ltePrice' placeholder='Price to' onChange={changehandle}/>
                <Button className={"btn btn-primary"} type={'submit'} title="Find your tour"/>
            </form>
        </div>
    </>
    )
}

export default Form