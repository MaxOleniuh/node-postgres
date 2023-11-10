const db = require("../db");

class UserController {
  async createUser(req, res) {
    try {
      const { name, surname } = req.body;
      const newPerson = await db.query(
        `INSERT INTO Person (name, surname) values ($1, $2) RETURNING *`,
        [name, surname]
      );
      res.json(newPerson.rows[0]);
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await db.query(`SELECT * FROM person`);
      res.json(users.rows);
    } catch (error) {
      console.error("Error retrieving users:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving users." });
    }
  }
  async getOneUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query(`SELECT * FROM person where id = $1`, [id]);
      res.json(user.rows[0]);
    } catch (error) {
      console.error("Error retrieving the user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user." });
    }
  }
  async updateUser(req, res) {
    try {
      const { id, name, surname } = req.body;
      const user = await db.query(
        `UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *`,
        [name, surname, id]
      );
      res.json(user.rows[0]);
    } catch (error) {
      console.error("Error updating the user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
  }
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await db.query(`DELETE FROM person where id = $1`, [id]);
      res.json(user.rows[0]);
    } catch (error) {
      console.error("Error deleting the user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
  }
}
module.exports = new UserController();
