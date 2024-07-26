
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
    DATE: {
        type: String,
        required: true,
    },
    STRINGARRAY: { 
        type: Array,
        required: true,
    },
    SCORES: { 
        type: Array, 
        required: true,
    }
    
}, { collection: 'Games' }); // Specify the collection name here

// Set the connection explicitly
module.exports = mongoose.model('Game', gamesSchema, 'Games');