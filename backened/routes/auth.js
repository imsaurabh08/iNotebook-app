const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser');
const JWT_SECRET = 'Saurabhis';

//Route 1:Creating new user-signup
router.post('/createuser',
  body('name', 'Enter a valid name').isLength({ min: 5 }),
  body('email', "Enter a valid email").isEmail(),
  body('password', 'Password must be of atleast 8 characters').isLength({ min: 8 })

  , async (req, res) => {
    let success=false;
    //If there are errors ,then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });

    }
    //Check whether the user with this email address already exist
    try {


      let user = await User.findOne({ email: req.body.email })
      if (user) {
        
        return res.status(400).json({success,error:"Sorry a user with this email already exist"})
      }
      const myPlaintextPassword = req.body.password;
      const salt = await bcrypt.genSaltSync(10);

      const hash = await bcrypt.hashSync(myPlaintextPassword, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })

      var data = {
        user: {
          id: user.id
        }
      }
      success=true;
      var Userauth = jwt.sign(data, JWT_SECRET);
       res.json({success,Userauth});
    } catch (error) {
      console.error(error.message);
   return   res.status(500).json({success,error:"Some error occured"});
    }
  }
);
//Route 2:Authenticate a user
router.post('/login',
  body('email', "Enter a valid email").isEmail(),
  body('password', "Password can not be blank").exists()

  , async (req, res) => {
    //If there are errors ,then return bad request and errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });

    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) 
      {
       return  res.status(400).json({success,error: "Please try to login with correct credentials" });
      }

      const comparepass = await bcrypt.compare(password, user.password);
      if (!comparepass) {

       return  res.status(400).json({success, error: "Please try to login with correct credentials" });

      }
      var data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
success=true;
  return res.json({success,authtoken});
    } catch (error) {
      // console.error(error.message);
      // success=false;

   return   res.status(500).send("Internal server error occured");
    }
  }
);

//Route 3:get loggedin user details

router.post('/getuser',
  fetchUser

  , async (req, res) => {

    try {
      const userid=req.user.id;
      const user=await User.findById(userid).select("-password");
      res.send(user);
    } catch (error) {
res.status(500).json({error:"Internal server error"});
    }
  })


module.exports = router;