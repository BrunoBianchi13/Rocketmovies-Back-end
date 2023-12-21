const { Router } = require('express')

const TagsController = require('../controllers/TagsController')

const tagsRoutes = Router()

const tagsController = new TagsController()

tagsRoutes.post('/:user_id/:movie_id', tagsController.create)
tagsRoutes.get('/:id', tagsController.show)
tagsRoutes.delete('/:id', tagsController.delete)
tagsRoutes.get('/', tagsController.index)
module.exports = tagsRoutes