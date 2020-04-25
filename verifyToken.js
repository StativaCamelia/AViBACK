const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.headers['auth-token'];
    console.log('here' + req.headers['auth-token'])
    if(!token){
        res.writeHead(401);
        res.write('Access Denied');
        res.end();
    }
    try{
        const verified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = verified;
        next(req,res);
    }catch(err){
        res.writeHead(400);
        res.end(err.message);
    }
}