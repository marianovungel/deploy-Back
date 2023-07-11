const express = require('express')
const router = express.Router()
const Aluguel = require("../models/Aluguel")
const _ = require("underscore")
const { verifyTokenAndAuthorization, verifyTokenAndAuthorizationUpdate } = require('./verifyToken')



//create post
router.post('/', async (req, res) => {
    try{
        const aluguel = req.body;
        const response = await new Aluguel(aluguel).save();
        res.json({error: false, desapego: response})
    }catch(err){
        res.json({error: true, message: err.message});
    }
})
router.post("/search", async(req, res)=>{
    try{
        const search = await Aluguel.find({ title: req.body.title});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/meu", async(req, res)=>{
    try{
        const search = await Aluguel.find({ username: req.body.username});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/meu/id", async(req, res)=>{
    try{
        const search = await Aluguel.find({ userId: req.body.userId});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/cat", async(req, res)=>{
    try{
        const search = await Aluguel.find({ categories: req.body.categories});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/search/cidade", async(req, res)=>{
    try{
        const search = await Aluguel.find({ cidade: req.body.cidade});
        !search && res.status(400).json("Nenum Produto encontrado ...");

        // const {password, ...others} = user._doc;
        res.status(200).json(search);
    }catch(err){
        res.status(500).json(err);
    }
    
});

//Update user
//Update user
router.put('/:id', verifyTokenAndAuthorizationUpdate, async (req, res) => {
    try{
        const post = await Aluguel.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const id = req.params.id;
                const novo_post = req.body;
                //gerar token de atualização
                const accessToken = jwt.sign({
                    categories: novo_post.categories,
                    moradores: novo_post.moradores,
                    preco: novo_post.preco,
                    desc: novo_post.desc,
                    cep: novo_post.cep,
                    cidade: novo_post.cidade,
                    contrato: novo_post.contrato,
                    quarto: novo_post.quarto,
                    sala: novo_post.sala,
                    cozinha: novo_post.cozinha,
                    banheiro: novo_post.banheiro,
                    area: novo_post.area
                }, process.env.JWT_SEC)

                const newBody = {
                    checkUpdate: true,
                    updateToken: accessToken
                }

                const posts = await Aluguel.findByIdAndUpdate(id, newBody);
                res.json({error: false, posts});
            }catch(err){
                res.json({error: true, message: err.message});  
            }
        }else{
            res.status(500).json("you can update only you post!")
        }
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//delete user
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try{
        const post = await Aluguel.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                // await Desapego.delete(req.params.id);
                await Aluguel.findByIdAndDelete(req.params.id);
                res.json({error: false, message: "post deletado com sucesso!"});
            }catch(err){
                res.json({error: true, message: err.message});  
            }
        }else{
            res.status(500).json("you can delete only you post!")
        }
    }catch(err){
        res.json({error: true, message: err.message});  
    }
})

//get post
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const post = await Aluguel.findById(id);
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
            postsAll = await Aluguel.find({username})
        }else if(catName){
            postsAll = await Aluguel.find({categories:{
                $in:[catName]
            }})
        }else{
            postsAll = await Aluguel.find({estado:"visivel"});
        }
        let posts = _.shuffle(postsAll);
        res.status(200).json(posts);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;