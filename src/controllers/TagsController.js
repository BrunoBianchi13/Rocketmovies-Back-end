const knex = require("../database/knex")


class TagsController {
  async create(request, response) {
    const { name } = request.body
    const { user_id, movie_id } = request.params
    //console.log(user_id,name,movie_id)
    await knex("movie_tags").insert({
      name, user_id, movie_id
    })
    
    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params
    const  tags  = await knex("movie_tags").where({
      id
    }).first();
    
    return response.json({tags})
  }

  async delete(request, response) {
    const { id } = request.params


   await knex("movie_tags").where({id}).delete()
    return response.status(201).json()
  }

  async index(request, response) {
    const { name, movie_id } = request.query;
   

    if (name) {
      const tags = await knex("movie_tags")
      .where({ movie_id })
      .whereLike("name", `%${name}%`)
      return response.json(tags)
    } else {
      const tags = await knex("movie_tags")
      .where({ movie_id })
      return response.json(tags)
      
    }
      
    
    
  }

}

module.exports = TagsController