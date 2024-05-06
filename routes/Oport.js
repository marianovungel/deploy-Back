const express = require('express')
const router = express.Router()
const Oport = require("../models/Oport")


//create post
router.post('/', async (req, res) => {
    try{
        const oportunidade = req.body;
        const response = await new Oport(oportunidade).save();
        res.json({error: false, data:response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})

//get post
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Oport.findById(id);
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})


//get all post
router.get('/', async (req, res) => {
    try{
        const res = await Oport.get()
        res.status(200).json(res);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;