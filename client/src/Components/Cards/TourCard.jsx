import React from 'react'
import moment from 'moment'
const TourCard = ({tour,cardStyle,keyIndex}) => {
  return (
    <>
        <div className={`card ${cardStyle}`} key={keyIndex}>
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

           <div className="card__details">
            <h4 className="card__sub-heading">{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
            <p className="card__text">
              {tour.summary}
            </p>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin"></use>

              </svg>
              <span>{tour.startLocation.description}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-calendar"></use>
              </svg>
              <span>{`${moment(tour.createAt).format('MMMM YYYY') }`}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-flag"></use>
              </svg>
              <span>{`${tour.locations.length} stops`}</span>
            </div>
            <div className="card__data">
              <svg className="card__icon">
                <use xlinkHref="img/icons.svg#icon-user"></use>
              </svg>
              <span>{tour.maxGroupSize} people</span>
            </div>
          </div> 
        </div>    
    </>
    )

}

export default TourCard