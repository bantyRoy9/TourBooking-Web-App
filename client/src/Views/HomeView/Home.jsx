import React, { useEffect, useRef, useState } from "react";
import { TourCard, FilterForm as Form, Alert } from "../../Components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllTour } from "../../Redux";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const { error, tours } = useSelector((state) => state.tours);

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    error && Alert(error, "E");
    tours && !tours.length && dispatch(getAllTour());

    const revealSection = (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    if (containerRef.current) {
      sectionObserver.observe(containerRef.current);
    }

    return () => {
      sectionObserver.disconnect();
    };
  }, [dispatch, error, tours]);

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
      <section ref={containerRef} className={`section ${isVisible ? "" : "section--hidden"} homeHeading`}>
        <span>GREAT PLACES TO VISIT</span>
        <h1>
          Search <b className="spans">and Enjoy!</b>
        </h1>
        <span>
          Compellingly embrace empowered e-business after user friendly
          intellectual capital. Interactively actualize front-end processes with
          effective convergence.
        </span>
      </section>
      <section
        ref={containerRef}
        className={`section ${isVisible ? "" : "section--hidden"} container`}
      >
        {tours && tours.length ? (
          tours.map((tour) => (
            <NavLink key={tour._id} to={`/tour/${tour._id}`}>
              <TourCard tour={tour} />
            </NavLink>
          ))
        ) : (
          <div className="notFound">
            <h1>Tours Not Found</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
