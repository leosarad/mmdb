const Review = require('../models/Review.js')

const handleErrors = (err)=>{
     console.log(err)
     let errors = {name:''}
     // Validation error
     Object.values(err.errors).forEach(({properties}) => {
          errors[properties.path] = properties.message
     })
     return errors
}

const create = async (req,res)=>{
     try {
          let newReview = new Review(req.body)
          let userId = req.cookies.userId
          newReview.userId = userId
          let review = await newReview.save()
          res.status(201).json({review})

     } catch (err) {
          const errors = handleErrors(err)
          res.status(400).json({errors})
     }
}

const read = async (req,res)=>{
     try{
          let movieId = req.params.movieId
          const reviews = await Review.find( { movieId })
          res.status(201).json( {reviews} )
     } catch(err){
          console.log(err)
          res.status(400).send("Error in reviews read")
     }
}

module.exports = {
     read,
     create,
}