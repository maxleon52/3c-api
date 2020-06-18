const Debtor = require("../models/Debtor");

module.exports = {
  async index(req, res) {
    try {
      const response = await Debtor.find({ user_id: req.userId });

      if (response <= 0) {
        return res.status(200).json({ message: "nenhum devedor cadastrado" });
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },

  async show(req, res) {
    try {
      const { name } = req.query;
      const response = await Debtor.find({
        name: new RegExp(name, "i"),
        user_id: req.userId,
      });

      if (response <= 0) {
        return res.status(200).json({ message: "nenhum devedor cadastrado" });
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      const response = await Debtor.create({ name, user_id: req.userId });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },

  async update(req, res) {
    try {
      // Atualiza dados do devedor
      const response = await Debtor.findByIdAndUpdate(
        req.params._id,
        req.body,
        {
          new: true,
        }
      );

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },

  async delete(req, res) {
    try {
      const { _id } = req.params;

      await Debtor.findByIdAndDelete({ _id, user_id: req.userId });

      return res
        .status(201)
        .json({ message: "Devedor deletado com suscesso!" });
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },
};
