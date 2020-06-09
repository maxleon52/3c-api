const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
// Rota TESTE
routes.get("/teste", (req, res) => {
  return res.send("hello World");
});

// Create User
routes.post("/user", UserController.create);

module.exports = routes;
