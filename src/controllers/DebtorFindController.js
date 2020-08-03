const Debtor = require("../models/Debtor");

module.exports = {
  async show(req, res) {
    try {
      const { name } = req.query;
      const response = await Debtor.findOne({
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
};
