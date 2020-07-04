// const moment = require("moment");
const Shopping = require("../models/Shopping");
const Card = require("../models/Card");
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

      // Promise.All
      // const [] = await Promise.all([])

      // Cadastra compra

      const buy = await Shopping.create({
        name,
        name_shopping,
        qtd_portion,
        value,
        buy_date, // YYYY MM DD  - Salva assim no BD // Envia: MM DD AAAA
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

      const infoCard = await Card.findById({ _id: card_id });

      const buyDate = new Date(buy.buy_date); //01/12/2020
      const dayBuyDue = buyDate.getUTCDate(); //01/12/2020

      // Loop para gerar os boletos
      let buyPortion = buy.qtd_portion; // Parcela
      for (let i = 1; i <= buyPortion; i++) {
        if (i === 1 && dayBuyDue < infoCard.best_day) {
          await PaymentBillet.create({
            due_date: buyDate.setUTCDate(infoCard.pay_day), // Essa data deve ser todo dia 22 de cada mês
            portion: i,
            value: buy.value / buy.qtd_portion,
            shopping_id: buy._id,
            debtor_id: buy.debtor_id,
            card_id: buy.card_id,
            user_id: buy.user_id,
          });
        } else {
          buyDate.setUTCDate(infoCard.pay_day);
          let mes = buyDate.getUTCMonth();
          buyDate.setUTCMonth(mes + 1);

          await PaymentBillet.create({
            due_date:
              buyDate.getUTCMonth() === 12
                ? buyDate.setUTCMonth(0) &&
                  buyDate.setUTCFullYear(buyDate.getUTCFullYear() + 1)
                : buyDate, // Essa data deve ser todo dia 22 de cada mês
            portion: i,
            value: buy.value / buy.qtd_portion,
            shopping_id: buy._id,
            debtor_id: buy.debtor_id,
            card_id: buy.card_id,
            user_id: buy.user_id,
          });
        }
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
