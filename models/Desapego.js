const mongoose = require('mongoose')

const DesapegoSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    desc:{
        type:String,
    },
    photo:{
        type:String,
    },
    userId:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
    },
    userwhatsapp:{
        type:String,
        default: "",
    },
    categories:{
        type:String,
        default: "",
    },
    cidade:{
        type:String,
        default: "",
    },
    cep:{
        type: Object,
        default: "",
    },
    estado:{
        type:String,
        default: "analise" 
        //-analise (userId "ver" / Monitor "ver/edit") 
        //- visivel (UserId "ver/edit" / Monitor "ver/edit" / User "ver") 
        //- invisivel (Monitor)
    },
    checkUpdate:{
        type:Boolean,
        default: false
    },
    updateToken:{
        type:String,
        default: null
    },
},
    {timestamps: true}
);

module.exports = mongoose.model("Desapego", DesapegoSchema);