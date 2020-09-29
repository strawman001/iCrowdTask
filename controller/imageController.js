const ImageEntity = require('../model/imageEntity');
const clarifai = require('../util/clarifai');
const multiparty = require('multiparty');
const statistic = require('../util/statistics');
const cosClient = require('../util/cos');
const fs = require('fs');


function ImageController(){ 
    this.getImageList = function(req,res){
        var user = JSON.parse(req.session.user);
        ImageEntity.find({refId:user._id},function(err,imageList){
            if(err){
                res.json({
                    successFlag:false,
                    message:err
                });
            }else{
                res.json({
                    successFlag:true,
                    picList:imageList
                })
            }
        })
    }

    this.recognizeImage = function(target,req,res){
        clarifai.recognizeImage(target.url,function(response){
            const output = response.outputs[0];
            const concepts = output.data.concepts;
            ImageEntity.findOneAndUpdate({key:target.key},{$set:{flag:true,concepts:concepts}},
                function(err,imageEntity){
                    imageEntity.flag = true;
                    imageEntity.concepts = concepts;
                    if(err){
                        res.json({
                            successFlag:false,
                            message:err
                        })
                    }else{
                        var user = JSON.parse(req.session.user);
                        statistic.addImageLearnedNum(user._id);
                        res.json({
                            successFlag:true,
                            picItem:imageEntity
                        })
                        
                    }
                });
        });
    }

    this.uploadImage = function(req,res){
        var user = JSON.parse(req.session.user);
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            var file = files.file[0];
            // console.log(file);
            // console.log(file.path);
            var readStream = fs.createReadStream(file.path);
           
            ImageEntity.create({fileName:file.originalFilename,refId:user._id},function(err,imageEntity){
                // console.log(imageEntity);
                if(err){
                    res.json({
                        successFlag:false
                    });
                }else{
                    cosClient.putObject({
                        body:readStream,
                        key:"userPic/"+imageEntity.key+".jpg"
                    },function(data){
                        statistic.addImageNum(user._id);
                        res.json({
                            successFlag:true
                        });
                    });
                }
            })
        });
    }

    this.deleteImage = function(key,req,res){
        var user = JSON.parse(req.session.user);
        ImageEntity.findOneAndDelete({key:key},function(err){
            if(err){
                res.json({
                    successFlag:false
                });
            }else{
                cosClient.deleteObject({
                    key:"userPic/"+key+".jpg"
                },function(data){
                    statistic.deleteImageNum(user._id);
                    res.json({
                        successFlag:true
                    });
                });
            }
        })
    }

}

module.exports = ImageController;