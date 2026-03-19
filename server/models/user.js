const mongoose = require('mongoose');

// CREATE THE USER SCHEMA MODEL (MONGOOSE SCHEMA)
const userSchema = new mongoose.Schema({ // Schema made to be recognized/used by the MongoDB database (Mongoose interprets MongoDB documents as Objects with this structure)
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    savedRestaurantsList: {
        type: Array,
        required: true
        // Originally passed 'default: []' but this later became unnecessary
    }
});

module.exports = mongoose.model("User", userSchema); // Exports the userSchema to be utilized by the server's Routes (../routes/userHandler.js)