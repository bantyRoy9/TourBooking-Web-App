import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CgMouse } from "react-icons/cg";
// import { useAlert } from 'react-alert';
import { NavLink } from 'react-router-dom';

import MetaHead from '../layout/MetaHead'
import { getAllTour } from '../../actions/tourAction';
import Loading from '../layout/Loading/Loading';
import TourCard from './TourCard';
import './home.css'
import Form from '../layout/FilterForm/FilterForm';

const Home = () => {
    const dispatch = useDispatch();
    const { loading, error, tours } = useSelector((state) => state.tours)
    // const alert = useAlert();
    useEffect(() => {
        if (error) {
            // return alert.error(error)
            alert(error)
        }
        dispatch(getAllTour())
    }, [dispatch, error, alert])

    const generatePdf =()=>{
        const element= document.getElementById("containerDownload");
        // console.log(element);
       // html2pdf().from(element).save();
    }
    return (
        <>
            {loading ? <Loading /> : <>
                <MetaHead title='Natours' />
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
                <div className='homeHeading'>
                    <span>GREAT PLACES TO VISIT</span>
                    <h1>Search <span className='spans'>and Enjoy</span></h1>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam explicabo dignissimos ex quod consequuntur facilis repellendus incidunt repudiandae animi iure?</span>
                </div>
                {/* <hr />
                <button onClick={generatePdf}>download</button> */}
                </div>
                </>
            }
        </>
    )
}

export default Home