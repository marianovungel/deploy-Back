const mongoose = require('mongoose');

const Hello = mongoose.model('Hello', { 
    text: String 
});

module.exports = Hello;