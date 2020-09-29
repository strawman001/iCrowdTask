const fs = require('fs');
const { IamAuthenticator } = require('ibm-watson/auth');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const configure = require('../configure').waston;

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey:configure.apikey,
  }),
  serviceUrl:configure.serviceUrl,
});

var params = {
  objectMode: false,
  contentType: 'audio/mp3',
  model: 'en-US_BroadbandModel'
};

function convertText(fileReadStream,callback){
    const recognizeParams = {
        audio: fileReadStream,
        contentType: 'audio/mp3',
    };
      
    speechToText.recognize(recognizeParams)
    .then(speechRecognitionResults => {
        console.log(JSON.stringify(speechRecognitionResults));
        var transcriptBuffer = "";
        var results = speechRecognitionResults.result.results;
        for(var i in results){
            transcriptBuffer += results[i].alternatives[0].transcript+"\n";
        }
        console.log(transcriptBuffer);
        callback(transcriptBuffer);
    })
    .catch(err => {
        console.log('error:', err);
    });    
}

module.exports = convertText;

