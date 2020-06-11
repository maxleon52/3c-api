const User = require("../models/User");
const bcrypt = require("bcryptjs");

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
      return res.status(400).json({ message: error });
    }
  },
};
