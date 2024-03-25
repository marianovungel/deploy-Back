const express = require('express')
const router = express.Router()
const UserGoogle = require('../models/UserGoogle')

router.post("/login", async (req, res)=>{
    try {
        const useData = req.body

        //verificar se existe usuário com este 
        const getUser = await UserGoogle.findOne({ sub : useData.sub})

        //se ter usuário então retornar o usuário
        if(getUser){
            res.status(200).json(getUser)
        }else{
            const userObject = new UserGoogle({
                username: useData.given_name,
                email: useData.email,
                profilePic: useData.picture ? useData.picture : "https://static.thenounproject.com/png/363640-200.png",
                whatsapp: new Date(),
                sub: useData.sub
            })
            
            const newUSer = await userObject.save()
            res.status(200).json(newUSer)

        }
    } catch (error) {
        res.status(401).json(error.message)
    }
})

module.exports = router;