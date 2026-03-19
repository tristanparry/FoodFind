const express = require('express');
const router = express.Router();
const User = require('../models/user.js'); // Obtain the userSchema from (../models/user.js), to be used in server Routes


// FUNCTION TO OBTAIN A USER'S MONGODB DOCUMENT
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.find({ username: req.params.username }); // Find a userSchema in MongoDB that has a matching username
        if (!user.length) { // If there is no user with the passed username
            return res.status(404).json({ message: "User not found" }); // 404 = Not found
        }
    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 = Internal server error
    }
    res.user = user; // Sets the res variable to the found user MongoDB document
    next(); // Transitions to the middleware, between the server backend and app frontend
}


// CREATE A USER
router.post("/", async (req, res) => {
    const newUser = new User({ // Create a user with the userSchema + passed route parameters (JSON body)
        username: req.body.username,
        password: req.body.password,
        savedRestaurantsList: []
    });

    try {
        const createdUser = await newUser.save(); // Save the created user in the MongoDB database
        res.status(201).json(createdUser); // 201 - Success, created new object
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 = Bad request, incorrect user syntax
    }
});


// GET A USER
router.get("/:username", getUser, (req, res) => { // Route with username parameter passed in the URL
    res.status(200).json(res.user); // 200 - Success, returns the res.user set in the getUser() function (above)
});


// UPDATING USER'S SAVED RESTAURANT LIST
router.put("/:username", async (req, res) => { // Route with username parameter passed in the URL
    try {
        const updatedUser = await User.updateOne({ username: req.params.username }, req.body); // Updates the MongoDB document with a matching User structure
        res.status(200).json(updatedUser); // 200 - Success
    } catch (err) {
        res.status(400).json({ message: err.message }); // 400 = Bad request, incorrect user syntax
    }
});


// EXPORT THE userHandler MODULE, TO BE USED BY THE EXPRESS SERVER
module.exports = router;