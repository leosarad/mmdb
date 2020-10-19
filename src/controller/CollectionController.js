const { Mongoose } = require('mongoose')
const Collection = require('../models/Collection.js')
let {ObjectId} = require('mongoose')
const { collection } = require('../models/Collection.js')
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
          let newCollection = new Collection(req.body)
          let userId = req.cookies.userId
          newCollection.userId = userId
          let collection = await newCollection.save()
          res.status(201).json({collection})
     } catch (err) {
          const errors = handleErrors(err)
          res.status(400).json({errors})
     }
}

const read = async (req,res)=>{
     try{
          let userId = req.cookies.userId
          const collections = await Collection.find( { userId })
          // console.log(collections)
          res.status(201).json( {collections} )
     } catch(err){
          console.log(err)
          res.status(400).send("Error in collection read")
     }
}

const addMovie = async (req,res)=>{
     try{
          let {movieId, collections} =req.body

          collections.forEach(async collectionId=>{
               let collection = await Collection.findById(collectionId)
               let movies = collection.movies
               movies.push(movieId)
               console.log(collection)
               await Collection.findByIdAndUpdate(collectionId, {movies})
          })
          res.status(201).json( {'added': true})

     } catch(err){
          console.log(err)
          res.status(400).json( {error: "Error adding movie 0"})
     }
}

module.exports = {
     read,
     create,
     addMovie
}