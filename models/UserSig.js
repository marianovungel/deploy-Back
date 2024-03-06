const mongoose = require('mongoose');

const UserSigSchema = new mongoose.Schema({
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
        unique:true
    },
    sig: {
        type:Boolean,
        default: true
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("UserSig", UserSigSchema);