// const router =require('express').Router()
// const multer = require('multer')
// const multerConfig = require('../config/multer')
// const Post = require('../models/Post')


// router.post("/", multer(multerConfig).single('file'), async(req, res)=>{
//     const { originalnama: name, size, key, location: url=""}= req.file;
//     const post = await Post.create({
//         name,
//         size,
//         key,
//         url,
//     })
//     return res.json(post);
// })
// router.get("/", async(req, res)=>{
//     const post = await Post.find()
//     return res.json(post);
// })
// router.delete("/:id", async(req, res)=>{
//     const id = req.params.id;
//     await Post.findByIdAndDelete(id);
//     res.json({message: "imagem deletada com sucesso"})
// })


// module.exports=router