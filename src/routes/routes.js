let express = require('express');
let router = new express.Router();
let AuthController = require('../controller/AuthController')
let CollectionController = require('../controller/CollectionController');
let ReviewController = require('../controller/ReviewController');
let TmdbController = require('../controller/TmdbController');

let {requireAuth, checkUser} = require('../middleware/authMiddleware')

// Views Routes 
router.get('*', checkUser)
router.get('/', checkUser, (req,res)=>{ res.render('home') })
router.get('/home', checkUser, (req,res)=>{ res.render('home') })
// router.get('/dashboard', requireAuth, (req,res)=>{ res.render('dashboard') })
router.get('/movies', (req,res)=>{ res.render('movies') })
router.get('/tv', (req,res)=>{ res.render('tv') })
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

// Review Routes
router.post('/create-review', requireAuth, ReviewController.create)
router.get('/get-reviews/:movieId', requireAuth, ReviewController.read)


// TMDB API Request Routes
router.get('/movie/now_playing', TmdbController.getNowPlayingMovies)
router.get('/movie/popular', TmdbController.getPopularMovies)
router.get('/movie/:id', TmdbController.getMovieDetails)
router.get('/movie/id/:id', TmdbController.getMovieDetailsJson)
router.get('/movie/:movieId/similar', TmdbController.getSimilar)
router.get('/movie/:movieId/credits', TmdbController.getCredits)

router.get('/tv/on_the_air', TmdbController.getOnAirTv)
router.get('/tv/popular', TmdbController.getPopularTv)
router.get('/tv/:id', TmdbController.getTvDetails)

router.get('/search/:query', TmdbController.getSearchResults)
router.get('/genres', TmdbController.getGenres)






// Error Pages
router.get('*', (req,res)=>{ res.send('No Such Page') })

module.exports = router

