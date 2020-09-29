const UserLog = require('../model/userLog');
const mongoose = require('mongoose');
function addImageNum(userId){
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"imageNum":1}},function(err,userLog){
    });
}

function addImageLearnedNum(userId){
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"imageLearnedNum":1}},function(err,userLog){
    });
}

function addAudioNum(userId){
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"audioNum":1}},function(err,userLog){
    });
}

function addAudioShiftedNum(userId){
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"audioShiftedNum":1}},function(err,userLog){
    });
}

function deleteImageNum(userId){
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"imageNum":-1}},function(err,userLog){
    });
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"imageLearnedNum":-1}},function(err,userLog){
    });
}

function deleteAudioNum(userId){
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"audioNum":-1}},function(err,userLog){
    });
    UserLog.findOneAndUpdate({refId:userId},{$inc:{"audioShiftedNum":-1}},function(err,userLog){
    });
}

module.exports={
    addImageNum:addImageNum,
    addImageLearnedNum:addImageLearnedNum,
    addAudioNum:addAudioNum,
    addAudioShiftedNum:addAudioShiftedNum,
    deleteImageNum:deleteImageNum,
    deleteAudioNum:deleteAudioNum
}