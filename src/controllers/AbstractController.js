const PaymentBillet = require("../models/PaymentBillet");

module.exports = {
  async index(req, res) {
    try {
      const { card_id } = req.params;
      const response = await PaymentBillet.find({
        card_id,
        user_id: req.userId,
      });

      return res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },
};
