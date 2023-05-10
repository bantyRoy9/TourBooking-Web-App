import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './form.css'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
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
        console.log(sorted);
        navigate(`/tours/search=${sorted.search}&difficulty=${sorted.difficulty}&price[gte]=${sorted.gtePrice}&price[lte]=${sorted.ltePrice}`)
        // {search: 'the', difficulty: 'easy', createAt[gte]: '2022-01', price[gte]: '200', price[lte]: '500'}
    }

  return (
    <>  
        <div className={`form-container ${styles}`}>
            <form onSubmit={submithandler}>
           {/* <Box className='row col-md-12'>
                <div className="col-md-3">
                    <TextField className='col-md-12' label="Tours Keyword" placeholder='Tours keyword'/>
                </div>
                <div className="col-md-3">
                {/* <DatePicker selected={selectDate} /> 
                <FormControl className='col-md-12'>
                    <InputLabel>Age</InputLabel>
                    <Select>
                    <MenuItem value="10">10</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div className="col-md-3">
                    <TextField className='col-md-12' label="Tours Keyword" placeholder='Tours keyword'/>
                </div>
                <div className="col-md-3">
                    <TextField  label=""/>
                </div>
            </Box>*/}
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