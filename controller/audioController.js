const AudioEntity = require('../model/audioEntity');
const multiparty = require('multiparty');
const statistic = require('../util/statistics');
const cosClient = require('../util/cos');
const speechToText = require('../util/waston');
const fs = require('fs');

function AudioController(){
    this.getAudioList = function(req,res){
        var user = JSON.parse(req.session.user);
        AudioEntity.find({refId:user._id},function(err,audioList){
            if(err){
                res.json({
                    successFlag:false,
                    message:err
                });
            }else{
                res.json({
                    successFlag:true,
                    audioList:audioList
                })
            }
        })
    }

    this.uploadAudio = function(req,res){
        var user = JSON.parse(req.session.user);
        var form = new multiparty.Form();
        const self = this;
        form.parse(req, function(err, fields, files) {
            var file = files.file[0];
            // console.log(file);
            // console.log(file.path);
            var convertReadStream = fs.createReadStream(file.path);
            var copyReadStream = fs.createReadStream(file.path);
            speechToText(convertReadStream,function(transcript){
                AudioEntity.create({fileName:file.originalFilename,transcript:transcript,refId:user._id},function(err,audioEntity){
                    // console.log(imageEntity);
                    if(err){
                        res.json({
                            successFlag:false
                        });
                    }else{
                        cosClient.putObject({
                            body:copyReadStream,
                            key:"userAudio/"+audioEntity.key+".mp3"
                        },function(data){
                            statistic.addAudioNum(user._id);
                            statistic.addAudioShiftedNum(user._id);
                            res.json({
                                successFlag:true
                            });
                        });
                    }
                })
            });
        });
    }

    this.deleteAudio = function(key,req,res){
        var user = JSON.parse(req.session.user);
        AudioEntity.findOneAndDelete({key:key},function(err){
            if(err){
                res.json({
                    successFlag:false
                });
            }else{
                cosClient.deleteObject({
                    key:"userAudio/"+key+".mp3"
                },function(data){
                    statistic.deleteAudioNum(user._id);
                    res.json({
                        successFlag:true
                    });
                });
            }
        })
    }


}

module.exports = AudioController;
