const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const FileController = require("./controllers/FileController");

const upload = multer(multerConfig);

// Create User
routes.post("/user", UserController.create);
// Create User
routes.post("/session", SessionController.create);

routes.use(authMiddleware.authHeader);
// ROTAS Autenticadas
routes.put("/user", UserController.update);

// Upload de arquivos
routes.post("/files", upload.single("file"), FileController.create);

module.exports = routes;
