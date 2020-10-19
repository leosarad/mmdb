const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Collection name is required"]
     },
     description: {
          type: String,
     },
     userId: {
          type: mongoose.Schema.ObjectId,
          required: true
     },
     movies: {
          type: Array,
          default: null
     }
})

CollectionSchema.post('save',(doc,next)=>{
     console.log("New collection created: ", doc)
     next()
})

const Collection = mongoose.model('Collection', CollectionSchema)

module.exports = Collection