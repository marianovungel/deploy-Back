const express = require('express')
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
var jwt = require('jsonwebtoken');


const verifyTokenUser = (req, res, next)=>{
    const token = req.body.path;
    if(token){
        jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("Token inválido!")
            req.user=user;
            next();
        })
    }else{
        return res.status(401).json("Usuário Não autenticado!")
    }
}
var AuthUser;
const verifyTokenAndAuthorizationUser =  (req, res, next)=>{
    verifyTokenUser(req, res, async ()=>{
        // var produtId = await Produto.findById(req.params.id)
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.user.password, salt)
        const nerUser = new User({
            username: req.user.username,
            email: req.user.to,
            whatsapp: req.user.whatsapp,
            password: hashedPass,
            profilePic: "https://static.thenounproject.com/png/363640-200.png"
        });
        AuthUser = await nerUser.save();
        if(req.user){
            next();
        }else{
            return res.status(403).json("Deixe de Roubo!")
        }
    })
}
router.post("/register", verifyTokenAndAuthorizationUser, async(req, res)=>{
    try{
        //usando bcrypt para incriptar a senha
        // const salt = await bcrypt.genSalt(10);
        // const hashedPass = await bcrypt.hash(req.body.password, salt)
        // const nerUser = new User({
        //     username: req.body.username,
        //     email: req.body.email,
        //     whatsapp: req.body.whatsapp,
        //     password: hashedPass,
        //     profilePic: "74d5d28e4db58837d16d30eb57d8e8e6"
        // });

        // const user = await nerUser.save();
        return res.status(200).json({AuthUser});
    }catch(err){
        res.status(400).json(err);
    }
    
});

router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({ username: req.body.username});
        var verificadorUserName = true;
        var verificadorSenha = true;
        if(!user){
            verificador = false;
            return res.status(200).json(verificadorUserName);
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            verificadorSenha = false;
            return res.status(200).json(verificadorSenha);
        }

        // const accessToken = jwt.sign({
        //     id: user._id,
        //   }, process.env.JWT_SEC, {expiresIn: "5d"})

        const accessToken = jwt.sign({
            id: user._id,
          }, process.env.JWT_SEC)
          
          const {password, ...others} = user._doc;
          const sig = false;
          res.status(200).json({...others, accessToken, sig});
        // res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.post("/sendemail", async(req, res)=>{
    try{
        const user = await User.findOne({ email: req.body.to});

        if(!user){
            return res.status(400).json("Não existe usuário cadastrado com este email!");
        }
        if(user){
            
            var codigo = req.body.codigo
            var from = req.body.from
            var to = req.body.to
            var subject = "Reset Password"
            var message = `Olá ${user.username}! Este é o código de verificação do seu email para poder alterar a sua palavra passe. codigo: ${codigo}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'unilabtem@gmail.com',
                pass: 'xruetlpwtoquvnye'
                }
            })

            var mailOptions = {
                from: from,
                to:to,
                subject:subject,
                text:message
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return status(500).json("Algo deu errado no envio do email...");
                } else {
                    console.log("Email Sent: " + info.response)
                  return  res.status(200).json(codigo);
                }
                // response.redirect("/")
            })
        }
        return res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/sendemailtoconfirm", async(req, res)=>{
    try{
        const user = req.body;

        if(!user){
            return res.status(400).json("Não existe usuário cadastrado com este email!");
        }
        if(user){

            const accessTokenAcount = jwt.sign({
                username: req.body.username,
                whatsapp: req.body.whatsapp,
                password: req.body.password,
                to: req.body.to,
              }, process.env.JWT_SEC)
            
            var codigo = req.body.codigo
            var from = req.body.from
            var to = req.body.to
            var subject = "Confirmação de E-mail"
            var message = `Olá ${user.username}! confirma a sua conta de e-mail para poder criar a sua conta na plataforma Unilabtem clicando na URL : https://unilabtem.com.br/conf/${accessTokenAcount}`

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'unilabtem@gmail.com',
                pass: 'xruetlpwtoquvnye'
                }
            })

            var mailOptions = {
                from: from,
                to:to,
                subject:subject,
                text:message
            }

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.status(404).json("Algo deu errado no envio do email...");
                } else {
                    console.log("Email Sent: " + info.response)
                  return  res.status(200).json(codigo);
                }
                // response.redirect("/")
            })
        }
        return res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/usersearch", async(req, res)=>{
    try{
        const verdade = true;
        const falsidade = false;
        const user = await User.findOne({ email: req.body.to});

        if(!user){
            return res.status(200).json(falsidade);
        }
        
        return res.status(200).json(verdade);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/numbersearch", async(req, res)=>{
    
    try{
        const verdade = true;
        const falsidade = false;
        const user = await User.findOne({ whatsapp: req.body.whatsapp});

        if(!user){
            return res.status(200).json(falsidade);
        }
        
        return res.status(200).json(verdade);
    }catch(err){
        res.status(500).json(err);
    }
    
});
router.post("/checkuser", async(req, res)=>{
    try{
        const verdade = true;
        const falsidade = false;
        const user = await User.findOne({ username: req.body.username});

        if(!user){
            return res.status(200).json(falsidade);
        }
        
        return res.status(200).json(verdade);
    }catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;