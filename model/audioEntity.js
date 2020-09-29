const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
const AudioEntitySchema = new mongoose.Schema({
    _id:{
        type:mongoose.Types.ObjectId,
        require:true,
        default:id
    },
    key:{
        type:String,
        require:true,
        default:id.toHexString()
    },
    url:{
        type:String,
        require:true,
        default:"https://sit313-1258670658.cos.ap-singapore.myqcloud.com/userAudio/"+id.toHexString()+".mp3"
    },
    fileName:{
        type:String,
        required:true
    },
    transcript:{
        type:String
    },
    time:{
        type:String,
        required:true,
        default:new Date().toUTCString()
    },
    refId:{
        type:String,
        required:true
    }
},{ _id: false });

const AudioEntity = mongoose.model('AudioEntity',AudioEntitySchema);

module.exports = AudioEntity;

