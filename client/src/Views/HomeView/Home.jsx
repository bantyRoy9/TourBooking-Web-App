import React, { useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { useAlert } from 'react-alert';
import Form from '../../Components/layout/FilterForm/FilterForm';
import Loading from '../../Components/layout/Loading/Loading';
import MetaHead from '../../Components/layout/MetaHead'
import { getAllTour } from '../../actions/tourAction';
import TourCard from '../../Components/Cards/TourCard';
import './home.css'
import Alert from '../../Components/layout/Alert/Alert';

const Home = () => {
    const dispatch = useDispatch();
    const { error, tours } = useSelector((state) => state.tours)
    useEffect(() => {
        if (error) {
        }
        !tours.length &&  dispatch(getAllTour())
    }, [dispatch, error, alert])
    
    return (
            <>
                <MetaHead title='Tour Booking App' />
                <div className="banner">
                    <main className='home-slider'>
                        <div className="home-location"></div>
                        <div className="home-sublocation"></div>
                        <div className="home-description">Recognizable, lovely,passionate and forever yours ...</div>
                        <div className="home-slider-btn">
                            <NavLink to='/des' ><button className='des-btn'>Discover </button></NavLink>
                            <NavLink to='/booking' ><button className='book-btn'>Book Your Trip </button></NavLink>
                        </div>
                    </main>
                </div>
                <div className="home-form-container">
                    <span>Search Tours</span>
                    <Form styles='home-form'/>
                </div>
                <div className='homeHeading'>
                    <span>GREAT PLACES TO VISIT</span>
                    <h1>Search <span className='spans'>and Enjoy</span></h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam explicabo dignissimos ex quod consequuntur facilis repellendus incidunt repudiandae animi iure?</span>
                </div>
                <div id='containerDownload'>
                <div className="container" id="container">
                    {tours && tours.map(tour => (
                            <NavLink to={`/tour/${tour._id}`}>
                            <TourCard tour={tour} />
                            </NavLink>
                    ))}
                </div>

                <div className='homeHeading'>
                    <span>GREAT PLACES TO VISIT</span>
                    <h1>Search <span className='spans'>and Enjoy</span></h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam explicabo dignissimos ex quod consequuntur facilis repellendus incidunt repudiandae animi iure?</span>
                </div>
                <div className="container" id="container">

                    {tours && tours.map(tour => (
                            <NavLink to={`/tour/${tour._id}`}>
                            <TourCard tour={tour} />
                            </NavLink>
                    ))}
                </div>
                </div>
        </>
    )
}

export default Home