const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")


//Update user
// router.put('/:id', async (req, res) => {
//     const id = req.params.id;
//     const novo_user = req.body;
//     if(novo_user.userId === id){
//         if(req.body.password){
//                 const salt = await bcrypt.genSalt(10);
//                 novo_user.password = await bcrypt.hash(req.body.password, salt);
//         }
//         try{
//             const updateUser = await User.findByIdAndUpdate(id, novo_user);
//             res.json({error: false, updateUser});
//         }catch(err){
//             res.json({error: true, message: err.message});
//         }
//     }else{
//         res.status(401).json("tu só podes atualizar a sua conta");
//     }
// })
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const novo_user = req.body;
    if(novo_user.userId === id){
        if(req.body.password){
                const salt = await bcrypt.genSalt(10);
                novo_user.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updateUser = await User.findByIdAndUpdate(id, {
                $set: novo_user
            }, {new:true});
            res.json({error: false, updateUser});
        }catch(err){
            res.json({error: true, message: err.message});
        }
    }else{
        res.status(401).json("tu só podes atualizar a sua conta");
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const novo_user = req.body;
    if(novo_user.userId === id){
        try{
            const user = await User.findById(id);
            try{
                await Post.deleteMany({username: user.username})
                await User.findByIdAndDelete(id);
                res.json({error: false, message: `Usuário ${novo_user.username} deletado com sucesso!`});
            }catch(err){
                res.json({error: true, message: err.message});
            }

        }catch(err){
            res.status(404).json("usuário não encontrado");
        }
    }else{
        res.status(401).json("tu só podes deletar a sua conta");
    }
})

//get user
router.get('/:id', async (req, res) => {
    try{
            const id = req.params.id;
            const user = await User.findById(id);
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})
router.get('/', async (req, res) => {
    try{
            const user = await User.find();
            res.status(200).json(user);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

router.post('/useremail', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.to});
        const {password, ...others} = user._doc;
        res.status(200).json(others);
        }catch(err){
            res.json({error: true, message: err.message});
        }
})

module.exports = router;