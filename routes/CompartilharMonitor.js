const express = require('express')
const router = express.Router()
const Compartilhar = require("../models/Compartilhar")
const _ = require("underscore")
const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationUpdate } = require('./verifyToken')


//Update user
router.put('/:id', async (req, res) => {
    const post = await Compartilhar.findById(req.params.id);
try{
    post.estado = "visivel"
    const posts = await Compartilhar.findByIdAndUpdate(req.params.id, post);
    res.json({error: false, posts});
}catch(err){
    res.json({error: true, message: err.message});  
}
})

//delete user
router.delete('/:id',async (req, res) => {
    try{
                
        await Compartilhar.findByIdAndDelete(req.params.id);
        res.json({error: false, message: "post deletado com sucesso!"});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//get post
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Compartilhar.findById(id);
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})


//get all post
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let postsAll;
        if(username){
            postsAll = await Compartilhar.find({username})
        }else if(catName){
            postsAll = await Compartilhar.find({categories:{
                $in:[catName]
            }})
        }else{
            postsAll = await Compartilhar.find({estado:"analise"});
        }
        let posts = _.shuffle(postsAll);
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

router.get("/check/true", async(req, res) => {
    try{
        const post = await Compartilhar.find({
            checkUpdate: true
        })
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;