import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { useAlert } from 'react-alert';
import { useParams, NavLink } from 'react-router-dom';
// import Loading from '../layout/Loading/Loading';
import { getAllTour, getTourDetail } from '../../actions/tourAction';
import TourInfo from '../TourNav/TourInfo/TourInfo';
import TourPlan from '../TourNav/TourPlan/TourPlan';
import TourLocation from '../TourNav/TourLocation/TourLocation';
import TourGallery from '../TourNav/TourGallery/TourGallery';
import TourCard from '../home/TourCard';
import Form from '../layout/FilterForm/FilterForm';
import './tour.css'


const Product = ({ match }) => {
  const { id } = useParams()
  const [sroller, setsroller] = useState({})
  const [count, setCount] = useState(1)
  const dispatch = useDispatch();
  const { loading, error, tour } = useSelector((state) => state.tour)
  const { tours } = useSelector((state) => state.tours)
  // const alert = useAlert();
  useEffect(() => {
    if (error) {
      // return alert.error(error)
      alert(error)
    }
    dispatch(getTourDetail(id))
    dispatch(getAllTour())
  }, [dispatch, error, alert])


  window.onscroll = function () {
    let offset = window.pageYOffset;
    setsroller({ backgroundPositionY: offset * 0.5 + 'px' })
  }
  return (
    <>
      <div className="tourPage">
        <section className='tour-slider' >
          <img src={`/img/tours/${tour.imageCover}`} alt="" style={sroller} />
          <div className="tour-title">
            {tour.name}
          </div>
        </section>
        <section className='tour-infos'>
          <span>Special offer</span>
          <div className="tour-info">
            <i className="fa-solid fa-wallet"></i>
            <div className="info">
              <span>Price</span>
              <strong>₹{tour.price}<span>per</span> <i className="fa-solid fa-user"></i></strong>
            </div>
          </div>
          <div className="tour-info">
            <i className="fa-solid fa-clock"></i>
            <div className="info">
              <span>Duration</span>
              <strong>{tour.duration} Days</strong>
            </div>
          </div>
          <div className="tour-info">
            <i className="fa-solid fa-location"></i>
            <div className="info">
              <span>Destination</span>
              <strong></strong>
            </div>
          </div>
          <div className="tour-info">
            <i className="fa-solid fa-user-plus"></i>
            <div className="info">
              <span>Travellers</span>
              <strong>{tour.maxGroupSize}</strong>
            </div>
          </div>
          <div className="home-slider-btn tour-booking-btn">
            <NavLink to='/booking' ><button className='book-btn'>Book this tour</button></NavLink>
          </div>
        </section>
        <section className='tour-block'>
          <div className="tour-block-left">
            <div className="tour-block-left_section1">
              <div className="tbl-span">
                {tour.summary}
                {/* Experience england first hand */}
              </div>
              <div className="tbl-heading">
                Be simply <strong>British</strong>
              </div>
              <div className="tbl-description">
                {tour.description}
                {/* This city is deeply multicultural, with one in three Londoners foreign-born, representing 270 nationalities and 300 tongues. London is as much about wide-open vistas and leafy landscape escapes as it is high-density, sight-packed urban exploration. */}
              </div>
            </div>
            <div className="tour-block-left_section2">
            </div>
            <div className="tour-bloc-left_nav">
              <header className="header header-tour">
                <nav className="nav nav--tours">
                  <ul className="nav_list">
                    <NavLink to=' ' onClick={() => setCount(1)}><li>Information</li></NavLink>
                    <NavLink to=' ' onClick={() => setCount(2)}><li>Tour Plan</li></NavLink>
                    <NavLink to=' ' onClick={() => setCount(3)}><li>Location</li></NavLink>
                    <NavLink to=' ' onClick={() => setCount(4)}><li>Gallery</li></NavLink>
                    <NavLink to=' ' onClick={() => setCount(5)}><li>Reviews</li></NavLink>
                    <NavLink to=' ' onClick={() => setCount(6)}><li>Similar Tour</li></NavLink>
                  </ul>
                </nav>
              </header>
            </div>
            <div className="tour-block-left_section3">
              {count === 1 && tour && <TourInfo tour = {tour} />}
              {count === 2 && <TourPlan />}
              {count === 3 && tour && <TourLocation locations = {tour.locations}/>}
              {count === 4 && <TourGallery />}

            </div>
            <div className="tour-block-left-footer">
              <footer className='tbl-footer'>
                <div className="tbl-btn">
                  <NavLink to=' '><button>ENGLAND</button></NavLink>
                  <NavLink to=' '><button>EUROPE</button></NavLink>
                  <NavLink to=' '><button>INDIA</button></NavLink>
                </div>
                <div className="tbl-social">
                  <span>Share on social network</span>
                  <i className='fa-brands fa-facebook-f'></i>
                  <i className='fa-brands fa-twitter'></i>
                  <i className='fa-brands fa-linkedin-in'></i>
                </div>
              </footer>
              <hr />
              <div className="home-slider-btn tour-booking-btn tour-booking-footer">
                `    <NavLink to='/booking' ><button className='book-btn'>Book this tour</button></NavLink>
              </div>
            </div>
          </div>
          <div className="tour-block-right">
            {/* <div className="tbr-search">
              <h1>Search Tours</h1>
              <form action="">
                <input type="text" placeholder='Keyword' />
                <input type="text" placeholder='select your destination' />
                <input type='date' placeholder='departure date' />
                <input type="number" placeholder='price from' />
                <input type="number" placeholder='price to' />
                <input type="submit" placeholder='find your tour' value='Find Your Tour' />
              </form>
            </div> */}
            <Form styles={'tbr-search'}/>
            <div className="tbr-search tbr-newlate">
              <form action="">
                <h1>Newsletter</h1>
                <span>Subscribe to Travelicious newsletter and get new offers and discounts to your inbox!</span>
                <input type="email" placeholder='Enter your Email Address' />
                <input type="submit" placeholder='find your tour' value='Subscribe Now!' />
              </form>
            </div>
            <div className="tbr-container" id="container">
              {
                tours && tours.map(tour => (
                  <NavLink to={`/tour/${tour._id}`}>
                    <div className="card tbr-card">
                      <span>₹{tour.price}</span>
                      <div className="card__header">

                        <div className="card__picture">
                          <div className="card__picture-overlay">&nbsp;</div>
                          <img
                            src={`/img/tours/${tour.imageCover}`}
                            alt="Tour 1"
                            className="card__picture-img"
                          />
                        </div>

                        <h3 className="heading-tertirary">
                          <span>{tour.name}</span>
                        </h3>
                      </div>
                    </div>

                  </NavLink>
                ))
              }

            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Product