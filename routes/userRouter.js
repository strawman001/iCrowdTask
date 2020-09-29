const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const UserController = require('../controller/userController');

let userController = new UserController();
let viewPath = path.resolve(__dirname,"../public/dist/html");
let jsonParser = bodyParser.json();

router.get('/reqsignup.html', function (req, res) {
  res.sendFile(viewPath+"/"+"reqsignup.html");
});

router.get('/reqlogin.html', function (req, res) {
  res.sendFile(viewPath+"/"+"reqlogin.html");
});

router.get('/reqforget.html',function(req,res){
  res.sendFile(viewPath+"/"+"reqforget.html");
});

router.post('/register.action',jsonParser,function(req,res){
    userController.register(req.body,req,res);
});

router.post('/login.action',jsonParser,function(req,res){
    userController.login(req.body,req,res);
});

router.get('/forgetPassword.action/:email',jsonParser,function(req,res){
  userController.forgetPassword(req.params.email,req,res);
});

router.post('/forgetAndChangePassword.action',jsonParser,function(req,res){
  userController.forgetAndChangePassword(req.body,req,res);
});

router.get('/reqsignup_google.html',function(req,res){
  res.cookie('googleId',req.session.googleId,{maxAge: 900000});
  res.cookie('googleEmail',req.session.email,{maxAge: 900000});
  res.sendFile(viewPath+"/"+"reqsignup_google.html");
});

router.get('/reqassociate_google.html',function(req,res){
  res.cookie('googleId',req.session.googleId,{maxAge: 900000});
  res.cookie('googleEmail',req.session.email,{maxAge: 900000});
  res.sendFile(viewPath+"/"+"reqassociate_google.html");
});

router.post('/acceptGoogleToken.action',jsonParser,function(req,res){
  userController.acceptGoogleToken(req.body.token,req.body.email,req,res);
});

router.post('/registerByGoogle.action',jsonParser,function(req,res){
  userController.registerByGoogle(req.body,req,res);
});

router.post('/associatedWithGoogle.action',jsonParser,function(req,res){
  userController.associatedWithGoogle(req.body,req,res);
})
 
module.exports = router;