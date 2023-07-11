const mongoose = require('mongoose')

const ProdutoSchema = new mongoose.Schema({
    title:{
        type:String,
        // required:true,
        // unique:true
    },
    desc:{
        type:String,
        // required:true,
    },
    photo:{
        type:String,
        // required:false,
    },
    userId:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
        // required:true,
    },
    userwhatsapp:{
        type:String,
        // required:true,
    },
    preco: {
        type:String,
        // required:false,
        default: "20.01",
    },
    categories:{
        type:String,
        // required:false,
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

module.exports = mongoose.model("Produto", ProdutoSchema);