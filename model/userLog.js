const mongoose = require('mongoose');

const UserLogSchema = new mongoose.Schema({
    imageNum:{
        type:Number,
        required:true,
        default:0
    },
    audioNum:{
        type:Number,
        required:true,
        default:0
    },
    imageLearnedNum:{
        type:Number,
        required:true,
        default:0
    },
    audioShiftedNum:{
        type:Number,
        required:true,
        default:0
    },
    taskNum:{
        type:Number,
        required:true,
        default:0
    },
    refId:{
        type:String,
        required:true
    }
});

UserLogSchema.index({ refId:1 },{unique:true});
const UserLog = mongoose.model('UserLog',UserLogSchema);

module.exports = UserLog;