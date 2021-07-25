import React from 'react';
import SavedRow from './SavedRow.js';
import axios from 'axios';

export default function Saved(props) {
    // ACCESSING THE PROPS
    const { username, savedArray } = props;

    // RENDER THE SAVED WINDOW
    return (
        <>
            <div className="savedRestaurants">
                {savedArray.map(restaurant => <SavedRow key={restaurant.name + restaurant.address} restaurantName={restaurant.name} restaurantAddress={restaurant.address}
                // Map over the savedArray of restaurants, returning a SavedRow component for each one
                restaurantDelete={e => {
                    e.target.closest(".row").remove(); // Remove the SavedRow from the view
                    axios.get(`/userHandler/`+username)
                        .then(res => {
                            const deleteObjectText = (e.target.closest(".row").getElementsByClassName("info"))[0].innerText; // Get the text from the object to delete
                            const index = savedArray.findIndex(element => (element.name + element.address) === deleteObjectText); // Find the index of the array object with the retrieved text
                            savedArray.splice(index, 1); // Delete the restaurant at the found index
                            axios.put(`/userHandler/`+username, { savedRestaurantsList: savedArray }); // Update the database array of saved restaurants
                        });
                }}/>)}
            </div>
            <div id="hearts"></div>
        </>
    );
}
