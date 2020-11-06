const fetch = require('node-fetch')
const KEY = 'f2389eed03b839edeb2178897fa33c6d'
const genres = require("../config/genre.json")

let fetchApi = async (url)=>{
     let res = await fetch(url)
     let data = await res.json()
     return data;
}

const getSearchResults = async (req, res)=>{
     let query = req.params.query
     const url = `https://api.themoviedb.org/3/search/multi?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
     const data = await fetchApi(url)
     res.status(200).json({results: data.results})
}

const getNowPlayingMovies = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${KEY}&page=1`
     const data = await fetchApi(url)
     res.status(200).json({movies: data.results})
}

const getPopularMovies = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&page=1`
     const data = await fetchApi(url)
     res.status(200).json({movies: data.results})
}

const getMovieDetails = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${KEY}`
     const movie = await fetchApi(url)
     res.status(200).render('movie', {movie})
}

const getMovieDetailsJson = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${KEY}`
     const movie = await fetchApi(url)
     res.status(200).json({movie})
}
const getSimilar = async (req,res)=>{
     let movieId = req.params.movieId
     const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${KEY}`
     const similars = await fetchApi(url)
     res.status(200).json({similars})
}

const getCredits = async (req,res)=>{
     let movieId = req.params.movieId
     const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${KEY}`
     const credits = await fetchApi(url)
     res.status(200).json({credits})
}

const getOnAirTv = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${KEY}&page=1`
     const data = await fetchApi(url)
     res.status(200).json({tvs: data.results})
}

const getPopularTv = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/tv/popular?api_key=${KEY}&page=1`
     const data = await fetchApi(url)
     res.status(200).json({tvs: data.results})
}

const getTvDetails = async (req,res)=>{
     const url = `https://api.themoviedb.org/3/tv/${req.params.id}?api_key=${KEY}`
     const tv = await fetchApi(url)
     res.status(200).render('tv', {tv})
}

const getGenres = async (req,res)=>{
     res.status(200).json({'genres': genres})
}

module.exports = {    
     getSearchResults, 
     getNowPlayingMovies,
     getPopularMovies,
     getMovieDetails,
     getMovieDetailsJson,
     getTvDetails,
     getOnAirTv,
     getPopularTv,
     getGenres,
     getSimilar,
     getCredits
}