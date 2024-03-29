import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <hr />
        <div className="footer">
          <div className="explore">
            <strong>Destinations</strong>
            <Link to={""}>
              <p>Europe</p>
            </Link>
            <Link to={""}>
              <p>North America</p>
            </Link>
            <Link to={""}>
              <p>Pacific</p>
            </Link>
            <Link to={""}>
              <p>South America</p>
            </Link>
            <Link to={""}>
              <p>Asia</p>
            </Link>
            <Link to={""}>
              <p>Africa</p>
            </Link>
            <Link to={""}>
              <p>Middle East</p>
            </Link>
            <Link to={""}>
              <p>Carribbean</p>
            </Link>
            <Link to={""}>
              <p>Australia</p>
            </Link>
            <Link to={""}>
              <p>More</p>
            </Link>
          </div>
          <div className="popular">
            <strong>Cities</strong>
            <Link to={""}>
              <p> Berlin</p>
            </Link>
            <Link to={""}>
              <p>London</p>
            </Link>
            <Link to={""}>
              <p>Barcelona</p>
            </Link>
            <Link to={""}>
              <p>New York</p>
            </Link>
            <Link to={""}>
              <p>Tokyo</p>
            </Link>
            <Link to={""}>
              <p>Sao Paolo</p>
            </Link>
            <Link to={""}>
              <p>Moscow</p>
            </Link>
            <Link to={""}>
              <p>Belgrade</p>
            </Link>
            <Link to={""}>
              <p>Zagreb</p>
            </Link>
            <Link to={""}>
              <p>More</p>
            </Link>
          </div>
          <div className="calculator">
            <strong>Interests</strong>
            <Link to={""}>
              <p>Adventure</p>
            </Link>
            <Link to={""}>
              <p>Family Holidays</p>
            </Link>
            <Link to={""}>
              <p>Festivals</p>
            </Link>
            <Link to={""}>
              <p>Wildlife</p>
            </Link>
            <Link to={""}>
              <p>Cruises</p>
            </Link>
            <Link to={""}>
              <p>Backpacking</p>
            </Link>
            <Link to={""}>
              <p>Faraway Travels</p>
            </Link>
            <Link to={""}>
              <p>Honeymoon and Romancing</p>
            </Link>
            <Link to={""}>
              <p>Budget Travels</p>
            </Link>
            <Link to={""}>
              <p>More</p>
            </Link>
          </div>
          <div className="others">
            <strong>About</strong>
            <Link to={""}>
              <p>lorem</p>
            </Link>
            <Link to={""}>
              <p>About Travelicious</p>
            </Link>
            <Link to={""}>
              <p>Our Guides</p>
            </Link>
            <Link to={""}>
              <p>Tour prices</p>
            </Link>
            <Link to={""}>
              <p>FAQs</p>
            </Link>
            <Link to={""}>
              <p>Contact us</p>
            </Link>
            <Link to={""}>
              <p>Location</p>
            </Link>
            <Link to={""}>
              <p>Testimonials</p>
            </Link>
            <Link to={""}>
              <p>Clients</p>
            </Link>
          </div>
          <div className="rate">
            <strong>Shop</strong>
            <Link to={""}>
              <p>Shop</p>
            </Link>
            <Link to={""}>
              <p>Mugs</p>
            </Link>
            <Link to={""}>
              <p>T Shirts</p>
            </Link>
            <Link to={""}>
              <p>Backpacks</p>
            </Link>
            <Link to={""}>
              <p>Guides</p>
            </Link>
            <Link to={""}>
              <p>Books</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
