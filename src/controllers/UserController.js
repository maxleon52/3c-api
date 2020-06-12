const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { update } = require("../models/User");

module.exports = {
  async create(req, res) {
    try {
      // Verifica se existe um EMAIL cadastrado
      // PASSWORD é o input do front, mas na TB é password_has, ele meio que simboliza um campo VIRTUAL
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res
          .status(401)
          .json({ message: "E-mail já cadastrado, faça login!" });
      }

      // Criptografando senha
      if (password) {
        const password_hash = await bcrypt.hash(password, 8);

        const { _id } = await User.create({ name, email, password_hash });
        return res.status(201).json({ _id, name, email });
      }
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Ocorreu um erro ao salvar no BD.", ErrCatch: error });
    }
  },

  async update(req, res) {
    console.log(req.userId);
    const { email, oldPassword } = req.body;

    const user = await User.findById(req.userId);
    console.log(user);

    if (email && email !== user.email) {
      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(401).json({
          message: "Esse e-mail ja está sendo usado, use outro e-mail válido.",
        });
      }
    }

    if (
      oldPassword &&
      !(await bcrypt.compare(oldPassword, user.password_hash))
    ) {
      return res.status(401).json({ message: "Senha antiga inválida." });
    }

    const { _id, name } = await User.findByIdAndUpdate(user._id, req.body, {
      new: true,
    });
    return res.json({ _id, name, email });
  },
};
