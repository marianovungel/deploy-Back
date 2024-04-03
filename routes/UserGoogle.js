const express = require('express')
const router = express.Router()
const UserG = require('../models/UserG')
var jwt = require('jsonwebtoken');

router.post("/", async (req, res)=>{
    try {
        const useData = req.body
        //verificar se existe usuário com este 
        const getUser = await UserG.findOne({ sub : useData.sub})
        //se ter usuário então retornar o usuário
        if(getUser){
            const accessToken = jwt.sign({
                id: getUser._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...getUser._doc, accessToken});
        }else{
            const userObject = new UserG({
                username: useData.given_name,
                email: useData.email,
                profilePic: useData.picture ? useData.picture : "https://static.thenounproject.com/png/363640-200.png",
                whatsapp: new Date(),
                sub: useData.sub
            })
            const newUSer = await userObject.save()
            const accessToken = jwt.sign({
                id: newUSer._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...newUSer._doc, accessToken});
        }
    } catch (error) {
        res.status(401).json(error.message)
    }
})

module.exports = router;