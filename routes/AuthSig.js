const express = require('express')
const router = express.Router()
const aUser = require("../services/apiSigLogin.js").userget
var jwt = require('jsonwebtoken');
var UserSig = require('../models/UserSig.js')

router.post("/login", async(req, res)=>{
    try{
        
        var newTolk = req.body.sigToken;
        
        const getUser = await aUser(newTolk)
        const verifyAccante = await UserSig.findOne({
            email: getUser.data[0].email
        })
        
        if(verifyAccante !== null ){
            const accessToken = jwt.sign({
                id: verifyAccante._id,
            }, process.env.JWT_SEC)
            const sig = true;
            res.status(200).json({...verifyAccante._doc, accessToken, sig});
        }else{
            const nerUser = new UserSig({
                username: getUser.data[0].login,
                email: getUser.data[0].email,
                whatsapp: "(xx)-xxxxx-xxxx",
                profilePic: "https://static.thenounproject.com/png/363640-200.png"
            });

            const AuthUser = await nerUser.save();

            const accessToken = jwt.sign({
                id: AuthUser._id,
            }, process.env.JWT_SEC)
            const sig = true;
            res.status(200).json({...AuthUser._doc, accessToken, sig});
        }
        
    }catch(err){
        
        res.status(400).json({error: true, message: err.message});
    }
    
});


module.exports = router;