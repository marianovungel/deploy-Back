const express = require('express')
const router = express.Router()
var jwt = require('jsonwebtoken');
const GlobalUser = require('../models/GlobalUser');

router.post("/google", async (req, res)=>{
    try {
        const useData = req.body
        //verificar se existe usuário com este 
        const getUser = await GlobalUser.findOne({ email : useData.email})
        //se ter usuário então retornar o usuário
        if(getUser){
            const accessToken = jwt.sign({
                id: getUser._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...getUser._doc, accessToken});
        }else{
            const userObject = new GlobalUser({
                username: useData.given_name,
                email: useData.email,
                profilePic: useData.picture ? useData.picture : "https://static.thenounproject.com/png/363640-200.png",
                whatsapp: new Date(),
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

router.post("/sigaa", async (req, res)=>{
    try {
        const useData = req.body
        //verificar se existe usuário com este 
        const getUser = await GlobalUser.findOne({ 
            email: useData.email
        })
        //se ter usuário então retornar o usuário
        if(getUser){
            const accessToken = jwt.sign({
                id: getUser._id,
            }, process.env.JWT_SEC)
            res.status(200).json({...getUser._doc, accessToken});
        }else{
            const userObject = new GlobalUser({
                username: useData.login,
                email: useData.email,
                profilePic: "https://static.thenounproject.com/png/363640-200.png",
                whatsapp: new Date()
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