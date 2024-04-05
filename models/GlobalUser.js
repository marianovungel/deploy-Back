const mongoose = require('mongoose');

const GlobalUserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    profilePic:{
        type:String,
        default: "https://static.thenounproject.com/png/363640-200.png"
    },
    whatsapp: {
        type:String,
        default: "",
        required:true,
        unique:false
    },
    sig: {
        type:Boolean,
        default: true
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("GlobalUser", GlobalUserSchema);