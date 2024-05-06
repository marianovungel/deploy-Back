const mongoose = require('mongoose')

const OportSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
        type:String,
    },
    photo:{
        type:String,
    },
    local:{
        type:String,
    },
    data:{
        type:String,
    },
    hora:{
        type:String,
    },
    link:{
        type:String,
    },
    pdf:{
        type:String,
        // required:true,
    },
    insta:{
        type:String,
    },
    youtube:{
        type:String,
        default: "",
    },
    facebook:{
        type:String,
        default: "",
    },
    x:{
        type:String,
        default: "",
    }
},
    {timestamps: true}
);

module.exports = mongoose.model("Oport", OportSchema);