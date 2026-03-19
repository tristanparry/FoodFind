import React from 'react';
import logo from '../../SVG/logo.svg';
import trash from '../../SVG/trash.svg';
import '../CSS/SavedCSS.css';

export default function SavedRow(props) {
    // ACCESSING THE PROPS
    const { restaurantName, restaurantAddress, restaurantDelete } = props;

    // RENDER THE ROW
    return (
        <div className="row" onClick={restaurantDelete} style={{ cursor: "pointer" }}>
            <img src={logo} alt="" height="60px" id="logo" />
            <div className="info">
                <span id="name">{restaurantName}</span>
                <span id="address">{restaurantAddress}</span>
            </div>
            <button style={{ border: "none", background: "none" }}><img src={trash} alt="Delete" height="30px" /></button>
        </div>
    );
}
