import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useLocation } from 'react-router-dom';
import TourInfo from '../../Components/TourNav/TourInfo/TourInfo';
import TourPlan from '../../Components/TourNav/TourPlan/TourPlan';
import TourLocation from '../../Components/TourNav/TourLocation/TourLocation';
import TourGallery from '../../Components/TourNav/TourGallery/TourGallery';
import Form from '../../Components/layout/FilterForm/FilterForm';
import { getAllTour, getTourDetail } from '../../Redux';
import './tour.css'


const Product = ({ match }) => {
  const { id } = useParams()
  const [sroller, setsroller] = useState({})
  const { pathname } = useLocation();
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
    window.scrollTo(0,0);
    dispatch(getTourDetail(id));
    dispatch(getAllTour());
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
                <nav className="navlist nav--tours">
                  <ul className="nav_list">
                  <li><NavLink to=' ' className={count === 1 && 'active'} onClick={() => setCount(1)}>Location</NavLink></li>
                    <li><NavLink to=' ' className={count === 2 && 'active'} onClick={() => setCount(2)}>Information</NavLink></li>
                    <li><NavLink to=' ' className={count === 3 && 'active'} onClick={() => setCount(3)}>Tour Plan</NavLink></li>
                    <li><NavLink to=' ' className={count === 4 && 'active'} onClick={() => setCount(4)}>Gallery</NavLink></li>
                    <li><NavLink to=' ' className={count === 5 && 'active'} onClick={() => setCount(5)}>Reviews</NavLink></li>
                    <li><NavLink to=' ' className={count === 6 && 'active'} onClick={() => setCount(6)}>Similar Tour</NavLink></li>
                  </ul>
                </nav>
              </header>
            </div>
            <div className="tour-block-left_section3">
              {count === 1 &&  Object.keys(tour).length && <TourLocation locations = {tour.locations}/>}
              {count === 2 &&  Object.keys(tour).length && <TourInfo tour = {tour} />}
              {count === 3 && <TourPlan />}
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