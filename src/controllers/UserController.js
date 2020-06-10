const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async create(req, res) {
    try {
      // Verifica se existe um EMAIL cadastrado
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

        const response = await User.create({ name, email, password_hash });
        return res.status(201).json(response);
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
};
