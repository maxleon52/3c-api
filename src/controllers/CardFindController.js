const Card = require("../models/Card");

module.exports = {
  async show(req, res) {
    try {
      const { final_card } = req.query;
      const response = await Card.findOne({
        // final_card: new RegExp(final_card, "i"),
        final_card,
        user_id: req.userId,
      });

      if (response.length <= 0) {
        return res
          .status(200)
          .json({ message: "Nenhum cartão cadastrado com esse número." });
      }

      return res.status(201).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte",
        ErrCatch: error,
      });
    }
  },
};
