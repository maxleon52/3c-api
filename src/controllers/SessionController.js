const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Yup = require("yup");

const User = require("../models/User");
const authConfig = require("../config/auth");

module.exports = {
  async create(req, res) {
    try {
      // Validação de preenchimento de campos
      const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ message: "Erro de validação de campos." });
      }

      // Tentando criar sessão
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
      return res
        .status(400)
        .json({ message: "Ocorreu um erro inesperado, contate o suporte." });
    }
  },
};
