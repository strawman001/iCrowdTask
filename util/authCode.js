
function getAuthCode(num){
    var code = '';
    for(let i=0;i<num;i++){
        code+=Math.floor(Math.random()*10)+'';
    }
    return code;
}

module.exports = getAuthCode;