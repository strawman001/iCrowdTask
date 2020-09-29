const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const interceptPathTable=[
    "/user/reqsignup_google.html",
    "/user/reqassociate_google.html"
]

function match(url,arr){
    for(let i=0;i<arr.length;i++){
        if(url==arr[i]||url.includes(arr[i])){
            return true;
        }
    }
    return false;
}

function googleRegisterInterceptor(req,res,next){
    if(match(req.originalUrl,interceptPathTable)){
        if(req.session.googleId==null||req.session.googleId==undefined||req.session.googleId==''){
            res.redirect("/user/reqlogin.html");
        }else{
            console.log("Google Sign Up, Pass!");
            next();
        }       
    }else{
        next();
    }
}

module.exports = googleRegisterInterceptor;