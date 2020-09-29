const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');

const non_interceptPathTable=[
    // "/user/reqlogin.html",
    // "/user/reqsignup.html",
    // "/user/register.action",
    // "/user/login.action",
    // "/user/reqforget.html",
    // "/user/forgetPassword.action",
    // "/user/forgetAndChangePassword.action",
    "/user/",
    "/static/"
]

function match(url){
    for(let i=0;i<non_interceptPathTable.length;i++){
        if(url==non_interceptPathTable[i]||url.includes(non_interceptPathTable[i])){
            return true;
        }
    }
    return false;
}

function loginInterceptor(req,res,next){
    if(match(req.originalUrl)){
        console.log('Pass'+req.originalUrl);
        next();
    }else{
        if(req.session.status!="Normal"){
            console.log("Stop"+req.originalUrl);
            res.redirect("/user/reqlogin.html");
        }else{
            console.log('Pass,the link has session!'+req.originalUrl);
            next();
        }
    }
}

module.exports = loginInterceptor;