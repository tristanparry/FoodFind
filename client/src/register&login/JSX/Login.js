import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator'; // Validator is used below to trim (remove whitespace from) entered username/password values
import '../CSS/RegisterLoginCSS.css';
import logo_w_text from '../../SVG/logo_w_text.svg';
import background from '../../SVG/repeated_logo_w_text_background.svg'

export default function Login() {
    // DEFINE STATE
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [error, setError] = useState("hidden");
    const history = useHistory();

    // UPDATE BUTTON TO BE ENABLED/DISABLED BASED ON USER INPUT
    useEffect(() => {
        ((username === "") || (password === ""))  ?  setButtonDisabled(true)  :  setButtonDisabled(false);
    }, [username, password]); // Run every time the username or password are updated

    // RENDER THE REGISTER WINDOW
    return (
        <>
            <div className="header">
                <img src={logo_w_text} alt="FoodFind" height="80" />
            </div>
            <div id="usernameRow">
                <span className="textBox">Username</span>
                <input type="text" className="inputBox" onChange={change => setUsername(validator.trim(change.target.value.toLowerCase()))}></input>
            </div>
            <div id="passwordRow">
                <span className="textBox">Password</span>
                <input type="text" className="inputBox" onChange={change => setPassword(validator.trim(change.target.value))}></input>
            </div>
            <div id="bottomRow">
                <Link to="/" className="loginText"><span>Don't have an account?</span></Link>
                <button className="registerButton" disabled={buttonDisabled} onClick={() => {
                    // ACCESS CLIENT DOCUMENT IN MONGODB
                    if ((username !== "") && (password !== "")) {
                        axios.get(`/userHandler/`+username)
                            .then(res => {
                                (res.data[0].password === password)  ?  history.replace("/nav", { username: username, savedArray: res.data[0].savedRestaurantsList })  :  setError("visible");
                                // If the username/password combo match an account in the MongoDB database, redirect to the nav component, replacing the state with the user's
                                // username/saved restaurants. If the username/password combo is not correct, change the error's state so that it will show
                            })
                            .catch(err => {
                                if (err.response.status === 404) setError("visible");
                            });
                    }
                }}>Login</button>
                <p id="error" style={{ visibility: error }}>Invalid username/password. Try again.</p>
            </div>
            <div className="decoration" style={{ backgroundImage: `url(${background})` }}></div>
        </>
    );
}
