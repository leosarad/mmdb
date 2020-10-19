let express = require('express');
const { Collection } = require('mongoose');
let router = new express.Router();
let AuthController = require('../controller/AuthController')
let CollectionController = require('../controller/CollectionController');
const TmdbController = require('../controller/TmdbController');

let {requireAuth, checkUser} = require('../middleware/authMiddleware')

// Views Routes 
router.get('*', checkUser)
router.get('/', (req,res)=>{ res.render('home') })
router.get('/home', (req,res)=>{ res.render('home') })

router.get('/signin', (req,res)=>{ res.render('signin') })
router.get('/signup',(req,res)=>{ res.render('signup') })

router.get('/test', (req,res)=>{ res.send('Test Page: Route Works') })

// User Auth Routes
router.post('/signin', AuthController.read)
router.post('/signup', AuthController.create)
router.get('/logout', AuthController.logout)

// collection Routes
router.get('/create-collection', requireAuth, (req,res)=>{ res.render('create-collection') })
router.post('/create-collection', requireAuth, CollectionController.create)
router.get('/get-collections', requireAuth, CollectionController.read)
router.post('/addToCollections/:movieId', requireAuth, CollectionController.addMovie)

// TMDB API Request Routes
router.get('/movie/popular',TmdbController.getPopularMovies)
router.get('/movie/:id', TmdbController.getMovieDetails)

// Error Pages
router.get('*', (req,res)=>{ res.send('No Such Page') })

module.exports = router

