const mongoose = require('mongoose');

const UserGSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:false
    },
    profilePic:{
        type:String,
        required:false,
        unique:false,
        default: "https://static.thenounproject.com/png/363640-200.png"
    },
    whatsapp: {
        type:String,
        default: "",
        required:false,
        unique:false
    },
    sig: {
        type:Boolean,
        default: true
    },
    sub: {
        type:String,
        required:false,
        unique:false
    },

},
    {timestamps: true}
);

module.exports = mongoose.model("UserG", UserGSchema);