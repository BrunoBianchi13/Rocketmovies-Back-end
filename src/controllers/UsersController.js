const { hash } = require("bcryptjs")
const sqliteConnection = require('../database/sqlite')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body
    console.log(name, email, password)
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    const hashedPassword = await hash(password, 8)

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    )

    return response.status(201).json()
  }
  async show(request, response) {
    const { id } = request.params
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])

    return response.json({user})
  }

  async delete(request, response) {
    console.log("oi")
    const { id } = request.params
    const database = await sqliteConnection()
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id])
    await database.get("DELETE FROM users WHERE id = (?)", [id])

    return response.status(201).json()
  }
}


module.exports = UsersController