const Card = require("../models/Card");

module.exports = {
  async index(req, res) {
    try {
      const response = await Card.find({ user_id: req.userId });
      console.log(req.userId);
      if (response <= 0) {
        return res.status(200).json({ message: "nenhum cartão cadastrado" });
      }

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
      const {
        name,
        final_card,
        expiration_card,
        pay_day,
        best_day,
        flag,
        color,
      } = req.body;

      const response = await Card.create({
        name,
        final_card,
        expiration_card,
        pay_day,
        flag,
        best_day,
        color,
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

  async update(req, res) {
    try {
      // Verifica se exist eo cartão no BD
      const existCard = await Card.findById(req.params._id);
      if (!existCard) {
        return res.status(400).json({ message: "Cartão não existente!" });
      }

      // Atualiza dados do cartão
      const response = await Card.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte",
        ErrCatch: error,
      });
    }
  },

  async delete(req, res) {
    try {
      const { _id } = req.params;

      await Card.findByIdAndDelete({ _id: _id, user_id: req.userId });

      return res.status(201).json({ message: " Cartão deletado com sucesso!" });
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte",
        ErrCatch: error,
      });
    }
  },
};
