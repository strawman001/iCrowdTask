const express = require('express');
const router = express.Router();

const userRouter = require('./routes/userRouter');
const taskRouter = require('./routes/taskRouter');
const interceptorRouter = require('./routes/interceptorRouter');

router.use('*',interceptorRouter);
router.use('/user',userRouter);
router.use('/task',taskRouter);

//Index Page
router.get('/',function(req,res){
    res.redirect('/user/reqlogin.html');
});

module.exports = router;
