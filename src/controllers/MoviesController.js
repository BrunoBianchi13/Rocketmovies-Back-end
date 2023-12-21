const knex = require("../database/knex")


class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags} = request.body
    const { user_id } = request.params
    //console.log(user_id,title, description, rating)
  const  id_m  = await knex("movie_notes").insert({
      title,description,rating,user_id
    })



    var movie = (id_m[0]);
    var movie_id = movie.toString();


    const Itags = tags.map(name => {
      return {
        movie_id,name,user_id
      }
    }) 
    console.log(Itags)
    await knex("movie_tags").insert(Itags)
    

    return response.status(201).json()
  }


  async show(request, response) {
    const { id } = request.params


    const  movie  = await knex("movie_notes").where({
      id
    }).first();
    const  tags  = await knex("movie_tags").where({
      movie_id: id
    });


   
    return response.json({...movie,tags})
  }

  async delete(request, response) {
    const { id } = request.params


   await knex("movie_notes").where({id}).delete()
    return response.status(201).json()
  }

  async index(request, response) {
    const { title, user_id} = request.query;
   
    if (title) {
      const movies = await knex("movie_notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      return response.json(movies)
      
    } else {
      const movies = await knex("movie_notes")
      .where({ user_id })
      return response.json(movies)
      
    }
      
    
    
  }

}

module.exports = MoviesController