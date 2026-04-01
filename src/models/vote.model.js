const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({

  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },

  optionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Option",
    required: true,
  },

  userId: {
    type: String,  // i can take ip adress as a user identifier bcz here i am not using any authentication or anything
    required: true,
  },
}, { timestamps: true });

// For duplicate voting
voteSchema.index({ pollId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);