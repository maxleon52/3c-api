const Shopping = require("../models/Shopping");
const PaymentBillet = require("../models/PaymentBillet");

module.exports = {
  async index(req, res) {
    try {
      const response = await Shopping.find({ user_id: req.userId });

      if (response <= 0) {
        return res.status(200).json({ message: "nenhuma compra cadastrado" });
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
      const response = await Shopping.find({
        name: new RegExp(name, "i"),
        user_id: req.userId,
      });

      if (response <= 0) {
        return res.status(200).json({ message: "nenhuma compra cadastrada" });
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
      const {
        name,
        name_shopping,
        qtd_portion,
        value,
        buy_date,
        debtor_id,
        card_id,
      } = req.body;

      // Cadastra compra
      const buy = await Shopping.create({
        name,
        name_shopping,
        qtd_portion,
        value,
        buy_date,
        debtor_id,
        card_id,
        user_id: req.userId,
      });

      // Verifica se a compra acima foi cadastrada
      if (!buy) {
        return res
          .status(400)
          .json({ message: "erro ao cadastrar compra, tente mais tarde." });
      }
      let buyPortion = buy.qtd_portion;

      for (let i = 1; i <= buyPortion; i++) {
        await PaymentBillet.create({
          due_date: buy.buy_date,
          portion: i,
          value: buy.value / buy.qtd_portion,
          shopping_id: buy._id,
          debtor_id: buy.debtor_id,
          card_id: buy.card_id,
          user_id: buy.user_id,
        });
      }
      return res.status(201).json(buy);
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },

  async update(req, res) {
    try {
      // Atualiza dados da compra
      const {
        name,
        name_shopping,
        qtd_portion,
        value,
        buy_date,
        debtor_id,
        card_id,
      } = req.body;

      const response = await Shopping.findByIdAndUpdate(
        req.params._id,
        {
          name,
          name_shopping,
          qtd_portion,
          value,
          buy_date,
          debtor_id,
          card_id,
          user_id: req.userId,
        },
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

      await Shopping.findByIdAndDelete({ _id, user_id: req.userId });

      return res.status(201).json({ message: "Compra deletada com suscesso!" });
    } catch (error) {
      return res.status(400).json({
        message: "Ocorreu um erro inesperado, contate o suporte.",
        ErrCatch: error,
      });
    }
  },
};
