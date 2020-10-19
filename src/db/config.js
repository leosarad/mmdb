let mongoose = require('mongoose')
let dbname = "mmdb"
const DBURL = `mongodb+srv://leo:Agaao3dhVmMDEXzW@cluster0.taljw.mongodb.net/${dbname}?retryWrites=true&w=majority`
mongoose.connect( DBURL, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false
     }, (err)=>{
          if(!err)
               console.log(`Database ${dbname} connected`)
          else
               console.log(`Failed to connect databse ${dbname}`)
     })