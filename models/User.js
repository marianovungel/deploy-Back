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
        default: "74d5d28e4db58837d16d30eb57d8e8e6"
    },
    whatsapp: {
        type:String,
        default: "",
        required:true,
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);