import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './search.css'

const Search = ({ isOpen, openModal }) => {
    const [ keyword , setKeyword] = useState('');
    const navigate = useNavigate()
    const search =(e)=>{
        e.preventDefault()
        openModal('close')
        navigate(`/tours/search=${keyword}`);
    }
      return (
    <>
        <form className={`searchForm ${isOpen}`} action="" onSubmit={search}>
            <div className="close"><i className='fa-solid fa-xmark' onClick={()=>openModal('close')}></i></div>
            <input type="text"
             placeholder='Search Tours Here ...'
             onChange={(e)=> setKeyword(e.target.value)}/>
            <input type="submit" value={'Search'} />
        </form>
    </>
  )
}

export default Search