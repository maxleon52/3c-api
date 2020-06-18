const mongoose = require("mongoose");

const ShoppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    name_shopping: {
      type: String,
      required: true,
    },
    qtd_portion: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    buy_date: {
      type: Date,
      required: true,
    },
    debtor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Debtor",
    },
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Card",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Shopping", ShoppingSchema);
