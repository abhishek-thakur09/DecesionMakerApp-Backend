const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

// here we have relation of poll model with option model

  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
    },
  ],

  expiryTime: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
}, { timestamps: true });


module.exports = mongoose.model("Poll", pollSchema);