const PaymentBillet = require("../models/PaymentBillet");

module.exports = {
  async index(req, res) {
    try {
      const response = await PaymentBillet.find({
        card_id: req.params,
        user_id: req.userId,
      });
    } catch (error) {}
  },
};
