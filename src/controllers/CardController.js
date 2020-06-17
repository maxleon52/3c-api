const Card = require("../models/Card");

module.exports = {
  async index(req, res) {
    try {
      const response = await Card.find({ user_id: req.userId });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte",
        ErrCatch: error,
      });
    }
  },

  // Corrigir! saber como enviar mais de um campo na mesma busca ao BD
  async show(req, res) {
    try {
      const { name, final_card, flag } = req.query;
      // const num_card = Number(final_card);
      const response = await Card.find({
        final_card: final_card,
        user_id: req.userId,
      });

      if (response.length <= 0) {
        return res.status(200).json({ message: "Nenhum cartão cadastrado" });
      }

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte",
        ErrCatch: error,
      });
    }
  },

  async create(req, res) {
    try {
      const { name, final_card, expiration_card, pay_day } = req.body;

      const response = await Card.create({
        name,
        final_card,
        expiration_card,
        pay_day,
        user_id: req.userId,
      });

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte",
        ErrCatch: error,
      });
    }
  },
};
