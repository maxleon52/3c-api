const mongoose = require("mongoose");
const Debtor = require("../models/Debtor");
const { create } = require("./CardController");

module.exports = {
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
    // Verifica se exist devedor no BD
    const { _id } = req.params;
    const existDebtor = await Debtor.findById({ _id });
    console.log(existDebtor);
    if (existDebtor.match("/^[0-9a-fA-F]{24}$/")) {
      return res.status(400).json({ message: "Devedor não existente!" });
    }

    // try {
    //   // Atualiza dados do devedor
    //   const response = await Debtor.findByIdAndUpdate(
    //     req.params._id,
    //     req.body,
    //     {
    //       new: true,
    //     }
    //   );

    //   return res.status(201).json(response);
    // } catch (error) {
    //   return res.status(400).json({
    //     message: "Ocorreu um erro inesperado, contate o suporte.",
    //     ErrCatch: error,
    //   });
    // }
  },
};
