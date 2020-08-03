const express = require("express");
const routes = express.Router();
const multer = require("multer");
const multerConfig = require("./config/multer");
const authMiddleware = require("./middlewares/auth");

const UserController = require("./controllers/UserController");
const SessionController = require("./controllers/SessionController");
const FileController = require("./controllers/FileController");
const CardController = require("./controllers/CardController");
const CardFindController = require("./controllers/CardFindController");
const DebtorController = require("./controllers/DebtorController");
const DebtorFindController = require("./controllers/DebtorFindController");
const ShoppingController = require("./controllers/ShoppingController");
const AbstractController = require("./controllers/AbstractController");

const upload = multer(multerConfig);

// Create User
routes.post("/user", UserController.create);
// Create Session
routes.post("/session", SessionController.create);

// Middleware GLOBAL -  ROTAS Autenticadas
routes.use(authMiddleware.authHeader);

// User
routes.put("/user", UserController.update);

// Cards
routes.get("/cards", CardController.index);
routes.get("/cards-search", CardFindController.show);
routes.get("/cards/:_id", CardController.show);
routes.post("/cards", CardController.create);
routes.put("/cards/:_id", CardController.update);
routes.delete("/cards/:_id", CardController.delete);

// Debtors
routes.get("/debtors", DebtorController.index);
routes.get("/debtors-search", DebtorFindController.show);
routes.get("/debtors/:_id", DebtorController.show);
routes.post("/debtors", DebtorController.create);
routes.put("/debtors/:_id", DebtorController.update);
routes.delete("/debtors/:_id", DebtorController.delete);

// Shopping
routes.get("/shopping", ShoppingController.index);
routes.get("/shopping-search", ShoppingController.show);
routes.post("/shopping/", ShoppingController.create);
routes.put("/shopping/:_id", ShoppingController.update);
routes.delete("/shopping/:_id", ShoppingController.delete);

// Abstract
routes.get("/abstract/:card_id", AbstractController.index);

// Upload de arquivos
routes.post("/files", upload.single("file"), FileController.create);

module.exports = routes;
