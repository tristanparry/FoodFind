import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import marker_icon from '../../SVG/logo.svg';
import location_marker from '../../SVG/you_are_here.svg';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../CSS/FindCSS.css';

const MAPPING_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/food.json?limit=10&proximity=`;
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
let restaurantsList = []; // Values are pushed to this array later, when the user saves locations to their account

export default function Find(props) {
    // ACCESSING THE PROPS
    const { username, setSavedArray } = props;

    // DEFINING THE STATE
    const [map, setMap] = useState({ // Defines the state for the map
        latitude: 0,
        longitude: 0,
        width: "100vw",
        height: "100vh",
        zoom: 13
    });
    const [point, setPoint] = useState({ // Defines the state for the user's location point
        latitude: 0,
        longitude: 0
    });
    const [locations, setLocations] = useState([]); // Defines the state for the shown restaurants on the map
    const [selectedLocation, setSelectedLocation] = useState(); // Defines the state for the user's selected restaurant

    // INITIALIZING THE MAP VIEW AND STATE WITH useEffect() HOOK
    useEffect(() => {
        axios.get(`/userHandler/`+username)
            .then(res => restaurantsList = res.data[0].savedRestaurantsList);
        return new Promise(() => {
            navigator.geolocation.getCurrentPosition(position => {
                setMap({ // Set the map state
                    latitude: position.coords.latitude, // Uses the JavaScript geolocation API to get the latitude
                    longitude: position.coords.longitude, // Uses the JavaScript geolocation API to get the longitude
                    width: "100vw",
                    height: "100vh",
                    zoom: 13
                });
                setPoint({ // Set the user's location state
                    latitude: position.coords.latitude, // Uses the JavaScript geolocation API to get the latitude
                    longitude: position.coords.longitude // Uses the JavaScript geolocation API to get the longitude
                });
            });
        }) // eslint-disable-next-line
    }, []); // Called when the component initially loads

    // SETTING THE FOUND API LOCATIONS
    useEffect(() => {
        fetch(`${MAPPING_URL}${point.longitude},${point.latitude}&access_token=${TOKEN}`)
            .then(res => res.json())
            .then(data => {
                setLocations([...data.features].map(location => { // Uses the Spread (...) operator to destructure the "features" array returned by the Mapbox API + Set the locations' state
                    return { // Map over the "features" array, returning a new array of Objects with name, address, longitude and latitude
                        name: location.text,
                        address: location.place_name.substring(location.place_name.indexOf(", ") + 2),
                        longitude: location.center[0],
                        latitude: location.center[1]
                    };
                }));
            });
    }, [point]); // Locations are updated every time the current point changes

    // RENDER THE MAP WINDOW
    return (
        <ReactMapGL
            {...map} // Uses the Spread (...) operator to destructure the values in the map object
            mapboxApiAccessToken={TOKEN}
            mapStyle="mapbox://styles/tristanparry/ckqud1uyq06n317o4or3ytvld" // Custom map style I created
            onViewportChange={view => setMap(view)} // Handles the map changes through the useState() hook, with the map mutator method
            style={{ backgroundColor: "#BFC9D2" }} // Manually sets the background colour of the ReactMapGL HTML element
            onClick={e => { // When the user clicks on the map...
                setPoint({ // Set the state of the user's map location
                    longitude: e.lngLat[0],
                    latitude: e.lngLat[1]
                });
                setSelectedLocation(null); // Set the state of the selected location to null (if a user had a selected location, they do not anymore)
            }}
        >
            <Marker // Marker for the user's map location
                latitude={point.latitude}
                longitude={point.longitude}
            ><img src={location_marker} alt="" height={map.zoom * 4} /></Marker>

            {locations.map(location => { // Map over the "locations" array, returning a new array of Markers with the location attributes
                return <Marker className="marker" key={location.name + location.address} latitude={location.latitude} longitude={location.longitude} onClick={e => setSelectedLocation(location)}>
                    <button style={{ border: "none", background: "none", cursor: "pointer" }}><img src={marker_icon} alt="" height={map.zoom * 3} /></button>
                </Marker>
            })}

            {selectedLocation ? // If a selected location exists, render its Popup (see below), otherwise, render no Popup (null)
                (<Popup latitude={selectedLocation.latitude} longitude={selectedLocation.longitude} closeOnClick={false} onClose={() => setSelectedLocation(null)} className="popup">
                    <div>
                        <span className="popupName">{selectedLocation.name}</span>
                        <span className="popupAddress">{selectedLocation.address}</span>
                        <button className="saveButton" onClick={() => {
                            axios.get(`/userHandler/`+username)
                                .then(res => {
                                    const contained = res.data[0].savedRestaurantsList.some(element => // Checks if a restaurant in the user's saved list is being duplicated
                                        (element.name === selectedLocation.name) && (element.address === selectedLocation.address));
                                    if (!contained) { // If the selected location is not already in the user's list, it can be saved
                                        restaurantsList.push(selectedLocation);
                                        axios.put(`/userHandler/`+username, { savedRestaurantsList: restaurantsList });
                                        setSavedArray(restaurantsList); // Accesses the method in the setSavedArray prop, passing it the restaurantsList as a parameter
                                    }
                                });
                        }}>Save</button>
                    </div>
                </Popup>) : null}
        </ReactMapGL>
    );
}
