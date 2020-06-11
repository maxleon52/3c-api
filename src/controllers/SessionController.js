const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authConfig = require("../config/auth");

module.exports = {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      // Verificando se usuário(e-mail) existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }

      // Verificando se senha é verdadeira
      if (!(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: "Senha inválida" });
      }

      const { _id, name } = user;

      return res.json({
        user: {
          _id,
          name,
          email,
        },
        token: jwt.sign({ _id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
};
