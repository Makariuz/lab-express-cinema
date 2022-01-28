
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Movie = require('./../models/movie.model')
const hbs = require('hbs')


//concat
hbs.registerHelper('concat', function () {
    let outStr = ''
    for (let arg in arguments) {
      if (typeof arguments[arg] != 'object') {
        outStr += arguments[arg]
      }
    }
    return outStr
  })

/* GET home page */
router.get('/', (req, res, next) => res.render('index'));

//movies route
router.get('/movies', async (req,res) => {
    const movies = await getMovies()
  // sending the posts page
  res.render('movies', {movies})
})

//function to getMovies
async function getMovies() {
    try {
      const movies = await Movie.find()
      return movies
    } catch (error) {
      console.log(error)
      return []
    }
  }

//route for movieID
router.get('/movie/:id', async (req,res) => {
    const id = req.params.id
    // find the post in mongobd
    const movie = await Movie.findById(id)
    const stars = await Movie.find()
    const showtimes = await Movie.find()
    res.render('seeMore', { id, movie, stars, showtimes })
    console.log(movie)
    console.log(id)
})

module.exports = router;
