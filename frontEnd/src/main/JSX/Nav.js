import React from 'react';
import { Route, Link, Switch, BrowserRouter, useLocation } from 'react-router-dom';
import Find from './Find.js';
import Saved from './Saved.js';
import NotFound from '../../NotFound.js';
import logo_w_text from '../../SVG/logo_w_text.svg';
import '../CSS/NavCSS.css';

export default function Nav() {
    const location = useLocation(); // Gets the location the username was pushed from (the login component)

    // RENDER COMPONENT
    return (
        <BrowserRouter>
            <div className="logoTop">
                <Link to="/nav"><img src={logo_w_text} alt="FoodFind" height="80" /></Link>
            </div>
            <nav className="navBar">
                <ul>
                    <li><Link to="/nav">FIND</Link></li>
                    <li><Link to="/saved">SAVED</Link></li>
                    <li><a href="/login">LOGOUT</a></li>
                </ul>
            </nav>
            <div className="bodyContainer">
                <Switch>
                    <Route exact path="/nav" render={props => // Render the "Find" page with the following props
                        location.state !== undefined ? // If the state information is defined (if the user has just logged in)
                            <Find {...props} username={location.state.username} setSavedArray={array => location.state.savedArray = array} /> : // Render the "Find" page, passing the user info
                            <NotFound />} // If the user tries to access the page without logging in, they will get a 404
                    />
                    <Route exact path="/saved" render={props => // Render the "Saved" page with the following props
                        location.state !== undefined ? // If the state information is defined (if the user has just logged in)
                            <Saved {...props} username={location.state.username} savedArray={location.state.savedArray} /> : // Render the "Find" page, passing the user info
                            <NotFound />} // If the user tries to access the page without logging in, they will get a 404
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}
