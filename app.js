const bodyParser = require('body-parser');
let express = require('express')
let hbs = require('hbs')
let db = require('./src/db/config.js')
let routes = require('./src/routes/routes.js')
let cookieParser = require('cookie-parser')


let app = express();

// Middleware: Static Files
app.use(express.static("./public"))

// View Engine
app.set('view engine', 'hbs')
// hbs.registerPartials("./views/partials")
app.set('view options', { layout: 'partials/layout' });

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())

// Routes
app.use(routes)

// Set Port
app.listen(3000,()=>{
     console.log("Listening to port 3000")
})