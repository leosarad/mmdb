const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
     email: {
          type: String,
          required: [true, "Email field is required"],
          lowercase: true,
          unique: true,
          validate: [isEmail, "Valid email is required"]
     },
     username: {
          type: String,
          required: [true, "Username is required"],
     },
     password: {
          type: String,
          required: [true, "Password field is required"],
          minlength: [6, "Password length should be minimum 6 characters"]
     },
})
// static method to login user
userSchema.statics.login = async function(email, password) {
     const user = await this.findOne({ email });
     if (user) {
       const auth = await bcrypt.compare(password, user.password);
       if (auth) {
         return user;
       }
       throw Error('incorrect password');
     }
     throw Error('incorrect email');
   };

userSchema.post('save',(doc,next)=>{
     console.log("New user created: ", doc)
     next()
})
userSchema.pre('save', async function (next){
     this.password = await bcrypt.hash(this.password, 10);
     next()
})
const User = mongoose.model('User', userSchema)

module.exports = User