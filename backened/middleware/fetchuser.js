var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Saurabhis';

const fetchUser=(req,res,next)=>{
const token=req.header('auth-token');
if(!token)
{
  return  res.status(501).send("Please authenticate using a valid token");
}
try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;

    next();
} catch (error) {
  return    res.status(501).send("Please authenticate using a valid token");

}
}

module.exports=fetchUser;