const User = require("../models/User");

module.exports = {
  async create(req, res) {
    try {
      const response = await User.create({
        name: "Teste",
        email: "teste@teste.com.br",
        password_hash: "123456",
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  },
};
