const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

//  here we have relation of option model with poll model  
  pollId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Poll",
    required: true,
  },

  voteCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Option", optionSchema);