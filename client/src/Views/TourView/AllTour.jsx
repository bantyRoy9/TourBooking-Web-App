import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import TourCard from '../../Components/Cards/TourCard'
import Form from '../../Components/layout/FilterForm/FilterForm';
import Pagination from 'react-js-pagination';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './tour.css'
import Alert from '../../Components/layout/Alert/Alert';
import { getAllTour } from '../../Redux';
const categories = ['adventure', 'wildlife', 'city-wander', 'festival', 'First Minute', 'new year']


const AllTour = () => {

  const [scroller, setScroller] = useState({});
  const [category, setCategory] = useState('');
  const [ sortBy, setSortBy] = useState('');
  const [catActive, setCatActive] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch();
  const { loading, error, tours, resultPerpage, length } = useSelector((state) => state.tours)

  const navigate = useNavigate();
  let { keyword } = useParams();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const changeTour = ()=>{
    setCategory('')
    setCatActive('')
    navigate('/tours')
  }

  const changeActive =()=>{
    // (catActive === 'categoriesActive') ? setCatActive(''): setCatActive('categoriesActive')
  }
  useEffect(() => {
    if (error) {
      Alert(error,"E");
    }
    dispatch(getAllTour(keyword, currentPage,category,sortBy))
  }, [keyword, currentPage,category,sortBy])

  window.onscroll = function () {
    let offset = window.pageYOffset;
    setScroller({ backgroundPositionY: offset * 0.5 + 'px' })
  }
  
  return (
    <>
          <section className='tour-slider tours-slider' style={scroller}>
            <div className="tour-title">
              Tour Search
            </div>
          </section>
          <div className="allTour-form-container">
            <Form styles='allTour-form' />
            <div className="categories" >
              <strong onClick={changeActive}>Categories: <i className="fa-solid fa-caret-down"></i></strong>
              <div className={`categoriesItem ${catActive}`}>
              <input type="radio" name='category' value={''} onClick={changeTour} />
                  <label htmlFor={'category'}>All Tours</label>
              {categories.map((category,idx) => (
                <>
                  <input key={`input${idx}`} type="radio" name='category' value={category} onClick={(e) => {setCategory(e.target.value); setCatActive('') }} />
                  <label key={`label${idx}`} htmlFor={category}> {category}</label><br />
                </>
              ))}
              </div>
            </div>
            <div className="sortedBy">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Sorted By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortBy}
                  label="Age"
                  color={'info'}
                onChange={(e)=> setSortBy(e.target.value)}
                >
                  <MenuItem value='createAt'>Sorted by date ascending</MenuItem>
                  <MenuItem value='-createAt'>Sorted by date descending</MenuItem>
                  <MenuItem value='name'>sort by name - A to Z</MenuItem>
                  <MenuItem value='-name'>sort by name - Z to A</MenuItem>
                  <MenuItem value='price'>sort by price - low to high</MenuItem>
                  <MenuItem value='-price'>sort by price - high to low</MenuItem>

                </Select>
              </FormControl>
            </div>
          </div>
          <div className="container" id="container">
            {tours && tours.length === 0 ? <h1>Sorry! Not Found ({category}) </h1> : <>
            {tours && tours.map((tour,idx) => (
              <NavLink key={`{navLink${idx}`} to={`/tour/${tour._id}`}>
                <TourCard tour={tour} cardStyle='tourcard' keyIndex={`tour${idx}`}/>
              </NavLink>
            ))}
            </>
            }
          </div>



          {resultPerpage < length &&  tours.length > 0 && 
            <div className="pagination">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerpage}
                totalItemsCount={length}
                onChange={setCurrentPageNo}
                nextPageText='next'
                prevPageText='prev'
                firstPageText='first'
                lastPageText='last'
                itemclassName='page-item'
                linkclassName='page-link'
                activeclassName='page-item-active'
                activeLinkclassName='page-link-active'
              />
            </div>
      }
    </>
  )
}

export default AllTour