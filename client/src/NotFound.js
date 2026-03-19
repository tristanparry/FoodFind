import React from 'react';
import logo from './SVG/logo.svg';
import './App.css';

export default function NotFound() {
    return (
        <div className="wrapper">
            <div id="notFound">
                <div id="fourOFour">
                    <span>4</span>
                    <span><img src={logo} alt="" height="180px" id="logo" /></span>
                    <span>4</span>
                </div>
                <div id="errorMsg">FoodNotFound.</div>
            </div>
        </div>
    );
}
