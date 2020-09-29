const User = require('../model/user.js');
const UserLog = require('../model/userLog');
const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const MailChimp = require('../util/mailchimp');
const mailTool = new MailChimp();
const getAuthCode = require('../util/authCode');
const googleAuth = require('../util/google');

function UserController(){
    this.register= function(userInfo,request,response){
        var user = new User(userInfo);
        var error = user.validateSync();
        //Hash Algorithm
        var salt = Bcrypt.genSaltSync(10);
        var hashPassword = Bcrypt.hashSync(user.password,salt);
        user.password = hashPassword;
        user.confirmPassword = hashPassword;
        if(error==null){
            user.save(function(error,user){
                if(error){
                    console.log(error);
                    response.json({
                        successFlag:false,
                        error:'Exception: email: The EMAIL has been used!'
                    });
                }else{
                    //Create userLog
                    UserLog.create({refId:user._id});
                    mailTool.subscribe({
                        firstName:userInfo.firstName,
                        lastName:userInfo.lastName,
                        email:userInfo.email
                    });
                    // mailTool.setWelcomeEvent({
                    //     email:userInfo.email
                    // });
                    response.json({
                        successFlag:true
                    });
                }   
            });
        }else{
            response.json({
                successFlag:false,
                error:error.message
            });
        }
    };

    this.login = function(userInfo,request,response){
        User.findOne({email:userInfo.email},function(error,user){
            if(user!=null){
                if(Bcrypt.compareSync(userInfo.password,user.password)){
                    request.session.user=JSON.stringify(user);
                    request.session.status="Normal";
                    response.json({
                        successFlag:true
                    });
                }
                else{
                    response.json({
                        successFlag:false,
                        error:'Invalid EMAIL or PASSWORD.'
                    })
                }
            }else{
                response.json({
                    successFlag:false,
                    error:'The EMAIL has not been registered.'
                })
            }
        });
    };

    this.forgetPassword = function(email,request,response){
        User.findOne({email:email},function(error,user){
            if(user!=null){
                let code = getAuthCode(6);
                request.session.status="Forget_Password";
                request.session.authCode = code;
                response.json({
                    successFlag:true
                })
                mailTool.setForgetPasswordEvent(email,code); 
            }else{
                response.json({
                    successFlag:false,
                    message:'The EMAIL has not been registered.'
                })
            }
        });
        
    }

    this.forgetAndChangePassword = function(userInfo,req,res){
        console.log(req.session.authCode);
        if(req.session.authCode==undefined){
            res.json({
                successFlag:false,
                message:"You need to click 'Send Auth Code' button"
            });
        }else if(userInfo.authCode==req.session.authCode){
            var salt = Bcrypt.genSaltSync(10);
            var hashPassword = Bcrypt.hashSync(userInfo.password,salt);
            User.findOneAndUpdate({email:userInfo.email},{$set:{password:hashPassword,confirmPassword:hashPassword}},function(err){
                if(err){
                    console.log(err);
                    res.json({
                        successFlag:false,
                        message:err
                    });
                }else{
                    res.json({
                        successFlag:true,
                    });
                }
            })
        }else{
            respone.json({
                successFlag:false,
                message:'The auth code is wrong!'
            })
        }
    }
    
    this.acceptGoogleToken = function(token,email,req,res){
        if(email==null||email==undefined||email==''){
            res.json({
                successFlag:false,
                message:'Please authorize email address!',
                statusCode:'401'
            });
        }else{
            googleAuth(token,email,req,res,this.loginByGoogle);
        }
        
    }

    this.loginByGoogle = function(googleId,email,req,res){
        User.findOne({type:'local&google',extraId:googleId},function(err,user){
            if(user==null){
                User.findOne({email:email},function(err,user){
                    if(user==null){
                        req.session.googleId = googleId;
                        req.session.email = email;
                        req.session.status = "Google_Register";
                        res.json({
                            successFlag:false,
                            message:'Not register!',
                            statusCode:'404'
                        });
                    }else{
                        req.session.googleId = googleId;
                        req.session.email = email;
                        req.session.status = "Google_Associate";
                        res.json({
                            successFlag:false,
                            message:'Not associate!',
                            statusCode:'400'
                        });
                    }
                });
            }else{
                req.session.user = JSON.stringify(user);
                req.session.status = "Normal";
                res.json({
                    successFlag:true,
                });
            }
        })
    }

    this.registerByGoogle = function(userInfo,req,res){
        var user = new User(userInfo);
        var error = user.validateSync();
        //Hash Algorithm
        var salt = Bcrypt.genSaltSync(10);
        var hashPassword = Bcrypt.hashSync(user.password,salt);
        user.password = hashPassword;
        user.confirmPassword = hashPassword;
        if(error==null){
            user.save(function(error){
                if(error){
                    console.log(error);
                    res.json({
                        successFlag:false,
                        error:'Exception: email: Something wrong!'
                    });
                }else{
                    mailTool.subscribe({
                        firstName:userInfo.firstName,
                        lastName:userInfo.lastName,
                        email:userInfo.email
                    });
                    res.json({
                        successFlag:true
                    });
                }   
            });
        }else{
            res.json({
                successFlag:false,
                error:error.message
            });
        }
    }

    this.associatedWithGoogle = function(userInfo,req,res){
        User.findOneAndUpdate({email:userInfo.email},{$set:{type:'local&google',extraId:userInfo.extraId}},function(err){
            if(err){
                console.log(err);
                res.json({
                    successFlag:false,
                    message:err
                });
            }else{
                res.json({
                    successFlag:true,
                });
            }
        });
    }

    this.getProfile = function(req,res){
        var user = JSON.parse(req.session.user);
        res.json({
            successFlag:true,
            profile:{
                name:user.firstName+" "+user.lastName,
                email: user.email,
                country:user.country,
                city:user.city 
            }
        });
    }

    this.getLogInfo = function(req,res){
        var user = JSON.parse(req.session.user);
        UserLog.findOne({refId:user._id},function(err,userLog){
            if(err){
                res.json({
                    successFlag:false,
                    message:err
                });
            }else{
                res.json({
                    successFlag:true,
                    logInfo:userLog
                });
            }
        });
    }
}

module.exports = UserController;