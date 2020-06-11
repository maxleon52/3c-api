const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authConfig = require("../config/auth");

module.exports = {
  // Verifica se o TOKEN é válido
  async authHeader(req, res, next) {
    // Pegando o token da variavel AUTHORIZATION
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Sem token!" });
    }

    // Separando o Bearer do Token
    const [, token] = authHeader.split(" ");

    // Verificando se o Token é válido
    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      // Inserindo a variavel userId na Request, para manipulação de dados futuros
      req.userId = decoded._id;
      console.log(decoded);

      return next();
    } catch (error) {
      res.status(401).json({ message: "Token inválido", ErrCatch: error });
    }

    return next();
  },
};
