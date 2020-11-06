const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
     review: {
          type: String,
          required: [true, "Review name is required"]
     },
     movieId: {
          type: String,
          required: true
     },
     userId: {
          type: mongoose.Schema.ObjectId,
          required: true
     },
     username: {
          type: String,
          required: true
     }
})

ReviewSchema.post('save',(doc,next)=>{
     console.log("New Review created: ", doc)
     next()
})

const Review = mongoose.model('Review', ReviewSchema)

module.exports = Review