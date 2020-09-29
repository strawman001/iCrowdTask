const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
const ImageEntitySchema = new mongoose.Schema({
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
        default:"https://sit313-1258670658.cos.ap-singapore.myqcloud.com/userPic/"+id.toHexString()+".jpg"
    },
    fileName:{
        type:String,
        required:true
    },
    flag:{
        type:Boolean,
        required:true,
        default:false
    },
    concepts:{
        type:Array,
        default:[]
    },
    tags:{
        type:Array,
        default:[]
    },
    refId:{
        type:String,
        required:true
    }
},{ _id: false });

const ImageEntity = mongoose.model('ImageEntity',ImageEntitySchema);

module.exports = ImageEntity;

