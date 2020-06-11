const express = require("express");
const routes = express.Router();

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");

const authMiddleware = require("./middlewares/auth");

// Rota TESTE
routes.get("/teste", (req, res) => {
  return res.send("hello World");
});

// Create User
routes.post("/user", UserController.create);
// Create User
routes.post("/session", SessionController.create);

routes.use(authMiddleware.authHeader);
// ROTAS Autenticadas
routes.put("/user", UserController.update);

module.exports = routes;
