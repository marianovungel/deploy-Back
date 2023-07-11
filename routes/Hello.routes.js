const express = require('express')
const router = express.Router()
const Hello  = require('../models/Hello')

router.get("/", async(req, res)=>{
    try{
        const hello = await Hello.find({})
        res.json(hello)
    }catch(err){
        res.json(err)
    }
});
router.get("/tests", async(req, res)=>{
    try{
        const hello = "Este é um novo test..."
        res.json(hello)
    }catch(err){
        res.json(err)
    }
});
router.get('/:id', async (req, res) => {
    try{
            const id = req.params.id;
            const hello = await Hello.findById(id);
            const others = hello._doc;
            res.status(200).json(others);
        }catch(err){
            res.json({error: true, message: err.message});
        }
});
router.post("/", async(req, res)=>{
    try{
        const hello = req.body;
        const savehello = await new Hello(hello).save();
        res.json({error: false, hello: savehello})
    }catch(err){
        res.json({error: true, message: err.message})
    }
});
module.exports = router;