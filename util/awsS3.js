const AWS = require('aws-sdk');
const path = require('path');
//AWS s3
AWS.config.loadFromPath(path.resolve(__dirname,"../aws.json"));

class AWS_S3{
    constructor(){
        this.s3 = new AWS.S3();
    }

    putObject(fileData,callback){
        this.s3.putObject({
            Body: fileData.body, 
            Bucket: "sit313", 
            Key: fileData.key, 
        }, function(err, data) {
            if (err){
                console.log(err, err.stack);
            }else{
                callback(data);
            }              
            /*
            data = {
             ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
             VersionId: "psM2sYY4.o1501dSx8wMvnkOzSBB.V4a"
            }
            */
        });
    }

    deleteObject(fileData,callback){
        this.s3.deleteObject({
            Bucket: "sit313", 
            Key: fileData.key
        }, function(err, data) {
            if (err){
                console.log(err, err.stack); 
            }else{
                callback(data); 
            }    
        });
    }
}



module.exports = new AWS_S3();