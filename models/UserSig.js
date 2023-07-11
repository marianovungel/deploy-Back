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
        default: "74d5d28e4db58837d16d30eb57d8e8e6"
    },
    whatsapp: {
        type:String,
        default: "",
        required:true,
        unique:true
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("UserSig", UserSigSchema);