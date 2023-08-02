import React from 'react'
import MapBox, { displayMap } from '../../layout/MapBox/MapBox'
import './tourlocation.css'

    var location =[
        {
          "_id": "5c88fa8cf4afda39709c2954",
          "description": "Banff National Park",
          "type": "Point",
          "coordinates": [-116.214531, 51.417611],
          "day": 1
        },
        {
          "_id": "5c88fa8cf4afda39709c2953",
          "description": "Jasper National Park",
          "type": "Point",
          "coordinates": [-118.076152, 52.875223],
          "day": 3
        },
        {
          "_id": "5c88fa8cf4afda39709c2952",
          "description": "Glacier National Park of Canada",
          "type": "Point",
          "coordinates": [-117.490309, 51.261937],
          "day": 5
        }
      ]
const TourLocation = ({locations}) => {
  // console.log(locations);
      // const string = JSON.stringify(location);
    // const locations = JSON.parse(string);
    //   const map = displayMap()
    //   console.log(map);
  return (
    <section id='map'><MapBox locations ={locations} /></section>
  )
}

export default TourLocation