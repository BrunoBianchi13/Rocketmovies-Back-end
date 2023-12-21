const { Router } = require('express')

const MoviesController = require('../controllers/MoviesController')

const movieRoutes = Router()

const moviesController = new MoviesController()

movieRoutes.get('/', moviesController.index)
movieRoutes.post('/:user_id', moviesController.create)
movieRoutes.get('/:id', moviesController.show)
movieRoutes.delete('/:id', moviesController.delete)
module.exports = movieRoutes