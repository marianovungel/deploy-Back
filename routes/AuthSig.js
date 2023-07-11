const express = require('express')
const router = express.Router()
const aUser = require("../services/apiSigLogin.js").userget
var jwt = require('jsonwebtoken');
var UserSig = require('../models/UserSig.js')

router.post("/login", async(req, res)=>{
    try{
        
        var newTolk = req.body.sigToken;
        
        getUser = await aUser(newTolk)
        
        const verifyAccante = await UserSig.findOne({
            username: getUser.data[0].login,
            email: getUser.data[0].email
        })
        console.log(verifyAccante)
        if(verifyAccante){
            const accessToken = jwt.sign({
                id: verifyAccante._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...verifyAccante._doc, accessToken});
        }else{
            const nerUser = new UserSig({
                username: user.login,
                email: getUser.data[0].email,
                whatsapp: "(xx)-xxxxx-xxxx",
                profilePic: "74d5d28e4db58837d16d30eb57d8e8e6"
            });

            const AuthUser = await nerUser.save();

            const accessToken = jwt.sign({
                id: AuthUser._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...AuthUser._doc, accessToken});
        }
        
    }catch(err){
        
        res.status(400).json({error: true, message: err.message});
    }
    
});


module.exports = router;