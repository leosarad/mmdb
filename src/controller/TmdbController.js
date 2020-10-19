const fetch = require('node-fetch')
const KEY = 'f2389eed03b839edeb2178897fa33c6d'

let fetchApi = async (url)=>{
     let res = await fetch(url)
     let data = await res.json()
     return data;
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

module.exports = {
     getPopularMovies,
     getMovieDetails
}