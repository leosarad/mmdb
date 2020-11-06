const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next)=>{
     let token = req.cookies.jwt
     if(token){
          jwt.verify(token, 'secret', (err, decodedToken)=>{
               if(err){
                    console.timeLog(err.message)
                    res.redirect('/signin')
               } else {
                    console.log(decodedToken)
                    next()
               }
          })
     } else {
          res.redirect('/signin')
     }
}

const checkUser = (req, res, next)=>{
     const token = req.cookies.jwt;
     if(token){
          jwt.verify(token, 'secret', async(err, decodedToken)=>{
               if(err){
                    res.locals.user = null;
                    next()
               } else{
                    let user = await User.findById(decodedToken.id);
                    res.locals.user = user
                    next()
               }
          })
     } else{
          res.locals.user = null
          next()
     }
}

module.exports = {
     requireAuth,
     checkUser
}