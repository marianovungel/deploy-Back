const express = require('express')
const router = express.Router()
const Produto = require("../models/produto")
const _ = require("underscore")
var UpdateProduct;
// const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationUpdate } = require('./verifyToken')

var jwt = require('jsonwebtoken');


const verifyTokenUser = (req, res, next)=>{
    const token = req.body.updateToken;
    if(token){
        jwt.verify(token, process.env.JWT_SEC, (err, produto)=>{
            if(err) res.status(403).json("Token inválido!")
            req.produto=produto;
            next();
        })
    }else{
        return res.status(401).json("Usuário Não autenticado!")
    }
}

const verifyTokenAndAuthorizationUser =  (req, res, next)=>{
    verifyTokenUser(req, res, async ()=>{
        // var produtId = await Produto.findById(req.params.id)
        UpdateProduct = {
            title: req.produto.title,
            preco: req.produto.preco,
            desc: req.produto.desc,
            updateToken: null,
            checkUpdate: false
        };
        if(req.produto){
            next();
        }else{
            return res.status(403).json("Deixe de Roubo!")
        }
    })
}

router.get('/token/:id', async (req, res) => {
    try{
        const post = await Produto.findById(req.params.id);
        if(post.updateToken){
            jwt.verify(post.updateToken, process.env.JWT_SEC, (err, produto)=>{
                if(err) res.status(403).json("Token inválido!")
                req.produto=produto;
            })
            post.title = req.produto.title
            post.preco = req.produto.preco
            post.desc = req.produto.desc
        }
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

//Update user
router.put('/ed/:id', verifyTokenAndAuthorizationUser, async (req, res) => {
    try{
        const id = req.params.id;
        const posts = await Produto.findByIdAndUpdate(id, UpdateProduct);
        res.json({error: false, posts});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})
router.put('/:id', async (req, res) => {
    try{
        const post = await Produto.findById(req.params.id);
        const id = req.params.id;
        const novo_post = req.body;
        const posts = await Produto.findByIdAndUpdate(id, novo_post);
        res.json({error: false, posts});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})
//create post
router.post('/', async (req, res) => {
    try{
        const post = req.body;
        const response = await new Produto(post).save();
        res.json({error: false, post: response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    try{
        await Produto.findByIdAndDelete(req.params.id);
        res.json({error: false, message: "post deletado com sucesso!"});
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})
router.put("/recusar/:id", async(req, res) => {
    try{
        const post = await Produto.findById(req.params.id);
        post.updateToken = null
        post.checkUpdate = false
        const posts = await Produto.findByIdAndUpdate(req.params.id, post)  
        res.json({error: false, posts});  
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//get post
router.get('/checkUpdate', async (req, res) => {
    try{
        const post = await Produto.find({checkUpdate: true});
        res.status(200).json(post);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

router.post("/search", async(req, res)=>{
    try{
        const search = await Produto.find({ title: req.body.title});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.post("/search/meu", async(req, res)=>{
    try{
        const search = await Produto.find({ username: req.body.username});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/meu/id", async(req, res)=>{
    try{
        const search = await Produto.find({ userId: req.body.userId});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});

//get all post
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let postsAll;
        if(username){
            postsAll = await Produto.find({username})
        }else if(catName){
            postsAll = await Produto.find({categories:{
                $in:[catName]
            }})
        }else{
            postsAll = await Produto.find({estado:"analise"});
            // postsAll = await Produto.find({estado:"visivel"});
        }
        let posts = _.shuffle(postsAll);
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})


module.exports = router;