const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const FileController = require("./controllers/FileController");
const CardController = require("./controllers/CardController");

const upload = multer(multerConfig);

// Create User
routes.post("/user", UserController.create);
// Create User
routes.post("/session", SessionController.create);

// Middleware GLOBAL -  ROTAS Autenticadas
routes.use(authMiddleware.authHeader);

// User
routes.put("/user", UserController.update);

// Cards
routes.get("/cards", CardController.index);
routes.get("/cards-search", CardController.show);
routes.post("/cards", CardController.create);

// Upload de arquivos
routes.post("/files", upload.single("file"), FileController.create);

module.exports = routes;
