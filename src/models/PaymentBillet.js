const mongoose = require("mongoose");

const PaymentBilletSchema = new mongoose.Schema(
  {
    due_date: {
      type: Date,
      required: true,
    },
    portion: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    shopping_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Shopping",
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

module.exports = mongoose.model("PaymentBillet", PaymentBilletSchema);
