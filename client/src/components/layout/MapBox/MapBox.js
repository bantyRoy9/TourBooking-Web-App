
import react, { useEffect, useRef, useState } from "react";
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiYmFudHk5NzE2IiwiYSI6ImNreW43YXBxMjFhangydXBrbWhmMnVreXgifQ.zpJZbJIuwM98HKQu69i1-g';


const MapBox = ({ locations }) => {
    console.log();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(locations[0].coordinates);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
// console.log(lng);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/banty9716/cl21lc1b200ad14pi9tr0t8is',
        //   scrollZoom:false,
          center:lng,
          zoom: 6
        });
    });
    useEffect(()=>{
        const bounds = new mapboxgl.LngLatBounds();
        locations.forEach(loc => {
            const el = document.createElement('div')
            el.className = 'marker';
            // console.log(el);
            new mapboxgl.Marker({
                element: el,
                anchor:'bottom'
            }).setLngLat(loc.coordinates).addTo(map.current)

            new mapboxgl.Popup({
                offset: 30
            }).setLngLat(loc.coordinates)
                .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
                .addTo(map.current)
        
            bounds.extend(loc.coordinates);
        });
    },[])

      return (
        <div>
          <div ref={mapContainer} className="map-container" style={{height:'400px'}}/>
        </div>
      )
}

export default MapBox