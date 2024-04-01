import React, { useEffect } from "react";
import { TourCard, FilterForm as Form,Alert} from "../../Components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTour } from "../../Redux";
import "./home.css";
const Home = () => {
  const dispatch = useDispatch();
  const { error, tours } = useSelector((state) => state.tours);
  useEffect(() => {
    error &&  Alert(error, "E");
    tours && !tours.length && dispatch(getAllTour());
  }, []);

  return (
    <>
      <div className="banner">
        <main className="home-slider">
          <div className="home-location"></div>
          <div className="home-sublocation"></div>
          <div className="home-description">
            Recognizable, lovely,passionate and forever yours ...
          </div>
          <div className="home-slider-btn">
            <NavLink to="/des">
              <button className="des-btn">Discover </button>
            </NavLink>
            <NavLink to="/booking">
              <button className="book-btn">Book Your Trip </button>
            </NavLink>
          </div>
        </main>
      </div>
      <div className="home-form-container">
        <span>Search Tours</span>
        <Form styles="home-form" />
      </div>
      <div className="homeHeading">
        <span>GREAT PLACES TO VISIT</span>
        <h1>
          Search <b className="spans">and Enjoy!</b>
        </h1>
        <span>
          Compellingly embrace empowered e-business after user friendly
          intellectual capital. Interactively actualize front-end processes with
          effective convergence.
        </span>
      </div>
        <div className="container" id="container">
          {(tours && tours.length) ? tours.map((tour) => (
              <NavLink to={`/tour/${tour._id}`}>
                <TourCard tour={tour} />
              </NavLink>
            )) : <div className="notFound">
                <h1>Tours Not Found</h1>
            </div>} 
        </div>
    </>
  );
};

export default Home;
