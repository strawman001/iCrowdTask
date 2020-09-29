const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const UserController = require('../controller/userController');
const ImageController = require('../controller/imageController');
const AudioController = require('../controller/audioController');

let userController = new UserController();
let imageController = new ImageController();
let audioController = new AudioController();
let viewPath = path.resolve(__dirname,"../public/dist/html");
let jsonParser = bodyParser.json();

//Pages
router.get('/reqtask.html', function (req, res) {
    res.sendFile(viewPath+"/"+"reqtask.html");
});

router.get('/reqimage.html',function(req,res){
    res.sendFile(viewPath+"/"+"reqimage.html");
});

router.get('/reqaudio.html',function(req,res){
    res.sendFile(viewPath+"/"+"reqaudio.html");
});


//UserInfo
router.get('/getLogInfo.action',function(req,res){
    userController.getLogInfo(req,res);
});

router.get('/getProfile.action',function(req,res){
    userController.getProfile(req,res);
});


//Image
router.get('/getImageList.action',function(req,res){
    imageController.getImageList(req,res);
});

router.post('/recognizeImage.action',jsonParser,function(req,res){
    imageController.recognizeImage(req.body,req,res);
});

router.post('/uploadImage.action',function(req,res){
    imageController.uploadImage(req,res);
});

router.get('/deleteImage.action/:key',function(req,res){
    imageController.deleteImage(req.params.key,req,res);
});

//Audio
router.get('/getAudioList.action',function(req,res){
    audioController.getAudioList(req,res);
});

router.post('/uploadAudio.action',function(req,res){
    audioController.uploadAudio(req,res);
});

router.get('/deleteAudio.action/:key',function(req,res){
    audioController.deleteAudio(req.params.key,req,res);
});

module.exports = router;