const COS = require('cos-nodejs-sdk-v5');
const configure = require('../configure').cos;


class CosService{
    constructor(){
        this.cos = new COS({
            SecretId: configure.SecretId,
            SecretKey: configure.SecretKey
        });
    }

    putObject(fileData,callback){
        this.cos.putObject({
            Bucket: 'sit313-1258670658', /* 必须 */
            Region: 'ap-singapore',    /* 必须 */
            Key: fileData.key,              /* 必须 */
            Body: fileData.body, // 上传文件对象
        }, function(err, data) {
            if (err){
                console.log(err, err.stack);
            }else{
                callback(data);
            } 
        });
    }

    deleteObject(fileData,callback){
        this.cos.deleteObject({
            Bucket: 'sit313-1258670658', /* 必须 */
            Region: 'ap-singapore',    /* 必须 */
            Key: fileData.key, 
        },function(err,data){
            if (err){
                console.log(err, err.stack);
            }else{
                callback(data);
            } 
        });
    }
}

module.exports = new CosService();