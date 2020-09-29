const express = require('express');
const app = express();
const router = require('./router.js');
const mongoose = require('mongoose');
const session = require('express-session');
const mongodbCofigure = require('./configure').mongodb;
const cookieParser = require('cookie-parser');

app.use('/static/js',express.static("public/dist/js"));
app.use('/static/image',express.static("public/image"));

app.use(cookieParser());

app.use(session({
    secret : 'strawman001',
    resave : true,
    saveUninitialized: false,
    cookie : {
        maxAge : 1000 * 60 * 5,
    },
}));

app.use('/',router);
app.listen(process.env.PORT || 4000,function(){
    console.log('The server is running!')
});

//"mongodb://127.0.0.1:27017/iCrowdTaskDB"
//mongodbCofigure.url
var connection = mongoose.connection;
//var url = "mongodb://127.0.0.1:27017/iCrowdTaskDB";
var url = mongodbCofigure.url
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
connection.on('open', function() {
    console.log('Database has connected!');
});



