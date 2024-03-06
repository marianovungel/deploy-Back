const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default: "https://static.thenounproject.com/png/363640-200.png"
    },
    whatsapp: {
        type:String,
        default: "",
        required:true,
    },
    sig: {
        type:Boolean,
        default: false
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);