const express = require('express')
const router = express.Router()
const Desapegar = require("../models/Desapego")
const _ = require("underscore")
const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationUpdate } = require('./verifyToken')
var jwt = require('jsonwebtoken');





//create post
router.post('/', async (req, res) => {
    try{
        const desapego = {
            title:req.body.title,
            desc:req.body.desc,
            photo:req.body.photo,
            username:req.body.username,
            userwhatsapp:req.body.userwhatsapp,
            categories:req.body.categories,
            cep:req.body.cep,
            cidade:req.body.cidade,
            userId: req.body.userId,

        };
        const response = await new Desapegar(desapego).save();
        res.json({error: false, desapego: response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})


//Update user
router.put('/:id', async (req, res) => {
        const post = await Desapegar.findById(req.params.id);
    try{
        post.estado = "visivel"
        const posts = await Desapegar.findByIdAndUpdate(req.params.id, post);
        res.json({error: false, posts});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//delete user
router.delete('/:id',async (req, res) => {
    try{
        await Desapegar.findByIdAndDelete(req.params.id);
        res.json({error: false, message: "post deletado com sucesso!"});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})


//get post
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Desapegar.findById(id);
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
            postsAll = await Desapegar.find({username})
        }else if(catName){
            postsAll = await Desapegar.find({categories:{
                $in:[catName]
            }})
        }else{
            postsAll = await Desapegar.find({estado:"analise"});
        }
        let posts = _.shuffle(postsAll);
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

router.get("/check/true", async(req, res) => {
    try{
        const post = await Desapegar.find({
            checkUpdate: true
        })
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

router.get('/token/:id', async (req, res) => {
    try{
        const post = await Desapegar.findById(req.params.id);
        if(post.updateToken){
            jwt.verify(post.updateToken, process.env.JWT_SEC, (err, produto)=>{
                if(err) res.status(403).json("Token inválido!")
                req.produto=produto;
            })
            post.title = req.produto.title
            post.desc = req.produto.desc
        }
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

router.put('/ed/:id', async (req, res) => {
    
    try{
        const post = await Desapegar.findById(req.params.id);
        if(req.body.updateToken){
            jwt.verify(req.body.updateToken, process.env.JWT_SEC, (err, produto)=>{
                if(err) res.status(403).json("Token inválido!")
                req.produto=produto;
            })
            post.title = req.produto.title
            post.desc = req.produto.desc
            post.updateToken = null
            post.checkUpdate = false
        }
        const posts = await Desapegar.findByIdAndUpdate(req.params.id, post);
        res.json({error: false, posts});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

router.put("/recusar/:id", async(req, res) => {
    try{
        const post = await Desapegar.findById(req.params.id);
        post.updateToken = null
        post.checkUpdate = false
        const posts = await Desapegar.findByIdAndUpdate(req.params.id, post)  
        res.json({error: false, posts});  
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

module.exports = router;