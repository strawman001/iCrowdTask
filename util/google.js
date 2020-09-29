const {OAuth2Client} = require('google-auth-library');
const configure = require('../configure').google; 

const client = new OAuth2Client(configure.CLIENT_ID);

async function verify(token,email,req,res,next) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: configure.CLIENT_ID
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  next(userid,email,req,res);
}

function run(token,email,req,res,next){
    verify(token,email,req,res,next).catch(console.error);
}

module.exports = run;
