import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './search.css'

const Search = () => {
    const [ keyword , setKeyword] = useState('');
    const navigate = useNavigate()
    const search =(e)=>{
        e.preventDefault()
        navigate(`/tours/search=${keyword}`)
    }
      return (
    <>
        <form className='searchForm' action="" onSubmit={search}>
            <input type="text"
             placeholder='Search Tours Here ...'
             onChange={(e)=> setKeyword(e.target.value)}/>
            <input type="submit" value={'Search'} />
        </form>
    </>
  )
}

export default Search