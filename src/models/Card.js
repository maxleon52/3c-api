const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    final_card: {
      type: String,
      required: true,
      unique: true,
    },
    expiration_card: {
      type: Date,
      required: true,
    },
    pay_day: {
      type: Number,
      required: true,
    },
    best_day: {
      type: Number,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Card", CardSchema);
