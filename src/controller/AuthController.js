const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

const handleErrors = (err)=>{
    let errors = {email:'', password:''}
     // Validation error
     if(err.code === 11000){
          errors.email="This email is already registered"
          return errors
     }
     if(err.message === "incorrect email"){
          errors.email="This email is not registered"
          return errors
     }
     if(err.message === "incorrect password"){
          errors.password="Either email or password is incorrect"
          return errors
     }
     Object.values(err.errors).forEach(({properties}) => {
          errors[properties.path] = properties.message
     })
     return errors
}

const getToken = async (id)=>{
     let token = await jwt.sign({id}, 'secret', {expiresIn: 24*60*60*1000})
     return token
}

const read = async (req,res)=>{
     let {email, password} = req.body
     try{
          let user = await User.login(email, password)
          let token = await getToken(user._id)
          res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60  * 1000 });
          res.cookie('userId', user.id, { httpOnly: true, maxAge: 24 * 60 * 60  * 1000  })
          res.status(201).json({user: user._id})
     } catch(err){
          const errors = handleErrors(err)
          res.status(400).json({errors})   
     }
}

const create = async (req,res)=>{
     try {
          let newUser = new User(req.body)
          let user = await newUser.save()
          let token = await getToken(user._id)
          res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60  * 1000 });
          res.cookie('userId', user.id, { httpOnly: true, maxAge: 24 * 60 * 60  * 1000  })
          res.status(201).json({user: user._id})
          res.status(201).json(response)
     } catch (err) {
          const errors = handleErrors(err)
          res.status(400).json({errors})
     }
}

const logout = (req,res)=>{
     res.cookie('jwt', '', {maxAge: 1})
     res.redirect('/')
}

module.exports = {
     read,
     create,
     logout
}